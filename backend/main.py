import os
import re
import httpx
import json

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from game_db import GAME_DB  # 👈 your hardcoded database

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

# =========================
# INPUT MODEL
# =========================
class ChatInput(BaseModel):
    prompt: str


# =========================
# BLOCKLIST
# =========================
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
    return any(re.search(re.escape(game), text) for game in ROBLOX_BLACKLIST)


def blacklist_redirect():
    return {
        "intent": "blocked",
        "data": {
            "answer": "I can’t talk about that Roblox game. Try horror, RPG, survival, or simulator games instead."
        }
    }


# =========================
# INTENT DETECTION
# =========================
def detect_intent(text: str) -> str:
    text = text.lower()

    recommend_keywords = [
        "recommend", "suggest", "what should i play",
        "best game", "fun games", "games like",
        "good roblox games", "play", "horror", "rpg"
    ]

    return "recommend" if any(k in text for k in recommend_keywords) else "chat"


# =========================
# GAME DB LOOKUP
# =========================
def resolve_from_db(title: str):
    return GAME_DB.get(title.lower().strip())


# =========================
# SYSTEM PROMPT (IMPORTANT FIX)
# =========================
SYSTEM_PROMPT = """
You are RobloxGameFinder AI.

You ONLY return valid JSON.

TASK:
Pick games ONLY from the allowed list provided by the user.

RULES:
- NEVER invent game titles
- NEVER invent placeIds
- ONLY return titles from the provided list
- Return exactly 5 games if possible

FORMAT:
{
  "games": [
    {
      "title": "Game Name",
      "reason": "Why it's recommended"
    }
  ]
}
"""


# =========================
# BUILD PROMPT (NOW INJECT DB)
# =========================
def build_prompt(user_prompt: str) -> str:
    available_games = list(GAME_DB.keys())

    return f"""
User request:
{user_prompt}

You MUST ONLY choose from this list of games:
{available_games}

Return ONLY JSON with titles and reasons.
"""


# =========================
# THUMBNAIL API
# =========================
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
            res = await client.get(url)
        res.raise_for_status()

        data = res.json()
        image_url = data.get("data", [{}])[0].get("imageUrl")

        return {"imageUrl": image_url}

    except Exception:
        raise HTTPException(status_code=500, detail="Thumbnail fetch failed")


# =========================
# MAIN CHAT ENDPOINT
# =========================
@app.post("/api/chat")
async def ask_ai(data: ChatInput):

    prompt = data.prompt.strip()
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt is empty")

    if contains_blacklisted_game(prompt):
        return blacklist_redirect()

    intent = detect_intent(prompt)

    if intent != "recommend":
        return {
            "intent": "chat",
            "data": {
                "answer": "Ask me for Roblox game recommendations (horror, RPG, shooter, survival, etc.)"
            }
        }

    final_prompt = build_prompt(prompt)

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
        parsed = json.loads(raw)

        # =========================
        # MAP TO DATABASE (KEY FIX)
        # =========================
        final_games = []

        for game in parsed.get("games", []):
            db_entry = resolve_from_db(game["title"])

            if not db_entry:
                continue

            final_games.append({
                "title": db_entry["title"],
                "reason": game["reason"],
                "placeId": db_entry["placeId"],
                "link": f"https://www.roblox.com/games/{db_entry['placeId']}"
            })

        return {
            "intent": intent,
            "data": {
                "games": final_games
            }
        }

    except Exception:
        raise HTTPException(status_code=500, detail="AI request failed")