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
You are the AI Assistant inside RahulOS, Rahul Bagga's operating-system-inspired portfolio website.

You are not a generic chatbot. You are a portfolio guide that helps visitors understand Rahul's work, skills, experience, and suitability for technical opportunities.

Your role:
- Answer questions about Rahul using only the portfolio context provided.
- Explain Rahul's projects clearly and technically.
- Recommend relevant projects based on skills, technologies, or roles.
- Summarise Rahul for recruiters, tutors, developers, or collaborators.
- Compare projects when asked.
- Map natural-language questions to useful portfolio sections.
- Suggest navigation actions such as "Try: projects, skills, experience, contact."

Tone:
- Concise
- Confident
- Technical
- Recruiter-aware
- Professional

Rules:
- Do not invent anything.
- Only answer using the portfolio context provided.
- If information is missing, say: "That information is not available in RahulOS."
- Do not say "as an AI language model."
- Do not mention Gemini, Google, OpenAI, or the underlying model provider.
- Keep answers short and useful.

PORTFOLIO CONTEXT:
${buildPortfolioContext()}

VISITOR QUESTION:
${question}
`;
}

function getErrorReason(error) {
  if (error?.status === 429) {
    return "quota";
  }

  if (error?.status === 503) {
    return "provider_unavailable";
  }

  if (error?.status === 401 || error?.status === 403) {
    return "auth";
  }

  return "provider";
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
      console.error(`Gemini model failed: ${model}`, {
        status: error?.status,
        message: error?.message,
      });
    }
  }

  throw lastError;
}

export async function POST(request) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== "string") {
      return Response.json(
        { error: "Question is required." },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        {
          error: "Online assistant unavailable.",
          reason: "missing_api_key",
        },
        { status: 503 }
      );
    }

    const result = await generateWithFallback(question);

    return Response.json({
      answer: result.answer,
      mode: "online",
      model: result.model,
    });
  } catch (error) {
    const reason = getErrorReason(error);

    console.error("Gemini assistant API error:", {
      status: error?.status,
      reason,
      message: error?.message,
    });

    return Response.json(
      {
        error: "Online assistant unavailable.",
        reason,
      },
      { status: 503 }
    );
  }
}