"use client";

import { useState } from "react";
import {
  Box,
  Input,
  Textarea,
  Select,
  NumberInput,
  NumberInputField,
  VStack,
  HStack,
  FormLabel,
  Button,
  Heading,
} from "@chakra-ui/react";

export default function ToolUI({ title, fields = [], promptTemplate }) {
  const [values, setValues] = useState(
    fields.reduce((acc, f) => ({ ...acc, [f.name]: f.default || "" }), {})
  );
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => setValues({ ...values, [name]: value });

  const generate = async () => {
    let prompt = promptTemplate;
    Object.keys(values).forEach((key) => {
      prompt = prompt.replace(`{{${key}}}`, values[key]);
    });

    setLoading(true);
    setOutput("");

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setOutput(data.result || "Error generating response");
    setLoading(false);
  };

  return (
    <Box maxW="4xl" mx="auto" p={8} bg="white" borderRadius="2xl" boxShadow="2xl">
      <Heading size="lg" mb={6}>{title}</Heading>

      <VStack spacing={4} align="stretch" mb={6}>
        {fields.map((f) => (
          <Box key={f.name}>
            <FormLabel>{f.label}</FormLabel>
            {f.type === "text" && (
              <Input
                placeholder={f.placeholder}
                value={values[f.name]}
                onChange={(e) => handleChange(f.name, e.target.value)}
              />
            )}
            {f.type === "textarea" && (
              <Textarea
                placeholder={f.placeholder}
                value={values[f.name]}
                onChange={(e) => handleChange(f.name, e.target.value)}
                rows={4}
              />
            )}
            {f.type === "select" && (
              <Select value={values[f.name]} onChange={(e) => handleChange(f.name, e.target.value)}>
                {f.options.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </Select>
            )}
            {f.type === "number" && (
              <NumberInput
                value={values[f.name]}
                min={f.min}
                max={f.max}
                onChange={(val) => handleChange(f.name, val)}
              >
                <NumberInputField />
              </NumberInput>
            )}
          </Box>
        ))}
      </VStack>

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
      </HStack>

      {output && (
        <Box mt={4} p={6} bg="gray.50" borderRadius="xl" whiteSpace="pre-wrap" maxH="400px" overflowY="auto">
          {output}
        </Box>
      )}
    </Box>
  );
}
