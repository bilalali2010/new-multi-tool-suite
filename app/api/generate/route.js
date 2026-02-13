export async function POST(req) {
  const { prompt } = await req.json();

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: "arcee-ai/trinity-large-preview:free",
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();

    return Response.json({
      result: data.choices?.[0]?.message?.content || "No response"
    });

  } catch (error) {
    return Response.json({ result: "API Error" }, { status: 500 });
  }
}
