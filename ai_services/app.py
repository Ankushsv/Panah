# ai_services/app.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from ai_services.chatbot.routes import router as chat_router
import logging
from ai_services.chatbot.processor import check_llm_health_async

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="PANAH AI Services - Local LLaMA Edition", version="2.0.0")

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

@app.get("/")
async def root():
    """
    Root endpoint with setup instructions and status
    """
    try:
        health = await check_llm_health_async()
        is_healthy = health.get("status") == "healthy"
        health_message = f"{health.get('status')} ({health.get('available_models')} models available)"

        status_color = "#28a745" if is_healthy else "#dc3545"
        status_text = "✅ Ready" if is_healthy else "❌ Not Ready"

        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <title>PANAH AI Services</title>
            <style>
                body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', roboto, sans-serif; 
                       margin: 0; padding: 40px; background: #f8f9fa; }}
                .container {{ max-width: 800px; margin: 0 auto; background: white; 
                           padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }}
                h1 {{ color: #2c3e50; margin-bottom: 10px; }}
                .status {{ padding: 20px; border-radius: 8px; margin: 20px 0; 
                         background: {status_color}15; border-left: 4px solid {status_color}; }}
                .endpoint {{ background: #f8f9fa; padding: 15px; margin: 10px 0; 
                          border-radius: 6px; border-left: 3px solid #007bff; }}
                .setup {{ background: #fff3cd; padding: 20px; border-radius: 8px; 
                        border-left: 4px solid #ffc107; margin: 20px 0; }}
                code {{ background: #f1f3f4; padding: 2px 6px; border-radius: 3px; 
                      font-family: 'Monaco', 'Consolas', monospace; }}
                .success {{ color: #28a745; }}
                .error {{ color: #dc3545; }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🤖 PANAH AI Mental Health Assistant</h1>
                <p>Local LLaMA-powered mental health chatbot</p>
                
                <div class="status">
                    <h3>System Status: <span style="color: {status_color};">{status_text}</span></h3>
                    <p><strong>Local LLM:</strong> {health_message}</p>
                </div>
        """

        if not is_healthy:
            html += """
                <div class="setup">
                    <h3>⚠️ Setup Required</h3>
                    <p>To use the local AI assistant, please:</p>
                    <ol>
                        <li>Install Ollama: <code>brew install ollama</code></li>
                        <li>Start Ollama: <code>ollama serve</code></li>
                        <li>Download model: <code>ollama pull llama3.1:8b</code></li>
                        <li>Install dependencies: <code>pip install aiohttp deep-translator</code></li>
                    </ol>
                </div>
            """
        else:
            html += """
                <div class="setup">
                    <h3 class="success">✅ Ready to Chat!</h3>
                    <p>Your local AI assistant is running and ready to help with mental health support.</p>
                </div>
            """

        html += f"""
                <h3>API Endpoints:</h3>
                <div class="endpoint">
                    <strong>POST /chat</strong><br>
                    Main chat endpoint - Compatible with your existing frontend
                </div>
                <div class="endpoint">
                    <strong>GET /health</strong><br>
                    Check local LLM health status
                </div>
                <div class="endpoint">
                    <strong>GET /models</strong><br>
                    List available Ollama models
                </div>
                
                <h3>Quick Test:</h3>
                <p>Test the chat endpoint:</p>
                <code>curl -X POST "http://localhost:8000/chat" -H "Content-Type: application/json" -d '{{"message": "I feel anxious"}}'</code>
                
                <p><a href="/docs">📚 API Documentation</a> | <a href="/status">📊 Service Status</a></p>
            </div>
        </body>
        </html>
        """
        return HTMLResponse(content=html)
        
    except Exception as e:
        logger.error(f"Root endpoint error: {e}")
        return HTMLResponse(f"<h1>Error</h1><p>{str(e)}</p>", status_code=500)

@app.on_event("startup")
async def startup_event():
    """
    Check system health on startup
    """
    logger.info("🚀 Starting PANAH AI Services (Local LLaMA Edition)")

    try:
        health = await check_llm_health_async()
        status = health.get("status")
        is_healthy = status == "healthy"

        if is_healthy:
            logger.info("✅ Local LLM is ready and operational!")
        else:
            logger.warning("⚠️ Local LLM setup required:")
            logger.warning("   1. Start Ollama: ollama serve")
            logger.warning("   2. Download model: ollama pull llama3.1:8b")
            logger.warning(f"   Status: {status}")
    except Exception as e:
        logger.error(f"Startup health check failed: {e}")

@app.get("/status")
async def get_status():
    """
    Simple status endpoint for monitoring
    """
    try:
        health = await check_llm_health_async()
        return {
            "service": "PANAH AI Services",
            "version": "2.0.0",
            "llm_type": "Local LLaMA (Ollama)",
            "status": "operational" if health.get("status") == "healthy" else "degraded",
            "llm_status": health
        }
    except Exception as e:
        return {
            "service": "PANAH AI Services", 
            "status": "error",
            "error": str(e)
        }
