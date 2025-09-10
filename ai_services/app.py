# ai_services/app.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ai_services.chatbot.routes import router as chat_router

app = FastAPI(title="PANAH AI Services")

# Include chatbot routes
app.include_router(chat_router)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # your Next.js frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
