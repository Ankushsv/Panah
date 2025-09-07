import re

# Simple keyword-based filter (replace with ML classifier later)
SUICIDE_KEYWORDS = ["suicide", "kill myself", "end my life", "self harm"]

def check_safety(text: str):
    text_lower = text.lower()
    for keyword in SUICIDE_KEYWORDS:
        if re.search(rf"\b{keyword}\b", text_lower):
            return True, (
                "⚠️ I'm really concerned about what you just said. "
                "You are not alone — please reach out to a trusted friend, "
                "a counselor, or call a local helpline (e.g., 9152987821 in India)."
            )
    return False, None
