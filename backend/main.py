import os
import re
import httpx
import json

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")
if not API_KEY:
    raise ValueError("OPENROUTER_API_KEY missing in .env")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatInput(BaseModel):
    prompt: str


ROBLOX_BLACKLIST = {
    "adopt me",
    "brookhaven",
    "blox fruits",
    "tower of hell",
    "meepcity",
    "royale high",
    "grow a garden",
    "steal a brainrot",
    "pet simulator",
    "sols rng",
    "blade ball",
    "da hood",
}


def contains_blacklisted_game(text: str) -> bool:
    text = text.lower()
    for game in ROBLOX_BLACKLIST:
        if re.search(re.escape(game), text, re.IGNORECASE):
            return True
    return False


def blacklist_redirect():
    return {
        "intent": "blocked",
        "data": {
            "answer": "I can’t talk about that Roblox game. Try underrated horror, RPG, survival, or simulator games instead."
        }
    }


def detect_intent(text: str) -> str:
    text = text.lower()

    recommend_keywords = [
        "recommend", "suggest", "what should i play",
        "best game", "fun games", "games like",
        "good roblox games", "play", "horror", "rpg"
    ]

    if any(k in text for k in recommend_keywords):
        return "recommend"

    return "chat"


SYSTEM_PROMPT = """
You are RobloxGameFinder AI.

Return ONLY JSON:

{
  "games": [
    {
      "title": "Game Name",
      "reason": "Why it's recommended"
    }
  ]
}

RULES:
- NEVER output placeId
- NEVER output links
- ONLY real Roblox game names
"""


def build_prompt(user_prompt: str, intent: str) -> str:
    if intent == "recommend":
        return f"""
User request:
{user_prompt}

Return ONLY JSON with real Roblox game titles and reasons.
"""
    else:
        return f"""
User question:
{user_prompt}

Return JSON:
{{
  "answer": "your response here"
}}
"""
async def resolve_place_id(game_title: str) -> int | None:
    search_url = "https://games.roblox.com/v1/games/list"

    params = {
        "model.keyword": game_title,
        "model.maxRows": 1
    }

    async with httpx.AsyncClient(timeout=10) as client:
        res = await client.get(search_url, params=params)

    if res.status_code != 200:
        return None

    data = res.json()

    try:
        return data["data"][0]["rootPlaceId"]
    except Exception:
        return None

@app.get("/api/thumbnail")
async def get_thumbnail(place_id: int = Query(...)):
    url = (
        "https://thumbnails.roblox.com/v1/places/gameicons"
        f"?placeIds={place_id}"
        "&size=512x512"
        "&format=Png"
        "&isCircular=false"
    )

    try:
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.get(url)

        response.raise_for_status()
        data = response.json()

        image_url = data.get("data", [{}])[0].get("imageUrl")

        return {"imageUrl": image_url}

    except Exception:
        raise HTTPException(status_code=500, detail="Failed to fetch thumbnail")


@app.post("/api/chat")
async def ask_ai(data: ChatInput):

    prompt = data.prompt.strip()
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt is empty")

    if contains_blacklisted_game(prompt):
        return blacklist_redirect()

    intent = detect_intent(prompt)
    final_prompt = build_prompt(prompt, intent)

    try:
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {API_KEY}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": "openai/gpt-4o-mini",
                    "messages": [
                        {"role": "system", "content": SYSTEM_PROMPT},
                        {"role": "user", "content": final_prompt},
                    ],
                    "temperature": 0.2
                }
            )

        response.raise_for_status()
        result = response.json()

        raw = result["choices"][0]["message"]["content"].strip()

        try:
            parsed = json.loads(raw)
        except Exception:
            raise HTTPException(
                status_code=500,
                detail="AI did not return valid JSON"
            )

        # ===============================
        # ✅ ROBLOX PLACE ID RESOLUTION STEP
        # ===============================

        final_games = []

        if "games" in parsed:
            for game in parsed["games"][:5]:
                place_id = await resolve_place_id(game["title"])

                if not place_id:
                    continue

                final_games.append({
                    "title": game["title"],
                    "reason": game["reason"],
                    "placeId": place_id,
                    "link": f"https://www.roblox.com/games/{place_id}"
                })

            parsed["games"] = final_games


        return {
            "intent": intent,
            "data": parsed
        }

    except Exception:
        raise HTTPException(status_code=500, detail="AI request failed")
