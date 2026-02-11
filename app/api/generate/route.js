export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!process.env.OPENROUTER_API_KEY) {
      return Response.json(
        { error: "Missing OPENROUTER_API_KEY" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "arcee-ai/trinity-large-preview:free",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return Response.json({ error: data }, { status: 500 });
    }

    return Response.json({
      result: data.choices?.[0]?.message?.content || "No response",
    });
  } catch (error) {
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}
