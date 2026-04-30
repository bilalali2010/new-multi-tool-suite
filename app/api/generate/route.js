const cache = new Map();

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    // Cache check
    if (cache.has(prompt)) {
      return Response.json({ result: cache.get(prompt) });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: "kwaivgi/kling-v3.0-pro",
        messages: [
          { role: "user", content: prompt }
        ],
        max_tokens: 200,
        temperature: 0.7
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    const data = await response.json();

    const result =
      data?.choices?.[0]?.message?.content?.trim() || "No response";

    // Save to cache
    cache.set(prompt, result);

    return Response.json({ result });

  } catch (error) {
    if (error.name === "AbortError") {
      return Response.json({ result: "Request timed out" }, { status: 408 });
    }

    return Response.json({ result: "API Error" }, { status: 500 });
  }
}
