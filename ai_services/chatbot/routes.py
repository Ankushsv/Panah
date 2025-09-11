from fastapi import APIRouter
from pydantic import BaseModel
from ai_services.chatbot.processor import process_user_message, check_llm_health_async
import asyncio
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class ChatRequest(BaseModel):
    message: str

async def safe_process_message(message: str, retries: int = 3, delay: float = 1.0):
    """
    Calls process_user_message with retry logic for transient failures.
    Optimized for local LLaMA instead of API rate limits.
    """
    # First check if local LLM is healthy
    try:
        health = await check_llm_health_async()
        if health.get("status") != "healthy":
            logger.error(f"Local LLM not ready: {health.get('error', 'Unknown error')}")
            return {
                "response": "⚠️ The AI service is currently unavailable. Please ensure Ollama is running and the model is loaded.",
                "clean_text": "",
                "error": health.get("error", "Unhealthy service")
            }
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return {
            "response": "⚠️ Unable to connect to AI service. Please check if Ollama is running.",
            "clean_text": "",
            "error": str(e)
        }
    
    # Process message with retries for transient issues
    for attempt in range(retries):
        try:
            result = await process_user_message(message)
            
            # Check if the result indicates an error
            if "⚠️ Sorry, I had an issue reaching" in result.get("response", ""):
                raise Exception("AI service error")
            
            return result
            
        except Exception as e:
            logger.warning(f"Attempt {attempt+1} failed: {e}")
            
            if attempt < retries - 1:  # Don't sleep on the last attempt
                await asyncio.sleep(delay)
                delay *= 1.5  # Moderate backoff for local LLM
    
    # Return a clear error message if all retries fail
    logger.error("Failed to process message after multiple retries.")
    return {
        "response": "I'm sorry, I couldn't process your message right now. Please try again in a moment.",
        "clean_text": "",
        "error": "Failed after multiple retries"
    }

@router.post("/chat")
async def chat_endpoint(req: ChatRequest):
    """
    Receives user message, processes it through the AI pipeline,
    and returns the AI response along with quick suggestions.
    """
    result = await safe_process_message(req.message)
    
    # Dynamic suggestions based on context
    base_suggestions = [
        "Tell me more",
        "That helps, thank you", 
        "I need different strategies",
        "Can we talk about something else?"
    ]
    
    # Add context-aware suggestions
    response_text = result.get("response", "").lower()
    if any(word in response_text for word in ["anxiety", "anxious", "worry"]):
        base_suggestions.insert(0, "What helps with anxiety?")
    elif any(word in response_text for word in ["sleep", "tired", "rest"]):
        base_suggestions.insert(0, "Sleep tips please")
    elif any(word in response_text for word in ["sad", "depressed", "down"]):
        base_suggestions.insert(0, "I need emotional support")
    
    return {
        "bot_response": result.get("response", ""),
        "clean_text": result.get("clean_text", ""),
        "suggestions": base_suggestions[:4]  # Limit to 4 suggestions
    }

# Add health check endpoint
@router.get("/health")
async def health_check():
    """
    Check if the local LLM is ready
    """
    try:
        health = await check_llm_health_async()
        return {
            "status": health.get("status"),
            "message": health.get("error", "OK"),
            "llm_ready": health.get("status") == "healthy",
            "available_models": health.get("available_models", 0),
            "models": health.get("models", [])
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e),
            "llm_ready": False
        }

# Add endpoint to check available models
@router.get("/models")
async def list_models():
    """
    List available Ollama models
    """
    import aiohttp
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get("http://localhost:11434/api/tags") as response:
                if response.status == 200:
                    data = await response.json()
                    models = [model["name"] for model in data.get("models", [])]
                    return {"models": models, "status": "success"}
                else:
                    return {"models": [], "status": "error", "message": f"Ollama API error: {response.status}"}
    except Exception as e:
        return {"models": [], "status": "error", "message": f"Cannot connect to Ollama: {str(e)}"}
