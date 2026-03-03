// test-ai.js
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

async function listModels() {
    try {
        const resp = await fetch(url);
        const data = await resp.json();
        
        console.log("--- YOUR AVAILABLE MODELS ---");
        if (data.models) {
            data.models.forEach(m => {
                console.log(m.name.replace('models/', ''));
            });
        } else {
            console.log("Error response:", data);
        }
    } catch (e) {
        console.log("Error:", e.message);
    }
}
listModels();