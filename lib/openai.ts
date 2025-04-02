import { OpenAI } from "openai";
import { SUMMARY_SYSTEM_PROMPT } from "./prompts";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateSummaryFromOenAI(pdfText: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { 
          role: "system", 
          content: SUMMARY_SYSTEM_PROMPT
        },
        {
          role: "user",
          content: `Transform this document into an engaging, easy-to-read summary with contextuality relevant emojis and proper markdown formatting: \n\n${pdfText}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });
    return completion.choices[0].message.content;
  } catch (error: any) {
    if (error?.status === 429) {
      console.error("OpenAI Rate limit exceeded:", error);
      throw new Error("Rate limit exceeded. Please try again in a few moments.");
    }
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate summary. Please try again.");
  }
}
