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
  SimpleGrid,
  Button,
  Badge,
  IconButton,
} from "@chakra-ui/react";
import { Search } from "lucide-react";

// ============================
// 🚀 TOOLS (UNCHANGED LOGIC)
// ============================
const tools = {
  blog: {
    title: "📝 AI Blog Generator",
    category: "Writing",
    promptTemplate: "Write a blog about {{topic}}",
    fields: [{ label: "Topic", name: "topic", type: "text" }],
  },

  seo: {
    title: "🔍 SEO Keyword Generator",
    category: "Marketing",
    promptTemplate: "Generate SEO keywords for {{topic}}",
    fields: [{ label: "Topic", name: "topic", type: "text" }],
  },

  caption: {
    title: "📱 Caption Writer",
    category: "Marketing",
    promptTemplate: "Write captions for {{description}}",
    fields: [{ label: "Post", name: "description", type: "text" }],
  },

  adcopy: {
    title: "📢 Ad Copy Generator",
    category: "Marketing",
    promptTemplate: "Write ad copy for {{product}}",
    fields: [{ label: "Product", name: "product", type: "text" }],
  },

  email: {
    title: "📧 Email Writer",
    category: "Writing",
    promptTemplate: "Write email for {{purpose}}",
    fields: [{ label: "Purpose", name: "purpose", type: "text" }],
  },

  product: {
    title: "🛍️ Product Description",
    category: "Business",
    promptTemplate: "Describe {{product}}",
    fields: [{ label: "Product", name: "product", type: "text" }],
  },

  resume: {
    title: "📄 Resume Builder",
    category: "Business",
    promptTemplate: "Build resume for {{name}}",
    fields: [{ label: "Name", name: "name", type: "text" }],
  },

  rewriter: {
    title: "✍️ Text Rewriter",
    category: "Writing",
    promptTemplate: "Rewrite: {{text}}",
    fields: [{ label: "Text", name: "text", type: "textarea" }],
  },

  youtube: {
    title: "🎬 YouTube Script",
    category: "Content",
    promptTemplate: "Write YouTube script about {{topic}}",
    fields: [{ label: "Topic", name: "topic", type: "text" }],
  },

  support: {
    title: "💬 Support AI",
    category: "Business",
    promptTemplate: "Reply to: {{issue}}",
    fields: [{ label: "Issue", name: "issue", type: "textarea" }],
  },

  logo: {
    title: "🎨 Logo Generator",
    category: "Design",
    promptTemplate: "Create logo for {{brandName}}",
    fields: [{ label: "Brand", name: "brandName", type: "text" }],
  },
};

export default function Home() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [search, setSearch] = useState("");

  const filteredTools = Object.entries(tools).filter(([key, tool]) =>
    tool.title.toLowerCase().includes(search.toLowerCase())
  );

  const currentTool = selectedTool ? tools[selectedTool] : null;

  return (
    <Flex h="100vh" bg="gray.50">

      {/* ================= SIDEBAR ================= */}
      <Box w="260px" bg="white" borderRight="1px solid #eee" p={4}>
        <Heading size="md" color="teal.500" mb={6}>
          ⚡ AI Studio
        </Heading>

        <Input
          placeholder="Search tools..."
          mb={4}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <VStack align="stretch" spacing={1}>
          {Object.entries(tools).map(([key, tool]) => (
            <Button
              key={key}
              size="sm"
              justifyContent="flex-start"
              variant={selectedTool === key ? "solid" : "ghost"}
              colorScheme="teal"
              onClick={() => setSelectedTool(key)}
            >
              {tool.title}
            </Button>
          ))}
        </VStack>
      </Box>

      {/* ================= MAIN AREA ================= */}
      <Box flex="1" p={6} overflowY="auto">

        {/* HEADER */}
        <Flex justify="space-between" align="center" mb={6}>
          <Box>
            <Heading size="lg">
              {selectedTool ? currentTool.title : "🚀 AI Dashboard"}
            </Heading>
            <Text color="gray.500">
              Build content, marketing & automation tools
            </Text>
          </Box>

          <Badge colorScheme="green" p={2}>
            SaaS v3
          </Badge>
        </Flex>

        <Divider mb={6} />

        {/* ================= DASHBOARD VIEW ================= */}
        {!selectedTool ? (
          <>
            <SimpleGrid columns={[1, 2, 3]} spacing={4}>
              {filteredTools.map(([key, tool]) => (
                <Box
                  key={key}
                  bg="white"
                  p={5}
                  borderRadius="xl"
                  boxShadow="sm"
                  cursor="pointer"
                  transition="0.2s"
                  _hover={{
                    transform: "scale(1.03)",
                    boxShadow: "lg",
                  }}
                  onClick={() => setSelectedTool(key)}
                >
                  <Text fontSize="lg" fontWeight="bold">
                    {tool.title}
                  </Text>

                  <Badge mt={2} colorScheme="purple">
                    {tool.category}
                  </Badge>

                  <Text fontSize="sm" mt={2} color="gray.500">
                    Click to open tool →
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </>
        ) : (
          <>
            {/* TOOL VIEW */}
            <Box
              bg="white"
              p={6}
              borderRadius="xl"
              boxShadow="sm"
            >
              <Button
                size="sm"
                mb={4}
                onClick={() => setSelectedTool(null)}
              >
                ← Back to Dashboard
              </Button>

              <ToolUI
                title={currentTool.title}
                fields={currentTool.fields}
                promptTemplate={currentTool.promptTemplate}
              />
            </Box>
          </>
        )}
      </Box>
    </Flex>
  );
}
