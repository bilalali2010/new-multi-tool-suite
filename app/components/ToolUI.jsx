"use client";

import { useState } from "react";
import {
  Box,
  Textarea,
  Input,
  Button,
  Heading,
  Select,
  NumberInput,
  NumberInputField,
  VStack,
  HStack,
  FormLabel,
} from "@chakra-ui/react";

export default function ToolUI({ title, fields = [], promptTemplate }) {
  const [values, setValues] = useState(
    fields.reduce((acc, f) => ({ ...acc, [f.name]: f.default || "" }), {})
  );
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

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
    <Box maxW="4xl" mx="auto" bg="white" p={8} borderRadius="2xl" boxShadow="xl">
      <Heading size="lg" mb={6}>{title}</Heading>

      <VStack spacing={4} align="stretch" mb={6}>
        {fields.map((field) => (
          <Box key={field.name}>
            <FormLabel>{field.label}</FormLabel>
            {field.type === "text" && (
              <Input
                placeholder={field.placeholder}
                value={values[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            )}
            {field.type === "textarea" && (
              <Textarea
                placeholder={field.placeholder}
                value={values[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
                rows={4}
              />
            )}
            {field.type === "select" && (
              <Select
                value={values[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </Select>
            )}
            {field.type === "number" && (
              <NumberInput
                value={values[field.name]}
                min={field.min}
                max={field.max}
                onChange={(val) => handleChange(field.name, val)}
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
