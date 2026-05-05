import { GoogleGenAI } from "@google/genai";
import { profile, projects, skills, experience, contact } from "@/data/portfolio";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

function buildPortfolioContext() {
  return `
PROFILE:
${JSON.stringify(profile, null, 2)}

PROJECTS:
${JSON.stringify(projects, null, 2)}

SKILLS:
${JSON.stringify(skills, null, 2)}

EXPERIENCE:
${JSON.stringify(experience, null, 2)}

CONTACT:
${JSON.stringify(contact, null, 2)}
`;
}

function buildPrompt(question) {
  return `
You are the assistant inside RahulOS, Rahul Bagga's portfolio website.

Rules:
- Answer only using the portfolio context provided.
- Do not invent projects, links, grades, employers, achievements, or experience.
- If something is missing, say that it is not listed in the current portfolio data.
- Keep answers concise, useful, and professional.

PORTFOLIO CONTEXT:
${buildPortfolioContext()}

VISITOR QUESTION:
${question}
`;
}

async function generateWithFallback(question) {
  const models = ["gemini-2.5-flash", "gemini-2.0-flash"];

  let lastError;

  for (const model of models) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: buildPrompt(question),
      });

      return {
        answer: response.text,
        model,
      };
    } catch (error) {
      lastError = error;
      console.error(`Gemini model failed: ${model}`, error);
    }
  }

  throw lastError;
}

export async function POST(request) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== "string") {
      return Response.json({ error: "Question is required." }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { error: "Missing GEMINI_API_KEY." },
        { status: 500 }
      );
    }

    const result = await generateWithFallback(question);

    return Response.json({
      answer: result.answer,
      model: result.model,
    });
  } catch (error) {
    console.error("Gemini assistant API error:", error);

    return Response.json(
      { error: "Assistant request failed." },
      { status: 500 }
    );
  }
}