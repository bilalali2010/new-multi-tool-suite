"use client";

import { useState, useEffect } from "react";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

// ==============================
// 16 TOOLS (FULL NAMES RESTORED)
// ==============================
const tools = {
  blog: {
    title: "📝 AI Blog Generator",
    fields: [{ name: "topic", label: "Topic", type: "text" }],
    basePrompt: "Write a high-quality blog about {{topic}}",
  },
  email: {
    title: "📧 Email Writer",
    fields: [{ name: "purpose", label: "Purpose", type: "text" }],
    basePrompt: "Write a professional email for {{purpose}}",
  },
  rewriter: {
    title: "✍️ Text Rewriter",
    fields: [{ name: "text", label: "Text", type: "textarea" }],
    basePrompt: "Rewrite: {{text}}",
  },
  notes: {
    title: "📚 Notes Summarizer",
    fields: [{ name: "text", label: "Text", type: "textarea" }],
    basePrompt: "Summarize: {{text}}",
  },
  caption: {
    title: "📱 Caption Writer",
    fields: [{ name: "description", label: "Post", type: "text" }],
    basePrompt: "Write viral captions for {{description}}",
  },
  adcopy: {
    title: "📢 Ad Copy Generator",
    fields: [{ name: "product", label: "Product", type: "text" }],
    basePrompt: "Write high-converting ad copy for {{product}}",
  },
  seo: {
    title: "🔍 SEO Keyword Generator",
    fields: [{ name: "topic", label: "Topic", type: "text" }],
    basePrompt: "Generate SEO keywords for {{topic}}",
  },
  logo: {
    title: "🎨 Logo Idea Generator",
    fields: [{ name: "brandName", label: "Brand Name", type: "text" }],
    basePrompt: "Generate modern logo ideas for {{brandName}}",
  },
  chatbot: {
    title: "🤖 AI Chatbot Assistant",
    fields: [{ name: "message", label: "Message", type: "textarea" }],
    basePrompt: "Act as a smart assistant and reply to: {{message}}",
  },
  resume: {
    title: "📄 Resume Builder",
    fields: [{ name: "details", label: "Details", type: "textarea" }],
    basePrompt: "Create ATS-friendly resume from: {{details}}",
  },
  youtube: {
    title: "🎥 YouTube Script Writer",
    fields: [{ name: "idea", label: "Video Idea", type: "text" }],
    basePrompt: "Write viral YouTube script about: {{idea}}",
  },
  code: {
    title: "💻 Code Generator",
    fields: [{ name: "task", label: "Task", type: "textarea" }],
    basePrompt: "Generate clean optimized code for: {{task}}",
  },
  story: {
    title: "📖 Story Generator",
    fields: [{ name: "idea", label: "Story Idea", type: "text" }],
    basePrompt: "Write a creative story about: {{idea}}",
  },
  interview: {
    title: "🧠 Interview Q&A Generator",
    fields: [{ name: "role", label: "Job Role", type: "text" }],
    basePrompt: "Generate interview Q&A for: {{role}}",
  },
  product: {
    title: "🛍️ Product Description Writer",
    fields: [{ name: "product", label: "Product", type: "text" }],
    basePrompt: "Write persuasive product description for: {{product}}",
  },
  social: {
    title: "📊 Social Media Post Generator",
    fields: [{ name: "topic", label: "Topic", type: "text" }],
    basePrompt: "Create engaging social posts about: {{topic}}",
  },
};

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
  // 🚀 OPEN TOOL SELECTOR ON START
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

  return (
    <Flex minH="100vh" bg="gray.50">

      {/* ================= STARTUP TOOL SELECTOR ================= */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select a Tool to Start 🚀</ModalHeader>
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

        <Flex justify="space-between" align="center" mb={4}>
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
