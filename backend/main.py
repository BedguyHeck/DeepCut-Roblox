import os
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("OPENROUTER_API_KEY")

app = FastAPI()

# This lets your local webpage talk directly to this Python code
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatInput(BaseModel):
    prompt: str

@app.post("/api/chat")
async def ask_openrouter(data: ChatInput):
    if not data.prompt.strip():
        raise HTTPException(status_code=400, detail="Please enter a prompt.")

    try:
        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "openrouter/free", 
                "messages": [{"role": "user", "content": data.prompt}]
            }
        )
        result = response.json()

        if "error" in result:
            raise HTTPException(status_code=400, detail=result["error"]["message"])

        ai_reply = result["choices"][0]["message"]["content"]
        return {"answer": ai_reply}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)