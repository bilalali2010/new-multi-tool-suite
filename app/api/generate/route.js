export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response("No prompt provided", { status: 400 });
    }

    console.log("Streaming API HIT");

    const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "qwen/qwen3.5-plus",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1500,
        stream: true,
      }),
    });

    if (!aiRes.body) {
      return new Response("No stream received from AI", { status: 500 });
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = aiRes.body.getReader();

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
                  controller.enqueue(encoder.encode(content));
                }
              } catch (err) {
                console.log("Parse error", err);
              }
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
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
}
