const cache = new Map();

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return Response.json({ result: "No prompt provided" }, { status: 400 });
    }

    if (cache.has(prompt)) {
      return Response.json({ result: cache.get(prompt) });
    }

    const models = [
      "poolside/laguna-xs.2:free",   // primary
      "z-ai/glm-4.7-flash",          // fallback 1
      "minimax/minimax-m2.5:free"    // fallback 2
    ];

    let result = null;
    let lastError = null;

    for (const model of models) {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
          },
          body: JSON.stringify({
            model,
            messages: [{ role: "user", content: prompt }],
            max_tokens: 200
          })
        });

        const data = await response.json();

        const content = data?.choices?.[0]?.message?.content?.trim();

        if (content) {
          result = content;
          break; // ✅ success
        } else {
          lastError = data;
        }

      } catch (err) {
        lastError = err;
      }
    }

    if (!result) {
      return Response.json({
        result: "All models failed",
        debug: lastError
      });
    }

    cache.set(prompt, result);

    return Response.json({ result });

  } catch (error) {
    return Response.json({
      result: "Server Error",
      error: error.message
    }, { status: 500 });
  }
}
