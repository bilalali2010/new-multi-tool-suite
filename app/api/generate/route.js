const MODELS = [
  "openai/gpt-4o-mini",
  "qwen/qwen3.5-plus",
  "nvidia/nemotron-nano-9b-v2:free",
];

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response("No prompt provided", { status: 400 });
    }

    for (const model of MODELS) {
      try {
        console.log("Trying model:", model);

        const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          },
          body: JSON.stringify({
            model,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 1200,
            stream: true,
          }),
        });

        if (!aiRes.body) continue;

        const reader = aiRes.body.getReader();
        const decoder = new TextDecoder();

        const stream = new ReadableStream({
          async start(controller) {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value);
              const lines = chunk.split("\n");

              for (let line of lines) {
                if (line.startsWith("data: ")) {
                  const json = line.replace("data: ", "").trim();

                  if (json === "[DONE]") {
                    controller.close();
                    return;
                  }

                  try {
                    const parsed = JSON.parse(json);
                    const content = parsed.choices?.[0]?.delta?.content;

                    if (content) {
                      controller.enqueue(
                        new TextEncoder().encode(content)
                      );
                    }
                  } catch {}
                }
              }
            }

            controller.close();
          },
        });

        return new Response(stream, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
          },
        });

      } catch (err) {
        console.log("Model failed:", model);
        continue; // 🔁 try next model
      }
    }

    return new Response("All models failed", { status: 500 });

  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
}
