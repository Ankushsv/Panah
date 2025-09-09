import express from "express"; 
import axios from "axios";
const app = express()

app.use(express.json()); 

app.post('/chat', async (req, res) => { 
    try {
        const response = await axios.post(req.url.join('/chat'), req.body); 
        res.json(response.data) 
    } catch (error) {
        console.log('Error calling FastAPI: ', error?.message); 
        res.status(500).json({error: "Failed to connect to chatbot API!!"}); 
    }
})
app.listen(process.env.PORT, () =>{ 
    console.log(`Running on PORT ${process.env.PORT}`);
})

