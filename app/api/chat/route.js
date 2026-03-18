import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Initialize the API using the secure vault key from your .env.local file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    // 2. Catch the message sent from your page.js frontend
    const body = await req.json();
    const { message } = body;

    // 3. Configure the AI model and its personality
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `You are the Lead Enterprise Sales Agent for Artificium, a high-end AI consulting and development firm. 
      Your goal is to represent the company flawlessly, answer questions about our custom AI workflows, and convince clients that Artificium is the premier choice for corporate AI integration.
      Keep your answers concise, persuasive, and highly professional.`,
    });

    // 4. Send the user's message to Gemini and wait for the response
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    // 5. Send the AI's generated pitch back to the chat interface
    return Response.json({ reply: text });

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // If the connection drops, send a professional error message back to the UI
    return Response.json(
      { error: "System connection interrupted. Please verify network status." }, 
      { status: 500 }
    );
  }
}