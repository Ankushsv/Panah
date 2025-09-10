import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 5050;

// Add CORS middleware BEFORE other middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Forward chat requests to FastAPI
app.post("/chat", async (req, res) => {
  try {
    const response = await axios.post("http://localhost:8000/chat", req.body);
    res.json(response.data);
  } catch (error) {
    console.error("Error calling FastAPI:", error.message);
    res.status(500).json({
      response: "⚠️ Failed to connect to chatbot API!!",
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Express running on http://localhost:${PORT}`);
});

