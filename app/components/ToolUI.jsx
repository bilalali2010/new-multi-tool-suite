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
  Collapse,
  IconButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tooltip,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

export default function ToolUI({ title, fields = [], promptTemplate }) {
  const [values, setValues] = useState(
    fields.reduce((acc, f) => ({ ...acc, [f.name]: f.default || "" }), {})
  );
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleChange = (name, value) => setValues({ ...values, [name]: value });

  const generate = async () => {
    let prompt = promptTemplate;
    Object.keys(values).forEach((key) => {
      prompt = prompt.replace(`{{${key}}}`, values[key]);
    });

    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setOutput(data.result || "Error generating response");
    } catch (err) {
      setOutput("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="5xl" mx="auto" p={6} bg="white" borderRadius="2xl" boxShadow="2xl">
      {/* Header */}
      <HStack justify="space-between" mb={4}>
        <Heading size="lg">{title}</Heading>
        <IconButton
          icon={collapsed ? <ChevronDownIcon /> : <ChevronUpIcon />}
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle Inputs"
          variant="ghost"
        />
      </HStack>

      {/* Collapsible Input Panel */}
      <Collapse in={!collapsed} animateOpacity>
        <Tabs variant="enclosed-colored" colorScheme="teal">
          <TabList mb={2}>
            <Tab>Inputs</Tab>
            {fields.some((f) => f.type === "select") && <Tab>Options</Tab>}
          </TabList>

          <TabPanels>
            {/* Inputs Tab */}
            <TabPanel>
              <VStack spacing={4} align="stretch">
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
            </TabPanel>

            {/* Options Tab */}
            <TabPanel>
              <VStack spacing={4} align="stretch">
                {fields
                  .filter((f) => f.type === "select")
                  .map((f) => (
                    <Box key={f.name}>
                      <FormLabel>{f.label}</FormLabel>
                      <Select
                        value={values[f.name]}
                        onChange={(e) => handleChange(f.name, e.target.value)}
                      >
                        {f.options.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </Select>
                    </Box>
                  ))}
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Collapse>

      {/* Action Buttons */}
      <HStack spacing={4} mt={6} mb={4}>
        <Button
          bgGradient="linear(to-r, teal.400, green.400)"
          color="white"
          _hover={{ bgGradient: "linear(to-r, teal.500, green.500)" }}
          onClick={generate}
          isLoading={loading}
        >
          Generate
        </Button>
        <Tooltip label="Copy output to clipboard" placement="top">
          <Button onClick={() => navigator.clipboard.writeText(output)} disabled={!output}>
            Copy Output
          </Button>
        </Tooltip>
      </HStack>

      {/* Output Panel */}
      {output && (
        <Box
          mt={4}
          p={6}
          bg="gray.50"
          borderRadius="xl"
          whiteSpace="pre-wrap"
          maxH="400px"
          overflowY="auto"
        >
          {output}
        </Box>
      )}
    </Box>
  );
}
