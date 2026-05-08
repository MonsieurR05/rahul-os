export async function POST(request) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== "string") {
      return Response.json(
        { error: "Question is required." },
        { status: 400 }
      );
    }

    const aiUrl = process.env.RAHUL_OS_AI_URL;

    if (!aiUrl) {
      return Response.json(
        {
          error: "Local AI backend is not configured.",
          reason: "missing_ai_url",
        },
        { status: 503 }
      );
    }

    const response = await fetch(`${aiUrl}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      return Response.json(
        {
          error: "Local AI backend unavailable.",
          reason: "local_ai_failed",
        },
        { status: 503 }
      );
    }

    const data = await response.json();

    return Response.json({
      answer: data.answer,
      mode: "local-ollama",
      model: data.model,
    });
  } catch (error) {
    console.error("RahulOS assistant API error:", error);

    return Response.json(
      {
        error: "Assistant unavailable.",
        reason: "request_failed",
      },
      { status: 503 }
    );
  }
}