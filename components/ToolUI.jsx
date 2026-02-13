"use client";

import { useState } from "react";
import {
  Box,
  Textarea,
  Button,
  Heading,
  Select,
  NumberInput,
  NumberInputField,
  HStack,
} from "@chakra-ui/react";

export default function ToolUI({ title, promptTemplate, options = [] }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(
    options.reduce((acc, opt) => ({ ...acc, [opt.name]: opt.default || "" }), {})
  );

  const handleSettingChange = (name, value) => {
    setSettings({ ...settings, [name]: value });
  };

  async function generate() {
    if (!input) return;

    setLoading(true);
    setOutput("");

    let finalPrompt = promptTemplate.replace("{{input}}", input);
    Object.keys(settings).forEach((key) => {
      finalPrompt = finalPrompt.replace(`{{${key}}}`, settings[key]);
    });

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

      {/* Dynamic Tool Options */}
      {options.map((opt) => {
        if (opt.type === "select") {
          return (
            <Select
              key={opt.name}
              mb={4}
              value={settings[opt.name]}
              onChange={(e) => handleSettingChange(opt.name, e.target.value)}
            >
              {opt.options.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </Select>
          );
        }
        if (opt.type === "number") {
          return (
            <NumberInput
              key={opt.name}
              mb={4}
              value={settings[opt.name]}
              min={opt.min}
              max={opt.max}
              onChange={(valueString) => handleSettingChange(opt.name, valueString)}
            >
              <NumberInputField />
            </NumberInput>
          );
        }
        return null;
      })}

      <Textarea
        placeholder="Enter your input..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        mb={4}
        rows={6}
      />

      <HStack spacing={4} mb={4}>
        <Button colorScheme="teal" onClick={generate} isLoading={loading}>
          Generate
        </Button>
        <Button
          onClick={() => navigator.clipboard.writeText(output)}
          disabled={!output}
        >
          Copy Output
        </Button>
        <Button variant="outline" onClick={() => setInput("")}>
          Clear
        </Button>
      </HStack>

      {output && (
        <Box mt={4} p={6} bg="gray.50" borderRadius="xl" whiteSpace="pre-wrap" maxH="400px" overflowY="auto">
          {output}
        </Box>
      )}
    </Box>
  );
}
