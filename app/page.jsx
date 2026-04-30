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
  HStack,
  Divider,
  Button,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react";

// ==========================
// 🚀 PRO TOOLS (same system)
// ==========================
const tools = {
  blog: {
    title: "📝 AI Blog Generator",
    category: "Writing",
    promptTemplate: "Write a {{length}} blog about {{topic}}",
    fields: [
      { label: "Topic", name: "topic", type: "text" },
    ],
  },

  seo: {
    title: "🔍 SEO Keyword Generator",
    category: "Marketing",
    promptTemplate: "Generate {{count}} SEO keywords for {{topic}}",
    fields: [
      { label: "Topic", name: "topic", type: "text" },
    ],
  },

  caption: {
    title: "📱 Social Caption Writer",
    category: "Marketing",
    promptTemplate: "Generate captions for {{description}}",
    fields: [
      { label: "Post", name: "description", type: "text" },
    ],
  },

  adcopy: {
    title: "📢 Ad Copy Generator",
    category: "Marketing",
    promptTemplate: "Write ad copy for {{product}}",
    fields: [
      { label: "Product", name: "product", type: "text" },
    ],
  },

  email: {
    title: "📧 Email Writer",
    category: "Writing",
    promptTemplate: "Write email for {{purpose}}",
    fields: [
      { label: "Purpose", name: "purpose", type: "text" },
    ],
  },

  product: {
    title: "🛍️ Product Description",
    category: "Business",
    promptTemplate: "Write product description for {{product}}",
    fields: [
      { label: "Product", name: "product", type: "text" },
    ],
  },

  resume: {
    title: "📄 Resume Builder",
    category: "Business",
    promptTemplate: "Create resume for {{name}}",
    fields: [
      { label: "Name", name: "name", type: "text" },
    ],
  },

  rewriter: {
    title: "✍️ Text Rewriter",
    category: "Writing",
    promptTemplate: "Rewrite: {{text}}",
    fields: [
      { label: "Text", name: "text", type: "textarea" },
    ],
  },

  youtube: {
    title: "🎬 YouTube Script",
    category: "Content",
    promptTemplate: "Write YouTube script about {{topic}}",
    fields: [
      { label: "Topic", name: "topic", type: "text" },
    ],
  },

  support: {
    title: "💬 Support Reply AI",
    category: "Business",
    promptTemplate: "Reply to customer: {{issue}}",
    fields: [
      { label: "Issue", name: "issue", type: "textarea" },
    ],
  },

  logo: {
    title: "🎨 Logo Generator",
    category: "Design",
    promptTemplate: "Create logo idea for {{brandName}}",
    fields: [
      { label: "Brand", name: "brandName", type: "text" },
    ],
  },
};

export default function Home() {
  const [selectedTool, setSelectedTool] = useState("blog");
  const [search, setSearch] = useState("");

  const currentTool = tools[selectedTool];

  // filter tools
  const filteredTools = Object.keys(tools).filter((key) =>
    tools[key].title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Flex minH="100vh" bg="gray.50">

      {/* ================= LEFT SIDEBAR ================= */}
      <Box
        w="280px"
        bg="white"
        borderRight="1px solid #eee"
        p={5}
      >
        <Heading size="md" mb={6} color="teal.500">
          ⚡ AI Studio
        </Heading>

        <Input
          placeholder="Search tools..."
          mb={4}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <VStack align="stretch" spacing={2}>
          {filteredTools.map((key) => (
            <Button
              key={key}
              justifyContent="flex-start"
              variant={selectedTool === key ? "solid" : "ghost"}
              colorScheme="teal"
              onClick={() => setSelectedTool(key)}
              size="sm"
            >
              {tools[key].title}
            </Button>
          ))}
        </VStack>
      </Box>

      {/* ================= MAIN AREA ================= */}
      <Box flex="1" p={8}>

        {/* HEADER */}
        <Flex justify="space-between" align="center" mb={6}>
          <Box>
            <Heading size="lg" color="gray.700">
              {currentTool.title}
            </Heading>
            <Text color="gray.500">
              AI-powered professional tool
            </Text>
          </Box>

          <Badge colorScheme="green" p={2}>
            PRO MODE
          </Badge>
        </Flex>

        <Divider mb={6} />

        {/* TOOL UI */}
        <Box
          bg="white"
          p={6}
          borderRadius="xl"
          boxShadow="sm"
        >
          <ToolUI
            title={currentTool.title}
            fields={currentTool.fields}
            promptTemplate={currentTool.promptTemplate}
          />
        </Box>

      </Box>
    </Flex>
  );
}
