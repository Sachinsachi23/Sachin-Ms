import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function askTravelAssistant(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are the StayNest India AI Travel Assistant. Your goal is to help users find the best homestays in India, specifically focusing on nature stays, coffee estates, waterfalls, and offbeat locations. Be professional, friendly, and deeply knowledgeable about Indian geography and local travel experiences. Provide recommendations for trekking, best times to visit (monsoon, winter), and local food. Keep responses concise and focused on 'StayNest' offerings (even if mock).",
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "I'm having trouble connecting to my travel wisdom right now. How about we look at some trending coffee estate stays in the meantime?";
  }
}
