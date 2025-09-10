from fastapi import APIRouter
from pydantic import BaseModel
from ai_services.chatbot.processor import process_user_message

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
async def chat_endpoint(req: ChatRequest):
    """
    Receives user message, processes it through the AI pipeline,
    and returns the AI response along with quick suggestions.
    """
    result = await process_user_message(req.message)
    
    suggestions = [
        "Tell me more",
        "That helps, thank you",
        "I need different strategies",
        "Can we talk about something else?"
    ]

    return {
        "bot_response": result["response"],
        "clean_text": result["clean_text"],
        "suggestions": suggestions
    }
