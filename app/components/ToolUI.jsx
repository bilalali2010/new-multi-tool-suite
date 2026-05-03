"use client";

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

  // =============================
  // HANDLE INPUT CHANGE
  // =============================
  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // =============================
  // BUILD PROMPT
  // =============================
  const buildPrompt = () => {
    let prompt = promptTemplate;

    Object.keys(form).forEach((key) => {
      prompt = prompt.replace(`{{${key}}}`, form[key] || "");
    });

    return prompt;
  };

  // =============================
  // CALL BACKEND API (FIXED)
  // =============================
  const generateResponse = async (prompt) => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to generate response");
    }

    return data.result;
  };

  // =============================
  // GENERATE HANDLER
  // =============================
  const handleGenerate = async () => {
    try {
      setLoading(true);
      setResult("");

      const prompt = buildPrompt();

      const output = await generateResponse(prompt);

      setResult(output);
    } catch (err) {
      console.error(err);
      setResult("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // UI
  // =============================
  return (
    <Box>
      <VStack spacing={3} align="stretch">

        {/* INPUT FIELDS */}
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

        {/* GENERATE BUTTON */}
        <Button
          colorScheme="teal"
          onClick={handleGenerate}
          isLoading={loading}
        >
          Generate
        </Button>

        {/* RESULT OUTPUT */}
        <Box
          bg="gray.50"
          p={4}
          borderRadius="md"
          minH="120px"
          whiteSpace="pre-wrap"
        >
          {loading ? "⏳ Generating..." : result || "Your result will appear here..."}
        </Box>

      </VStack>
    </Box>
  );
}
