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
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

// ==============================
// 🚀 ALL HIGH-DEMAND AI TOOLS
// ==============================
const tools = {
  // ===== WRITING =====
  blog: {
    title: "📝 AI Blog Generator",
    fields: [{ label: "Topic", name: "topic", type: "text" }],
    basePrompt: "Write a high-quality blog about {{topic}}",
  },

  email: {
    title: "📧 Email Writer",
    fields: [{ label: "Purpose", name: "purpose", type: "text" }],
    basePrompt: "Write a professional email for {{purpose}}",
  },

  rewriter: {
    title: "✍️ Text Rewriter",
    fields: [{ label: "Text", name: "text", type: "textarea" }],
    basePrompt: "Rewrite this text: {{text}}",
  },

  notes: {
    title: "📚 Study Notes Summarizer",
    fields: [{ label: "Text", name: "text", type: "textarea" }],
    basePrompt: "Summarize and simplify: {{text}}",
  },

  // ===== MARKETING =====
  caption: {
    title: "📱 Social Caption Writer",
    fields: [{ label: "Post", name: "description", type: "text" }],
    basePrompt: "Write viral captions for {{description}}",
  },

  adcopy: {
    title: "📢 Ad Copy Generator",
    fields: [{ label: "Product", name: "product", type: "text" }],
    basePrompt: "Write high-converting ad copy for {{product}}",
  },

  landing: {
    title: "🎯 Landing Page Generator",
    fields: [{ label: "Product", name: "product", type: "text" }],
    basePrompt: "Create landing page copy for {{product}}",
  },

  coldemail: {
    title: "📨 Cold Email Outreach",
    fields: [{ label: "Offer", name: "offer", type: "text" }],
    basePrompt: "Write cold outreach email for {{offer}}",
  },

  linkedin: {
    title: "💼 LinkedIn Post Generator",
    fields: [{ label: "Topic", name: "topic", type: "text" }],
    basePrompt: "Write viral LinkedIn post about {{topic}}",
  },

  seo: {
    title: "🔍 SEO Keyword Generator",
    fields: [{ label: "Topic", name: "topic", type: "text" }],
    basePrompt: "Generate SEO keywords for {{topic}}",
  },

  // ===== BUSINESS =====
  businessplan: {
    title: "📊 Business Plan Generator",
    fields: [{ label: "Idea", name: "idea", type: "text" }],
    basePrompt: "Create business plan for {{idea}}",
  },

  pitchdeck: {
    title: "📈 Pitch Deck Creator",
    fields: [{ label: "Startup", name: "startup", type: "text" }],
    basePrompt: "Create startup pitch deck for {{startup}}",
  },

  jobdesc: {
    title: "🧑‍💼 Job Description Generator",
    fields: [{ label: "Role", name: "role", type: "text" }],
    basePrompt: "Write job description for {{role}}",
  },

  workflow: {
    title: "⚙️ AI Workflow Planner",
    fields: [{ label: "Task", name: "task", type: "text" }],
    basePrompt: "Break task into automation steps: {{task}}",
  },

  // ===== DESIGN =====
  logo: {
    title: "🎨 Logo Generator",
    fields: [{ label: "Brand", name: "brandName", type: "text" }],
    basePrompt: "Create logo ideas for {{brandName}}",
  },
};

// ==============================
// ⚙️ UNIVERSAL CONTROLS
// ==============================
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

  const { isOpen, onOpen, onClose } = useDisclosure();

  const currentTool = tools[selectedTool];

  // ==============================
  // 🚀 PROMPT ENGINE
  // ==============================
  const buildPrompt = (tool) => `
AI SYSTEM SETTINGS:
- Type: ${controls.type}
- Tone: ${controls.tone}
- Length: ${controls.length}
- Style: ${controls.style}

TASK:
${tool.basePrompt}
`;

  // ==============================
  // SIDEBAR COMPONENT
  // ==============================
  const Sidebar = () => (
    <VStack spacing={2} align="stretch">
      {Object.keys(tools).map((key) => (
        <Button
          key={key}
          size="sm"
          variant={selectedTool === key ? "solid" : "ghost"}
          colorScheme="teal"
          onClick={() => {
            setSelectedTool(key);
            onClose();
          }}
        >
          {tools[key].title}
        </Button>
      ))}
    </VStack>
  );

  const filteredTools = Object.entries(tools).filter(([_, tool]) =>
    tool.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Flex minH="100vh" bg="gray.50">

      {/* ================= DESKTOP SIDEBAR ================= */}
      <Box
        display={{ base: "none", md: "block" }}
        w="260px"
        bg="white"
        borderRight="1px solid #eee"
        p={4}
      >
        <Heading size="md" color="teal.500" mb={4}>
          ⚡ AI Studio Pro
        </Heading>

        <Input
          placeholder="Search tools..."
          mb={4}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Sidebar />
      </Box>

      {/* ================= MOBILE HEADER ================= */}
      <Flex
        display={{ base: "flex", md: "none" }}
        p={4}
        bg="white"
        borderBottom="1px solid #eee"
        justify="space-between"
        align="center"
      >
        <Heading size="sm" color="teal.500">
          ⚡ AI Studio
        </Heading>

        <IconButton icon={<HamburgerIcon />} onClick={onOpen} />
      </Flex>

      {/* ================= MOBILE DRAWER ================= */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody mt={6}>
            <Sidebar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* ================= MAIN AREA ================= */}
      <Box flex="1" p={{ base: 4, md: 6 }}>

        {/* HEADER */}
        <Flex justify="space-between" align="center" mb={4}>
          <Box>
            <Heading size="md">
              {currentTool.title}
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Full SaaS AI Tool Platform
            </Text>
          </Box>

          <Badge colorScheme="green">PRO</Badge>
        </Flex>

        <Divider mb={4} />

        {/* ================= CONTROLS ================= */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3} mb={6}>
          {Object.keys(controlOptions).map((key) => (
            <Box key={key}>
              <Text fontSize="xs" fontWeight="bold" mb={1}>
                {key.toUpperCase()}
              </Text>

              <Select
                size="sm"
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

        {/* ================= TOOL ================= */}
        <Box
          bg="white"
          p={{ base: 4, md: 6 }}
          borderRadius="xl"
          boxShadow="sm"
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
