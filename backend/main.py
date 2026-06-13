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
        pattern = re.compile(re.escape(game), re.IGNORECASE)
        if pattern.search(text):
            return True
    return False


def blacklist_redirect():
    return {
        "intent": "blocked",
        "answer": "I can’t talk about that Roblox game. Try asking for underrated horror, RPG, or survival games instead."
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

YOU MUST ALWAYS OUTPUT VALID JSON.

Never output:
- markdown
- explanations
- extra text
- code blocks

ONLY OUTPUT ONE OF THESE TWO FORMATS:

1. Game recommendations:
{
  "games": [
    {
      "title": "Game Name",
      "reason": "Why it's recommended",
      "link": "https://www.roblox.com/games/PLACE_ID"
    }
  ]
}

2. Normal chat:
{
  "answer": "response here"
}

RULES:
- Output ONLY raw JSON
- No formatting
- No backticks
"""


def build_prompt(user_prompt: str, intent: str) -> str:
    if intent == "recommend":
        return f"""
User request:
{user_prompt}

Return ONLY JSON list of Roblox game recommendations.
"""
    else:
        return f"""
User question:
{user_prompt}

Answer normally but still return JSON:
{{
  "answer": "your response here"
}}
"""


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

        image_url = (
            data.get("data", [{}])[0]
            .get("imageUrl")
        )

        return {"imageUrl": image_url}

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Failed to fetch thumbnail"
        )


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

        return {
            "intent": intent,
            "data": parsed
        }

    except Exception:
        raise HTTPException(status_code=500, detail="AI request failed")