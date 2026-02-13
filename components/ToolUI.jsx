"use client";

import { useState } from "react";
import { Box, Button, Textarea, VStack } from "@chakra-ui/react";

export default function ToolUI({ title, promptTemplate }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setOutput("");

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: promptTemplate.replace("{{input}}", input)
      }),
    });

    const data = await res.json();
    setOutput(data.result || "Error generating response");
    setLoading(false);
  }

  return (
    <VStack spacing={4} align="stretch" maxW="800px">
      <Textarea
        placeholder="Enter your input..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={6}
      />

      <Button
        colorScheme="teal"
        onClick={generate}
        isLoading={loading}
      >
        Generate
      </Button>

      {output && (
        <Box p={4} bg="gray.50" rounded="md" whiteSpace="pre-wrap">
          {output}
        </Box>
      )}
    </VStack>
  );
}
