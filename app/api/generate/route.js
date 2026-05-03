const cache = new Map();

const MODELS = [
  "openai/gpt-oss-120b",
  "qwen/qwen3.5-plus-2026-02-15",
  "nvidia/nemotron-nano-9b-v2:free",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function callModel(model, prompt, attempt = 1) {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 25000);

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1500,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content;

    if (!text) throw new Error("Empty response");

    return text;
  } catch (err) {
    clearTimeout(timeout);

    if (attempt < 2) {
      await sleep(500);
      return callModel(model, prompt, attempt + 1);
    }

    throw err;
  }
}

export async function POST(req) {
  const { prompt } = await req.json();

  if (!prompt) {
    return Response.json({ result: "No prompt provided" }, { status: 400 });
  }

  const finalPrompt = `
IMPORTANT:
- Always complete the full response
- Never stop mid-sentence
- Ensure full structured output

USER TASK:
${prompt}
`;

  if (cache.has(finalPrompt)) {
    return Response.json({
      result: cache.get(finalPrompt),
      cached: true,
    });
  }

  let lastError = null;

  for (const model of MODELS) {
    try {
      let result = await callModel(model, finalPrompt);

      // 🔁 AUTO CONTINUE
      if (!result.trim().endsWith(".") && result.length > 400) {
        try {
          const more = await callModel(
            model,
            result + "\nContinue writing."
          );
          result += more;
        } catch {}
      }

      // ✅ SAFE CACHE
      if (result.length > 200 && result.endsWith(".")) {
        cache.set(finalPrompt, result);
      }

      return Response.json({
        result,
        modelUsed: model,
      });
    } catch (err) {
      lastError = err;
    }
  }

  return Response.json(
    {
      result: "All AI models failed. Try again.",
      error: lastError?.message || "Unknown error",
    },
    { status: 500 }
  );
}
