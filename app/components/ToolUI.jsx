import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Textarea,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function ToolUI({ title, fields, promptTemplate }) {
  const [form, setForm] = useState({});
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const buildPrompt = () => {
    let prompt = promptTemplate;

    Object.keys(form).forEach((key) => {
      prompt = prompt.replace(`{{${key}}}`, form[key]);
    });

    return prompt;
  };

  // 🚀 STREAM FUNCTION
  const streamResponse = async (prompt) => {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1500,
        temperature: 0.7,
        stream: true,
      }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      const lines = chunk.split("\n");

      for (let line of lines) {
        if (line.startsWith("data: ")) {
          const json = line.replace("data: ", "").trim();

          if (json === "[DONE]") break;

          try {
            const parsed = JSON.parse(json);
            const content = parsed.choices?.[0]?.delta?.content;

            if (content) {
              fullText += content;
              setResult(fullText); // 🔥 live update
            }
          } catch (err) {}
        }
      }
    }

    // 🔁 AUTO CONTINUE
    if (
      !fullText.trim().endsWith(".") &&
      fullText.length > 300
    ) {
      await streamResponse(fullText + "\nContinue writing.");
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");

    const prompt = buildPrompt();

    await streamResponse(prompt);

    setLoading(false);
  };

  return (
    <Box>
      <VStack spacing={3} align="stretch">
        {fields.map((field) =>
          field.type === "textarea" ? (
            <Textarea
              key={field.name}
              placeholder={field.label}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          ) : (
            <Input
              key={field.name}
              placeholder={field.label}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          )
        )}

        <Button
          colorScheme="teal"
          onClick={handleGenerate}
          isLoading={loading}
        >
          Generate
        </Button>

        <Text whiteSpace="pre-wrap">
          {result}
        </Text>
      </VStack>
    </Box>
  );
}
