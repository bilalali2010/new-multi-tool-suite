const cache = new Map();

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return Response.json({ result: "No prompt provided" }, { status: 400 });
    }

    // Cache
    if (cache.has(prompt)) {
      return Response.json({ result: cache.get(prompt) });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "AI Multi Tool Suite"
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b:free", // 🥇 best overall free model
        messages: [
          {
            role: "system",
            content:
              "You are a professional assistant. ALWAYS respond with final answer only. Never show reasoning, thoughts, or planning steps. Never use placeholders like {{length}}. If required details are missing, assume reasonable defaults."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 600,
        temperature: 0.7
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    const data = await response.json();
    console.log("OPENROUTER RESPONSE:", data);

    // Handle API errors
    if (!response.ok || data.error) {
      return Response.json({
        result: data?.error?.message || "API Error",
        debug: data
      }, { status: 500 });
    }

    const result =
      data?.choices?.[0]?.message?.content?.trim();

    if (!result) {
      return Response.json({
        result: "No valid response from model",
        debug: data
      }, { status: 500 });
    }

    cache.set(prompt, result);

    return Response.json({ result });

  } catch (error) {
    console.error("SERVER ERROR:", error);

    if (error.name === "AbortError") {
      return Response.json({ result: "Request timed out" }, { status: 408 });
    }

    return Response.json({
      result: "Server Error",
      error: error.message
    }, { status: 500 });
  }
}
