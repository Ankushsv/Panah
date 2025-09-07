from fastapi import FastAPI
from ai_services.chatbot.routes import router as chat_router

app = FastAPI(title="PANAH AI Services")

# Register chatbot routes
app.include_router(chat_router)