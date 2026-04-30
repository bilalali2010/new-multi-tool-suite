const cache = new Map();

// 🧠 Smart model fallback chain (BEST → FAST → LIGHT)
const MODELS = [
  "openai/gpt-oss-120b",                 // 🥇 best quality
  "qwen/qwen3.5-plus-2026-02-15",        // 🥈 balanced
  "nvidia/nemotron-nano-9b-v2:free"      // 🥉 fast fallback
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// 🔁 Single model call with retry
async function callModel(model, prompt, attempt = 1) {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 15000); // 15s timeout

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
        max_tokens: 500,
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

  // ⚡ Cache hit
  if (cache.has(prompt)) {
    return Response.json({
      result: cache.get(prompt),
      cached: true,
    });
  }

  let lastError = null;

  // 🔁 Try multiple models
  for (const model of MODELS) {
    try {
      const result = await callModel(model, prompt);

      cache.set(prompt, result);

      return Response.json({
        result,
        modelUsed: model,
      });
    } catch (err) {
      lastError = err;
      console.log(`Model failed: ${model}`);
    }
  }

  // ❌ All failed
  return Response.json(
    {
      result:
        "All AI models failed. Please try again in a few seconds.",
      error: lastError?.message || "Unknown error",
    },
    { status: 500 }
  );
}
