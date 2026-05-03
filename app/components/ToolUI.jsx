"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";

export default function ToolUI({ fields, promptTemplate }) {
  const [form, setForm] = useState({});
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const buildPrompt = () => {
    let prompt = promptTemplate;

    Object.keys(form).forEach((key) => {
      prompt = prompt.replace(`{{${key}}}`, form[key] || "");
    });

    return prompt;
  };

  // 🔥 STREAM FROM BACKEND
  const streamResponse = async (prompt) => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!res.body) {
      throw new Error("No stream received");
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value || new Uint8Array());

      fullText += chunk;

      // 🔥 IMPORTANT (fix UI not updating)
      setResult((prev) => prev + chunk);
    }
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setResult("");

      const prompt = buildPrompt();

      await streamResponse(prompt);

    } catch (err) {
      console.error(err);
      setResult("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
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

        <Box
          bg="gray.50"
          p={4}
          borderRadius="md"
          minH="120px"
          whiteSpace="pre-wrap"
        >
          {loading ? "⚡ Generating..." : result || "Result will appear here"}
        </Box>

      </VStack>
    </Box>
  );
}
