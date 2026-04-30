const cache = new Map();

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    if (cache.has(prompt)) {
      return Response.json({ result: cache.get(prompt) });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "My AI Tool"
      },
      body: JSON.stringify({
        model: "poolside/laguna-xs.2:free",
        messages: [
          { role: "user", content: prompt }
        ],
        max_tokens: 200
      })
    });

    const data = await response.json();
    console.log("DATA:", data);

    const result =
      data?.choices?.[0]?.message?.content ||
      data?.choices?.[0]?.message?.reasoning ||
      "No response";

    cache.set(prompt, result);

    return Response.json({ result });

  } catch (error) {
    return Response.json({ result: "API Error" }, { status: 500 });
  }
}
