import os
import re
import httpx


from fastapi import FastAPI, HTTPException
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
    allow_credentials=True,
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
    "Da hood",
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
        "answer": (
            "I can’t talk about that Roblox game. "
            "But I can recommend underrated Roblox games instead. "
            "Tell me what genre you like (horror, RPG, survival, etc.)."
        )
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


ROLE:
You are a Roblox expert focused on underrated and hidden gem games.


CAPABILITIES:
- Recommend REAL Roblox games only
- Explain Roblox mechanics, updates, gameplay systems
- Answer Roblox-related questions naturally


STRICT RULES:
- Never invent games
- Stay strictly inside Roblox
- Only discuss real Roblox content


RECOMMENDATION STYLE:
- Prefer underrated / lesser-known games
- Avoid mainstream games unless explicitly asked


OUTPUT STYLE:
- Clear, structured, and helpful
"""


def build_prompt(user_prompt: str, intent: str) -> str:
    if intent == "recommend":
        return f"""
User request:
{user_prompt}


TASK:
Recommend ONLY real underrated Roblox games.


RULES:
- Do NOT invent games
- Only use real Roblox games
- Focus on hidden gems only


FORMAT:
- Title
- Why underrated
- What makes it special
- Personal ranking/Online Reviews
"""
    else:
        return f"""
User question:
{user_prompt}


TASK:
Answer as a Roblox expert.


RULES:
- Only Roblox-related answers
- Be helpful and conversational
- Do not randomly list games unless relevant
"""


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


        answer = result["choices"][0]["message"]["content"].strip()


        return {
            "intent": intent,
            "answer": answer
        }


    except Exception:
        raise HTTPException(status_code=500, detail="AI request failed")