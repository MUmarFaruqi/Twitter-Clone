
import { GoogleGenAI } from "@google/genai";

export const generateTweetDraft = async (prompt: string): Promise<string> => {
  if (!process.env.API_KEY) return "API Key not configured.";

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Draft a concise, engaging social media post (max 280 chars) based on this idea: "${prompt}". Just return the text.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 100,
      }
    });

    return response.text?.trim() || "Couldn't generate a draft right now.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating draft.";
  }
};
