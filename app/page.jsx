"use client";

import { useState, useEffect } from "react";
import ToolUI from "./components/ToolUI";
import {
  Box,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Button,
  Badge,
  Select,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

// ==============================
// 16 AI TOOLS
// ==============================
const tools = {
  blog: { title: "📝 AI Blog Generator", fields: [{ name: "topic", label: "Topic", type: "text" }], basePrompt: "Write a blog about {{topic}}" },
  email: { title: "📧 Email Writer", fields: [{ name: "purpose", label: "Purpose", type: "text" }], basePrompt: "Write an email for {{purpose}}" },
  rewriter: { title: "✍️ Text Rewriter", fields: [{ name: "text", label: "Text", type: "textarea" }], basePrompt: "Rewrite: {{text}}" },
  notes: { title: "📚 Notes Summarizer", fields: [{ name: "text", label: "Text", type: "textarea" }], basePrompt: "Summarize: {{text}}" },
  caption: { title: "📱 Caption Writer", fields: [{ name: "description", label: "Post", type: "text" }], basePrompt: "Write captions for {{description}}" },
  adcopy: { title: "📢 Ad Copy Generator", fields: [{ name: "product", label: "Product", type: "text" }], basePrompt: "Write ad copy for {{product}}" },
  seo: { title: "🔍 SEO Generator", fields: [{ name: "topic", label: "Topic", type: "text" }], basePrompt: "Generate SEO keywords for {{topic}}" },
  logo: { title: "🎨 Logo Generator", fields: [{ name: "brandName", label: "Brand Name", type: "text" }], basePrompt: "Generate logo ideas for {{brandName}}" },
  chatbot: { title: "🤖 AI Chatbot", fields: [{ name: "message", label: "Message", type: "textarea" }], basePrompt: "Reply to: {{message}}" },
  resume: { title: "📄 Resume Builder", fields: [{ name: "details", label: "Details", type: "textarea" }], basePrompt: "Build resume from {{details}}" },
  youtube: { title: "🎥 YouTube Script", fields: [{ name: "idea", label: "Idea", type: "text" }], basePrompt: "Write script about {{idea}}" },
  code: { title: "💻 Code Generator", fields: [{ name: "task", label: "Task", type: "textarea" }], basePrompt: "Generate code for {{task}}" },
  story: { title: "📖 Story Generator", fields: [{ name: "idea", label: "Idea", type: "text" }], basePrompt: "Write story about {{idea}}" },
  interview: { title: "🧠 Interview Q&A", fields: [{ name: "role", label: "Role", type: "text" }], basePrompt: "Interview Q&A for {{role}}" },
  product: { title: "🛍️ Product Description", fields: [{ name: "product", label: "Product", type: "text" }], basePrompt: "Describe {{product}}" },
  social: { title: "📊 Social Media Posts", fields: [{ name: "topic", label: "Topic", type: "text" }], basePrompt: "Create posts about {{topic}}" },
};

// ==============================
// CONTROLS
// ==============================
const controlOptions = {
  type: ["Informative", "Creative", "Persuasive", "Professional"],
  tone: ["Friendly", "Formal", "Funny", "Sales"],
  length: ["Short", "Medium", "Long"],
  style: ["Simple", "Advanced", "Viral"],
};

export default function Home() {
  const [selectedTool, setSelectedTool] = useState("blog");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [controls, setControls] = useState({
    type: "Informative",
    tone: "Professional",
    length: "Medium",
    style: "Simple",
  });

  // ==============================
  // OPEN TOOL SELECTOR ON START
  // ==============================
  useEffect(() => {
    onOpen();
  }, []);

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
  // 🔄 CHANGE TOOL BUTTON FUNCTION
  // ==============================
  const openToolSelector = () => {
    onOpen();
  };

  return (
    <Flex minH="100vh" bg="gray.50">

      {/* ================= STARTUP TOOL SELECTOR ================= */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select a Tool 🚀</ModalHeader>
          <ModalBody pb={6}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
              {Object.keys(tools).map((key) => (
                <Button
                  key={key}
                  size="sm"
                  colorScheme="teal"
                  onClick={() => {
                    setSelectedTool(key);
                    onClose();
                  }}
                >
                  {tools[key].title}
                </Button>
              ))}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* ================= MAIN ================= */}
      <Box flex="1" p={{ base: 3, md: 6 }} maxW="1100px" mx="auto" w="100%">

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

          <Flex gap={2} align="center">
            {/* 🔄 CHANGE TOOL BUTTON */}
            <Button
              size="sm"
              variant="outline"
              colorScheme="teal"
              onClick={openToolSelector}
            >
              🔄 Change Tool
            </Button>

            <Badge colorScheme="green">PRO</Badge>
          </Flex>
        </Flex>

        <Divider mb={4} />

        {/* CONTROLS */}
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

        {/* TOOL UI */}
        <Box bg="white" p={{ base: 3, md: 6 }} borderRadius="xl" boxShadow="sm">
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
