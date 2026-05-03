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
  IconButton,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

// ==============================
// TOOLS (same 16 tools)
// ==============================
const tools = {
  blog: { title: "📝 Blog", fields: [{ name: "topic", label: "Topic", type: "text" }], basePrompt: "Write a blog about {{topic}}" },
  email: { title: "📧 Email", fields: [{ name: "purpose", label: "Purpose", type: "text" }], basePrompt: "Write an email for {{purpose}}" },
  rewriter: { title: "✍️ Rewrite", fields: [{ name: "text", label: "Text", type: "textarea" }], basePrompt: "Rewrite: {{text}}" },
  notes: { title: "📚 Notes", fields: [{ name: "text", label: "Text", type: "textarea" }], basePrompt: "Summarize: {{text}}" },
  caption: { title: "📱 Caption", fields: [{ name: "description", label: "Post", type: "text" }], basePrompt: "Write captions for {{description}}" },
  adcopy: { title: "📢 Ads", fields: [{ name: "product", label: "Product", type: "text" }], basePrompt: "Ad copy for {{product}}" },
  seo: { title: "🔍 SEO", fields: [{ name: "topic", label: "Topic", type: "text" }], basePrompt: "SEO keywords for {{topic}}" },
  logo: { title: "🎨 Logo", fields: [{ name: "brandName", label: "Brand", type: "text" }], basePrompt: "Logo ideas for {{brandName}}" },
  chatbot: { title: "🤖 Chat", fields: [{ name: "message", label: "Message", type: "textarea" }], basePrompt: "Reply to: {{message}}" },
  resume: { title: "📄 Resume", fields: [{ name: "details", label: "Details", type: "textarea" }], basePrompt: "Build resume from {{details}}" },
  youtube: { title: "🎥 YouTube", fields: [{ name: "idea", label: "Idea", type: "text" }], basePrompt: "YouTube script: {{idea}}" },
  code: { title: "💻 Code", fields: [{ name: "task", label: "Task", type: "textarea" }], basePrompt: "Generate code for {{task}}" },
  story: { title: "📖 Story", fields: [{ name: "idea", label: "Idea", type: "text" }], basePrompt: "Write story about {{idea}}" },
  interview: { title: "🧠 Interview", fields: [{ name: "role", label: "Role", type: "text" }], basePrompt: "Interview Q&A for {{role}}" },
  product: { title: "🛍️ Product", fields: [{ name: "product", label: "Product", type: "text" }], basePrompt: "Product description: {{product}}" },
  social: { title: "📊 Social", fields: [{ name: "topic", label: "Topic", type: "text" }], basePrompt: "Social posts about {{topic}}" },
};

const controlOptions = {
  type: ["Informative", "Creative", "Persuasive", "Professional"],
  tone: ["Friendly", "Formal", "Funny", "Sales"],
  length: ["Short", "Medium", "Long"],
  style: ["Simple", "Advanced", "Viral"],
};

export default function Home() {
  const [selectedTool, setSelectedTool] = useState("blog");

  const [controls, setControls] = useState({
    type: "Informative",
    tone: "Professional",
    length: "Medium",
    style: "Simple",
  });

  const currentTool = tools[selectedTool];

  const buildPrompt = (tool) => `
Type: ${controls.type}
Tone: ${controls.tone}
Length: ${controls.length}
Style: ${controls.style}

TASK:
${tool.basePrompt}
`;

  // ==============================
  // MOBILE TOOL SWITCHER (KEY FIX)
  // ==============================
  const MobileToolSelector = () => (
    <Select
      value={selectedTool}
      onChange={(e) => setSelectedTool(e.target.value)}
      size="sm"
      bg="white"
    >
      {Object.keys(tools).map((key) => (
        <option key={key} value={key}>
          {tools[key].title}
        </option>
      ))}
    </Select>
  );

  return (
    <Flex minH="100vh" bg="gray.50">

      {/* ================= DESKTOP SIDEBAR ================= */}
      <Box
        display={{ base: "none", md: "block" }}
        w="280px"
        bg="white"
        borderRight="1px solid #eee"
        p={4}
      >
        <Heading size="md" color="teal.500" mb={4}>
          ⚡ AI Studio
        </Heading>

        <VStack align="stretch">
          {Object.keys(tools).map((key) => (
            <Button
              key={key}
              size="sm"
              variant={selectedTool === key ? "solid" : "ghost"}
              onClick={() => setSelectedTool(key)}
            >
              {tools[key].title}
            </Button>
          ))}
        </VStack>
      </Box>

      {/* ================= MAIN ================= */}
      <Box flex="1" p={{ base: 3, md: 6 }} maxW="1100px" mx="auto" w="100%">

        {/* HEADER (MOBILE FRIENDLY) */}
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={3}
          align={{ md: "center" }}
          justify="space-between"
          mb={4}
        >
          <Box>
            <Heading size="md">{currentTool.title}</Heading>
            <Text fontSize="sm" color="gray.500">
              AI SaaS Tool Platform
            </Text>
          </Box>

          {/* 🔥 MOBILE TOOL SWITCHER */}
          <Box display={{ base: "block", md: "none" }}>
            <MobileToolSelector />
          </Box>

          <Badge colorScheme="green">PRO</Badge>
        </Flex>

        <Divider mb={4} />

        {/* CONTROLS (STACKED ON MOBILE FIX) */}
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={3} mb={6}>
          {Object.keys(controlOptions).map((key) => (
            <Box key={key}>
              <Text fontSize="xs" fontWeight="bold" mb={1}>
                {key}
              </Text>

              <Select
                size="sm"
                value={controls[key]}
                onChange={(e) =>
                  setControls({ ...controls, [key]: e.target.value })
                }
              >
                {controlOptions[key].map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </Select>
            </Box>
          ))}
        </SimpleGrid>

        {/* TOOL UI (FULL MOBILE WIDTH FEEL) */}
        <Box
          bg="white"
          p={{ base: 3, md: 6 }}
          borderRadius="xl"
          boxShadow="sm"
          w="100%"
        >
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
