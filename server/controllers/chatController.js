import dotenv from 'dotenv';
dotenv.config();

export const handleChat = async (req, res) => {
    const { message, context } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ success: false, message: "API Key missing in .env" });
    }

    try {
        // Using the EXACT model name that appeared at the top of your list
        const MODEL_NAME = "gemini-2.5-flash"; 
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `System: You are SoulHeal AI, a supportive and empathetic student assistant. 
                        
                        Student Context:
                        - Name: ${context?.userName || "Student"}
                        - Current Challenges: ${context?.challenges || "General stress"}
                        - Course: ${context?.course || "Studies"}

                        Guidelines:
                        1. Be human and warm.
                        2. Validate their feelings before giving advice.
                        3. Use Markdown (bold text and bullet points).
                        4. Keep it strictly about mental health and education.

                        User Message: ${message}`
                    }]
                }]
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error("Google API Error:", data.error);
            return res.status(500).json({ success: false, message: data.error.message });
        }

        if (data.candidates && data.candidates[0].content) {
            const botReply = data.candidates[0].content.parts[0].text;
            return res.status(200).json({ success: true, reply: botReply });
        }

        throw new Error("Invalid response format from Google");

    } catch (error) {
        console.error("SoulHeal Controller Error:", error);
        res.status(500).json({ success: false, message: "Connection lost. Please try again." });
    }
};