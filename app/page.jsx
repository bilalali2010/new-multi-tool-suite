"use client";

import { useState } from "react";
import ToolUI from "./components/ToolUI";
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  VStack,
  SimpleGrid,
  Button,
  Badge,
  Select,
  Divider,
} from "@chakra-ui/react";

// ============================
// 🚀 FULL TOOL SUITE (HIGH DEMAND + CORE)
// ============================
const tools = {

  // ================= WRITING =================
  blog: {
    title: "📝 AI Blog Generator",
    category: "Writing",
    fields: [{ label: "Topic", name: "topic", type: "text" }],
    basePrompt: "Write a high-quality blog about {{topic}}",
  },

  email: {
    title: "📧 Email Writer",
    category: "Writing",
    fields: [{ label: "Purpose", name: "purpose", type: "text" }],
    basePrompt: "Write a professional email for {{purpose}}",
  },

  rewriter: {
    title: "✍️ Text Rewriter",
    category: "Writing",
    fields: [{ label: "Text", name: "text", type: "textarea" }],
    basePrompt: "Rewrite this text: {{text}}",
  },

  notes: {
    title: "📚 Study Notes Summarizer",
    category: "Education",
    fields: [{ label: "Text", name: "text", type: "textarea" }],
    basePrompt: "Summarize and simplify: {{text}}",
  },

  // ================= MARKETING =================
  caption: {
    title: "📱 Social Caption Writer",
    category: "Marketing",
    fields: [{ label: "Post", name: "description", type: "text" }],
    basePrompt: "Write viral captions for {{description}}",
  },

  adcopy: {
    title: "📢 Ad Copy Generator",
    category: "Marketing",
    fields: [{ label: "Product", name: "product", type: "text" }],
    basePrompt: "Write high-converting ad copy for {{product}}",
  },

  landing: {
    title: "🎯 Landing Page Generator",
    category: "Marketing",
    fields: [{ label: "Product", name: "product", type: "text" }],
    basePrompt: "Create landing page copy for {{product}}",
  },

  coldemail: {
    title: "📨 Cold Email Outreach",
    category: "Marketing",
    fields: [{ label: "Offer", name: "offer", type: "text" }],
    basePrompt: "Write cold outreach email for {{offer}}",
  },

  linkedin: {
    title: "💼 LinkedIn Post Generator",
    category: "Marketing",
    fields: [{ label: "Topic", name: "topic", type: "text" }],
    basePrompt: "Write viral LinkedIn post about {{topic}}",
  },

  seo: {
    title: "🔍 SEO Keyword Generator",
    category: "SEO",
    fields: [{ label: "Topic", name: "topic", type: "text" }],
    basePrompt: "Generate SEO keywords for {{topic}}",
  },

  // ================= BUSINESS =================
  businessplan: {
    title: "📊 Business Plan Generator",
    category: "Business",
    fields: [{ label: "Idea", name: "idea", type: "text" }],
    basePrompt: "Create business plan for {{idea}}",
  },

  pitchdeck: {
    title: "📈 Pitch Deck Creator",
    category: "Business",
    fields: [{ label: "Startup", name: "startup", type: "text" }],
    basePrompt: "Create pitch deck for {{startup}}",
  },

  jobdesc: {
    title: "🧑‍💼 Job Description Generator",
    category: "HR",
    fields: [{ label: "Role", name: "role", type: "text" }],
    basePrompt: "Write job description for {{role}}",
  },

  // ================= PRODUCTIVITY =================
  workflow: {
    title: "⚙️ AI Workflow Planner",
    category: "Automation",
    fields: [{ label: "Task", name: "task", type: "text" }],
    basePrompt: "Break task into automation steps: {{task}}",
  },

  // ================= CREATIVE =================
  logo: {
    title: "🎨 Logo Generator",
    category: "Design",
    fields: [{ label: "Brand", name: "brandName", type: "text" }],
    basePrompt: "Create logo ideas for {{brandName}}",
  },
};

// ============================
// 🚀 UNIVERSAL AI CONTROLS
// ============================
const controlOptions = {
  type: ["Informative", "Creative", "Persuasive", "Professional"],
  tone: ["Friendly", "Formal", "Funny", "Sales", "Neutral"],
  length: ["Short", "Medium", "Long"],
  style: ["Simple", "Advanced", "Viral"],
};

export default function Home() {
  const [selectedTool, setSelectedTool] = useState("blog");
  const [search, setSearch] = useState("");

  const [controls, setControls] = useState({
    type: "Informative",
    tone: "Professional",
    length: "Medium",
    style: "Simple",
  });

  const currentTool = tools[selectedTool];

  // ============================
  // 🚀 PROMPT ENGINE (CORE LOGIC)
  // ============================
  const buildPrompt = (tool) => {
    return `
AI SYSTEM INSTRUCTIONS:
- Type: ${controls.type}
- Tone: ${controls.tone}
- Length: ${controls.length}
- Style: ${controls.style}

Follow strictly and generate high-quality output.

TASK:
${tool.basePrompt}
`;
  };

  const filteredTools = Object.entries(tools).filter(([_, tool]) =>
    tool.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Flex h="100vh" bg="gray.50">

      {/* ================= SIDEBAR ================= */}
      <Box w="260px" bg="white" borderRight="1px solid #eee" p={4}>
        <Heading size="md" color="teal.500" mb={4}>
          ⚡ AI Studio Pro
        </Heading>

        <Input
          placeholder="Search tools..."
          mb={4}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <VStack spacing={2} align="stretch">
          {filteredTools.map(([key, tool]) => (
            <Button
              key={key}
              size="sm"
              variant={selectedTool === key ? "solid" : "ghost"}
              colorScheme="teal"
              onClick={() => setSelectedTool(key)}
            >
              {tool.title}
            </Button>
          ))}
        </VStack>
      </Box>

      {/* ================= MAIN ================= */}
      <Box flex="1" p={6} overflowY="auto">

        {/* HEADER */}
        <Flex justify="space-between" align="center" mb={4}>
          <Box>
            <Heading size="lg">
              {currentTool.title}
            </Heading>
            <Text color="gray.500">
              AI SaaS Multi-Tool Platform
            </Text>
          </Box>

          <Badge colorScheme="green" p={2}>
            PRO MODE
          </Badge>
        </Flex>

        <Divider mb={4} />

        {/* ================= UNIVERSAL CONTROLS ================= */}
        <SimpleGrid columns={2} spacing={4} mb={6}>
          {Object.keys(controlOptions).map((key) => (
            <Box key={key}>
              <Text fontSize="sm" fontWeight="bold" mb={1}>
                {key.toUpperCase()}
              </Text>

              <Select
                value={controls[key]}
                onChange={(e) =>
                  setControls({ ...controls, [key]: e.target.value })
                }
              >
                {controlOptions[key].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Select>
            </Box>
          ))}
        </SimpleGrid>

        <Divider mb={6} />

        {/* ================= TOOL UI ================= */}
        <Box bg="white" p={6} borderRadius="xl" boxShadow="sm">
          <ToolUI
            title={currentTool.title}
            fields={currentTool.fields}
            promptTemplate={buildPrompt(currentTool)}
          />
        </Box>

      </Box>
    </Flex>
  );
}
