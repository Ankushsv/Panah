"""
processor.py - Demo and async message processing for chatbot
"""

import asyncio
from ai_services.utils.text_processor import TextPreprocessor
from .safety import check_safety
from .ai_client import get_llm_response

# --- Preprocessor instance ---
preprocessor = TextPreprocessor()

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

    try:
        response = await get_llm_response(clean_text)
    except Exception as e:
        response = f"⚠️ Sorry, I had an issue reaching the AI service: {str(e)}"

    return {"clean_text": clean_text, "response": response}

# --- Demo Section ---
async def demo():
    test_messages = [
        "मनवा ठीक नइखे लागत।",
        "హలో! నేను మీతో మాట్లాడాలని అనుకుంటున్నాను.",
        "মনে হয় কষ্ট হচ্ছে।",  # empty input
        "happy"
    ]

    for msg in test_messages:
        result = await process_user_message(msg)
        print(f"Original:  {msg}")
        print(f"Cleaned:   {result['clean_text']}")
        print(f"Response:  {result['response']}")
        print("-" * 50)

# --- Run demo if executed as module ---
if __name__ == "__main__":
    asyncio.run(demo())
