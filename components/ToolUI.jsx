"use client";

import { useState } from "react";
import { Box, Textarea, Button, Heading } from "@chakra-ui/react";

export default function ToolUI({ title, promptTemplate }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    if (!input) return;

    setLoading(true);
    setOutput("");

    const finalPrompt = promptTemplate.replace("{{input}}", input);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: finalPrompt }),
    });

    const data = await res.json();
    setOutput(data.result || "Error generating response");
    setLoading(false);
  }

  return (
    <Box maxW="4xl" mx="auto" bg="white" p={8} borderRadius="2xl" boxShadow="xl">
      <Heading size="lg" mb={6}>{title}</Heading>

      <Textarea
        placeholder="Enter your input..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        mb={6}
        rows={6}
      />

      <Button colorScheme="teal" onClick={generate} isLoading={loading}>
        Generate
      </Button>

      {output && (
        <Box mt={8} p={6} bg="gray.50" borderRadius="xl" whiteSpace="pre-wrap">
          {output}
        </Box>
      )}
    </Box>
  );
}
