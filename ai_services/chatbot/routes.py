from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from .processor import process_user_message

router = APIRouter(prefix="/chat", tags=["chatbot"])

class ChatRequest(BaseModel):
    message: str

@router.post("/")
async def chat_endpoint(req: ChatRequest):
    try:
        response = await process_user_message(req.message)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
