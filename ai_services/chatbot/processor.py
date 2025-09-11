"""
processor.py - Demo and async message processing for chatbot
"""

import asyncio
import requests
from ai_services.utils.text_processor import TextPreprocessor
from .safety import check_safety
from .ai_client import get_llm_response

# --- Preprocessor instance ---
preprocessor = TextPreprocessor()

# --- Synchronous health check (basic ping) ---
def check_llm_health_sync() -> bool:
    """
    Quick sync check if Ollama API is reachable.
    Returns True if service is accessible, False otherwise.
    """
    try:
        response = requests.get("http://localhost:11434/api/tags", timeout=5)
        return response.status_code == 200
    except Exception as e:
        print(f"LLM sync health check failed: {e}")
        return False

# --- Async health check (detailed) ---
async def check_llm_health_async() -> dict:
    """
    Async detailed health check that returns service status and available models.
    """
    try:
        response = requests.get("http://localhost:11434/api/tags", timeout=5)
        if response.status_code == 200:
            models = response.json().get("models", [])
            return {
                "status": "healthy",
                "available_models": len(models),
                "models": [model.get("name", "Unknown") for model in models] if models else []
            }
        else:
            return {
                "status": "unhealthy",
                "error": f"HTTP {response.status_code}",
                "available_models": 0,
                "models": []
            }
    except requests.exceptions.ConnectionError:
        return {
            "status": "unavailable",
            "error": "Cannot connect to Ollama service",
            "available_models": 0,
            "models": []
        }
    except Exception as e:
        return {
            "status": "error",
            "error": str(e),
            "available_models": 0,
            "models": []
        }

# --- Async message processing function ---
async def process_user_message(user_input: str) -> dict:
    """
    Processes user input through NLP preprocessing, performs safety checks,
    and returns both cleaned text and LLM response.
    """
    clean_text = preprocessor.preprocess(user_input, return_tokens=False)
    
    if not clean_text or not clean_text.strip():
        return {"clean_text": "", "response": "Please enter a valid message."}

    flagged, warning = check_safety(clean_text)
    if flagged:
        return {"clean_text": clean_text, "response": warning}

    # Use sync quick check before attempting LLM response
    if not check_llm_health_sync():
        return {
            "clean_text": clean_text, 
            "response": "⚠️ AI service is currently unavailable. Please try again later."
        }

    try:
        print(f"Sending to LLM: {clean_text}")  # Debug print
        response = await get_llm_response(clean_text)
        print(f"LLM Response: {response}")  # Debug print
    except Exception as e:
        print(f"LLM Error: {str(e)}")  # Debug print
        response = f"⚠️ Sorry, I had an issue reaching the AI service: {str(e)}"

    return {"clean_text": clean_text, "response": response}

# --- Demo Section ---
async def demo():
    """
    Demo function to test message processing with various inputs.
    """
    print("=== LLM Health Check ===")
    health_status = await check_llm_health_async()
    print(f"Service Status: {health_status['status']}")
    if health_status.get("models"):
        print(f"Available Models: {', '.join(health_status['models'])}")
    else:
        print("No models available")
    print("=" * 50)

    test_messages = [
        "मनवा ठीक नइखे लागत।",
        "హలో! నేను మీతో మాట్లాడాలని అనుకుంటున్నాను.",
        "মনে হয় কষ্ট হচ্ছে।",
        "",  # empty input
        "happy"
    ]

    print("\n=== Message Processing Demo ===")
    for msg in test_messages:
        result = await process_user_message(msg)
        print(f"Original:  '{msg}'")
        print(f"Cleaned:   '{result['clean_text']}'")
        print(f"Response:  {result['response']}")
        print("-" * 50)

# --- Run demo if executed as module ---
if __name__ == "__main__":
    asyncio.run(demo())
