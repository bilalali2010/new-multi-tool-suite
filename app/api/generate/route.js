const cache = new Map();

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    // ✅ Return cached result if exists
    if (cache.has(prompt)) {
      return Response.json({ result: cache.get(prompt) });
    }

    // ✅ Timeout setup (prevents long waiting)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000); // 12 sec

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: "google/gemma-4-26b-a4b-it:free",
        messages: [
          { role: "user", content: prompt }
        ],
        max_tokens: 150,        // ✅ limit output (faster)
        temperature: 0.7        // ✅ balanced response
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    // ✅ Handle bad responses
    if (!response.ok) {
      return Response.json(
        { result: "API Error: " + response.status },
        { status: response.status }
      );
    }

    const data = await response.json();

    const result =
      data?.choices?.[0]?.message?.content?.trim() || "No response";

    // ✅ Save to cache
    cache.set(prompt, result);

    return Response.json({ result });

  } catch (error) {
    // ✅ Handle timeout separately
    if (error.name === "AbortError") {
      return Response.json(
        { result: "Request timed out. Try again." },
        { status: 408 }
      );
    }

    return Response.json(
      { result: "Server Error" },
      { status: 500 }
    );
  }
}
