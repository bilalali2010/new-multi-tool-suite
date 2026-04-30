const cache = new Map();

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return Response.json({ result: "No prompt provided" }, { status: 400 });
    }

    // Cache check
    if (cache.has(prompt)) {
      return Response.json({ result: cache.get(prompt) });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: "poolside/laguna-xs.2:free", // your model
        messages: [
          { role: "user", content: prompt }
        ],
        max_tokens: 200
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    // 🔴 RAW TEXT (IMPORTANT DEBUG)
    const rawText = await response.text();
    console.log("RAW RESPONSE:", rawText);

    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      return Response.json({
        result: "Invalid JSON from API",
        debug: rawText
      });
    }

    // ❗ If API returns error
    if (!response.ok || data.error) {
      return Response.json({
        result: "API Error: " + (data?.error?.message || "Unknown error"),
        debug: data
      }, { status: 500 });
    }

    const result = data?.choices?.[0]?.message?.content;

    if (!result) {
      return Response.json({
        result: "No response from model",
        debug: data
      });
    }

    cache.set(prompt, result);

    return Response.json({ result });

  } catch (error) {
    console.error("SERVER ERROR:", error);

    if (error.name === "AbortError") {
      return Response.json({ result: "Request timed out" }, { status: 408 });
    }

    return Response.json({
      result: "Server crashed",
      error: error.message
    }, { status: 500 });
  }
}
