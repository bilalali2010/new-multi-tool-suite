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
// TOOLS (same as your 16 tools)
// ==============================
const tools = {
  blog: { title: "📝 AI Blog Generator", fields: [{ label: "Topic", name: "topic", type: "text" }], basePrompt: "Write a blog about {{topic}}" },
  email: { title: "📧 Email Writer", fields: [{ label: "Purpose", name: "purpose", type: "text" }], basePrompt: "Write an email for {{purpose}}" },
  rewriter: { title: "✍️ Text Rewriter", fields: [{ label: "Text", name: "text", type: "textarea" }], basePrompt: "Rewrite: {{text}}" },
  notes: { title: "📚 Notes Summarizer", fields: [{ label: "Text", name: "text", type: "textarea" }], basePrompt: "Summarize: {{text}}" },
  caption: { title: "📱 Caption Writer", fields: [{ label: "Post", name: "description", type: "text" }], basePrompt: "Write captions for {{description}}" },
  adcopy: { title: "📢 Ad Copy", fields: [{ label: "Product", name: "product", type: "text" }], basePrompt: "Write ad copy for {{product}}" },
  seo: { title: "🔍 SEO Generator", fields: [{ label: "Topic", name: "topic", type: "text" }], basePrompt: "SEO keywords for {{topic}}" },
  logo: { title: "🎨 Logo Generator", fields: [{ label: "Brand", name: "brandName", type: "text" }], basePrompt: "Logo ideas for {{brandName}}" },
  chatbot: { title: "🤖 AI Chatbot", fields: [{ label: "Message", name: "message", type: "textarea" }], basePrompt: "Reply to: {{message}}" },
  resume: { title: "📄 Resume Builder", fields: [{ label: "Details", name: "details", type: "textarea" }], basePrompt: "Create resume from: {{details}}" },
  youtube: { title: "🎥 YouTube Script", fields: [{ label: "Idea", name: "idea", type: "text" }], basePrompt: "Write script about: {{idea}}" },
  code: { title: "💻 Code Generator", fields: [{ label: "Task", name: "task", type: "textarea" }], basePrompt: "Generate code for: {{task}}" },
  story: { title: "📖 Story Generator", fields: [{ label: "Idea", name: "idea", type: "text" }], basePrompt: "Write story about: {{idea}}" },
  interview: { title: "🧠 Interview Q&A", fields: [{ label: "Role", name: "role", type: "text" }], basePrompt: "Interview Q&A for: {{role}}" },
  product: { title: "🛍️ Product Description", fields: [{ label: "Product", name: "product", type: "text" }], basePrompt: "Describe: {{product}}" },
  social: { title: "📊 Social Posts", fields: [{ label: "Topic", name: "topic", type: "text" }], basePrompt: "Create posts about: {{topic}}" },
};

const controlOptions = {
  type: ["Informative", "Creative", "Persuasive", "Professional"],
  tone: ["Friendly", "Formal", "Funny", "Sales"],
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

  const buildPrompt = (tool) => `
Type: ${controls.type}
Tone: ${controls.tone}
Length: ${controls.length}
Style: ${controls.style}

TASK:
${tool.basePrompt}
`;

  const Sidebar = () => (
    <VStack spacing={2} align="stretch">
      {Object.keys(tools).map((key) => (
        <Button
          key={key}
          size="sm"
          variant={selectedTool === key ? "solid" : "ghost"}
          colorScheme="teal"
          justifyContent="flex-start"
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

  return (
    <Flex minH="100vh" bg="gray.50">

      {/* ================= DESKTOP SIDEBAR ================= */}
      <Box
        display={{ base: "none", md: "block" }}
        w="280px"
        bg="white"
        borderRight="1px solid #eee"
        p={4}
        position="sticky"
        top="0"
        h="100vh"
        overflowY="auto"
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
        p={3}
        bg="white"
        borderBottom="1px solid #eee"
        justify="space-between"
        align="center"
        position="sticky"
        top="0"
        zIndex="10"
      >
        <Heading size="sm" color="teal.500">
          ⚡ AI Studio
        </Heading>

        <IconButton icon={<HamburgerIcon />} onClick={onOpen} />
      </Flex>

      {/* MOBILE DRAWER */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody mt={6}>
            <Input
              placeholder="Search tools..."
              mb={4}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Sidebar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* ================= MAIN AREA ================= */}
      <Box
        flex="1"
        p={{ base: 3, md: 6 }}
        maxW="1200px"
        mx="auto"
        w="100%"
      >

        {/* HEADER */}
        <Flex
          justify="space-between"
          align="center"
          mb={4}
          flexWrap="wrap"
          gap={2}
        >
          <Box>
            <Heading size="md">{currentTool.title}</Heading>
            <Text fontSize="sm" color="gray.500">
              AI SaaS Tool Platform
            </Text>
          </Box>

          <Badge colorScheme="green">PRO</Badge>
        </Flex>

        <Divider mb={4} />

        {/* CONTROLS */}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={3} mb={6}>
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
                  <option key={opt}>{opt}</option>
                ))}
              </Select>
            </Box>
          ))}
        </SimpleGrid>

        {/* TOOL UI */}
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
