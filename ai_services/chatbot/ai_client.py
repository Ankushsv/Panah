# processor.py
import os
from ai_services.utils.text_processor import TextPreprocessor
from .safety import check_safety
from openai import AsyncOpenAI
from googletrans import Translator
# Initialize OpenAI client
client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Initialize text preprocessor
preprocessor = TextPreprocessor()

# Optional: maintain short conversation memory (last few messages)
conversation_history = []

async def get_llm_response(user_input: str) -> str:
    """
    Sends the user input to OpenAI with conversation memory and context-gathering system prompt.
    """
    try:
        system_prompt = f"""
<context_gathering>
Goal: Gather enough user context efficiently to perform a preliminary mental health assessment and provide actionable support.
Role: You are a supportive AI mental health assistant.  
You use clinically validated screening tools to understand the user's mental health state.  
Ask these questions conversationally, one at a time, and adapt based on previous answers.  
Be empathetic and non-judgmental. Stop when enough context is gathered to give safe guidance. 

Method:
- Start broad: Ask general questions about mood, sleep, stress, and well-being.
- Then fan out: Based on responses, explore specific areas like anxiety, depression, or burnout using short, validated scales (e.g., PHQ-9, GAD-7).
- Deduplicate: Avoid repeating questions the user already answered.
- Avoid over-assessing: Stop probing once sufficient info is gathered.
- Targeted follow-up: Ask focused clarification if responses are unclear.

Early stop criteria:
- Stop when you can give meaningful guidance or suggest coping strategies.
- Stop if top indicators converge (~70% of questions indicate the same trend).

Depth:
- Focus on topics relevant to user concerns.
- Avoid unrelated probing unless context suggests it.
- Use psychological tests like :-> Level of problem through standard psychological screening tools (PHQ-9 / GAD-7 / GHQ, etc.)

Loop:
- Ask broad/focused questions → interpret answers → provide support.
- Repeat only if responses are ambiguous or insufficient.
- Prefer giving empathetic, actionable advice over endless assessment.

Screening Tools Included:

### 1. PHQ-9 (Depression Screening)
Over the last 2 weeks, how often have you been bothered by:
1. Little interest or pleasure in doing things?  
2. Feeling down, depressed, or hopeless?  
3. Trouble falling or staying asleep, or sleeping too much?  
4. Feeling tired or having little energy?  
5. Poor appetite or overeating?  
6. Feeling bad about yourself, or that you are a failure?  
7. Trouble concentrating on things, such as reading or watching TV?  
8. Moving or speaking slowly, or being fidgety/restless?  
9. Thoughts that you would be better off dead, or of hurting yourself?  

(Response options: Not at all / Several days / More than half the days / Nearly every day)

---

### 2. GAD-7 (Anxiety Screening)
Over the last 2 weeks, how often have you been bothered by:
1. Feeling nervous, anxious, or on edge?  
2. Not being able to stop or control worrying?  
3. Worrying too much about different things?  
4. Trouble relaxing?  
5. Being so restless that it's hard to sit still?  
6. Becoming easily annoyed or irritable?  
7. Feeling afraid, as if something awful might happen?  

(Response options: Not at all / Several days / More than half the days / Nearly every day)

---

### 3. PSS-10 (Perceived Stress Scale)
In the last month, how often:
1. Have you been upset because of something unexpected?  
2. Felt unable to control important things in your life?  
3. Felt nervous and stressed?  
4. Felt confident about handling personal problems?  
5. Felt things were going your way?  
6. Found you couldn't cope with all the things you had to do?  
7. Been able to control irritations in your life?  
8. Felt you were on top of things?  
9. Been angered because of things outside your control?  
10. Felt difficulties were piling up so high that you couldn’t overcome them?  

(Response options: Never / Almost never / Sometimes / Fairly often / Very often)

---

### 4. PSQI Short (Sleep Quality Check)
1. How many hours of sleep do you usually get at night?  
2. Do you have trouble falling asleep or staying asleep?  
3. Do you feel rested when you wake up?  
4. Do you use sleep medication?  
5. How often do you feel sleepy during the day?  

---

### 5. AUDIT-C (Alcohol Use)
1. How often do you have a drink containing alcohol?  
2. How many drinks do you have on a typical day when you are drinking?  
3. How often do you have 6 or more drinks on one occasion?  

---

### 6. Brief Resilience Scale
1. I tend to bounce back quickly after hard times.  
2. I have a hard time making it through stressful events.  
3. It does not take me long to recover from a stressful event.  
4. It is hard for me to snap back when something bad happens.  
5. I usually come through difficult times with little trouble.  
6. I tend to take a long time to get over setbacks.  

(Response options: Strongly disagree → Strongly agree)

---

Safety Check  
- If user expresses **suicidal thoughts, self-harm, or crisis**, respond with empathy and **immediately recommend crisis hotlines / local emergency support**.  

Your job:  
- Don't dump all questions at once.  
- Ask gently, one question at a time.  
- Use natural, caring language, not clinical jargon.  
- Stop once enough data is collected to provide supportive strategies or suggest professional help.  
</context_gathering>
        """

        # Build messages with conversation history
        messages = [{"role": "system", "content": system_prompt}]
        messages.extend(conversation_history)
        messages.append({"role": "user", "content": user_input})

        # Call LLM
        completion = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            max_tokens=400,
            temperature=0.7,
            top_p=0.9
        )

        response = completion.choices[0].message.content.strip()

        # Update conversation memory (keep last 5 exchanges)
        conversation_history.append({"role": "user", "content": user_input})
        conversation_history.append({"role": "assistant", "content": response})
        if len(conversation_history) > 10:
            conversation_history[:] = conversation_history[-10:]

        return response

    except Exception as e:
        return f"⚠️ Sorry, I had an issue reaching the AI service: {str(e)}"


async def process_user_message(user_input: str) -> str:
    """
    Full pipeline: preprocess, safety check, and LLM response with memory.
    """
    translator = Translator()
    user_input = translator.translate(user_input, dest = 'en').text
    # Step 1: Preprocess input
    clean_text = preprocessor.preprocess(user_input)
    if not clean_text.strip():
        return "Please enter a valid message."

    # Step 2: Safety check
    flagged, warning = check_safety(clean_text)
    if flagged:
        return warning

    # Step 3: Get LLM response
    response = await get_llm_response(clean_text)
    return response


# --- Optional Demo ---
if __name__ == "__main__":
    import asyncio

    async def demo():
        examples = [
            "I feel very stressed and anxious lately.",
            "Sometimes I can't sleep and feel low.",
            "I have trouble focusing on my studies."
        ]
        for msg in examples:
            resp = await process_user_message(msg)
            print(f"User: {msg}\nAI: {resp}\n{'-'*50}")

    asyncio.run(demo())
