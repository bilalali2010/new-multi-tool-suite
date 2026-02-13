"use client";

import { useState } from "react";
import ToolUI from "./components/ToolUI";
import { Box, VStack, Button, Heading, Text, Flex } from "@chakra-ui/react";

// Tools with custom inputs and prompts
const tools = {
  logo: {
    title: "🎨 Logo Prompt Generator",
    fields: [
      { label: "🏷 Brand Name", name: "brandName", type: "text", placeholder: "Enter brand name" },
      { label: "🎯 Brand Niche", name: "brandNiche", type: "text", placeholder: "Enter brand niche" },
    ],
    promptTemplate: "Create a professional logo prompt for {{brandName}} in the niche of {{brandNiche}}",
  },
  rewriter: {
    title: "✍️ Text Rewriter",
    fields: [
      { label: "📄 Original Text", name: "text", type: "textarea", placeholder: "Enter text to rewrite" },
      { label: "🎨 Rewrite Style", name: "style", type: "select", options: ["Simple", "Professional", "Creative"], default: "Simple" },
    ],
    promptTemplate: "Rewrite the following text in a {{style}} style:\n{{text}}",
  },
  meme: {
    title: "🤣 Meme Idea Generator",
    fields: [
      { label: "🔥 Topic", name: "topic", type: "text", placeholder: "Enter meme topic" },
      { label: "📝 Number of Ideas", name: "count", type: "number", min: 1, max: 10, default: 5 },
    ],
    promptTemplate: "Generate {{count}} meme ideas about {{topic}}",
  },
  blog: {
    title: "📝 AI Blog Generator",
    fields: [
      { label: "🧠 Blog Topic", name: "topic", type: "text", placeholder: "Enter blog topic" },
      { label: "📏 Length", name: "length", type: "select", options: ["Short", "Medium", "Long"], default: "Medium" },
    ],
    promptTemplate: "Write a detailed {{length}} blog with headings about {{topic}}",
  },
  news: {
    title: "📰 News Article Writer",
    fields: [
      { label: "🗞 Headline", name: "headline", type: "text", placeholder: "Enter headline" },
      { label: "📏 Length", name: "length", type: "select", options: ["Short", "Medium", "Long"], default: "Medium" },
    ],
    promptTemplate: "Write a news article ({{length}}) about {{headline}}",
  },
  story: {
    title: "📖 Story Writer",
    fields: [
      { label: "🌱 Story Idea", name: "idea", type: "text", placeholder: "Enter story idea" },
      { label: "Genre", name: "genre", type: "select", options: ["Fantasy", "Sci-Fi", "Drama", "Comedy"], default: "Fantasy" },
      { label: "📏 Length", name: "length", type: "select", options: ["Short", "Medium", "Long"], default: "Medium" },
    ],
    promptTemplate: "Write a {{length}} {{genre}} story based on the idea: {{idea}}",
  },
  caption: {
    title: "📱 Social Media Caption Writer",
    fields: [
      { label: "📸 Post Description", name: "description", type: "text", placeholder: "Enter post description" },
      { label: "Tone", name: "tone", type: "select", options: ["Funny", "Inspirational", "Professional"], default: "Funny" },
      { label: "Number of Captions", name: "count", type: "number", min: 1, max: 5, default: 3 },
    ],
    promptTemplate: "Generate {{count}} social media captions in a {{tone}} tone for: {{description}}",
  },
  seo: {
    title: "🔍 SEO Keyword Generator",
    fields: [
      { label: "🌐 Topic", name: "topic", type: "text", placeholder: "Enter topic" },
      { label: "Number of Keywords", name: "count", type: "number", min: 1, max: 20, default: 10 },
    ],
    promptTemplate: "Generate {{count}} SEO keywords for {{topic}}",
  },
  email: {
    title: "📧 AI Email Writer",
    fields: [
      { label: "📬 Email Purpose", name: "purpose", type: "text", placeholder: "Enter purpose" },
      { label: "Tone", name: "tone", type: "select", options: ["Formal", "Casual", "Persuasive"], default: "Formal" },
    ],
    promptTemplate: "Write a professional email ({{tone}}) about: {{purpose}}",
  },
};

export default function Home() {
  const [selectedTool, setSelectedTool] = useState("logo");

  return (
    <Flex h="100vh" bg="gray.100">
      {/* Sidebar */}
      <VStack
        w="80"
        bg="white"
        p={6}
        spacing={3}
        align="stretch"
        boxShadow="xl"
        overflowY="auto"
      >
        <Heading size="lg" mb={6} bgGradient="linear(to-r, teal.500, green.500)" bgClip="text">
          ✨ AI Multi-Tool Suite
        </Heading>
        <Text fontSize="sm" mb={4}>🧰 Choose a Tool</Text>

        {Object.keys(tools).map((key) => (
          <Button
            key={key}
            onClick={() => setSelectedTool(key)}
            variant={selectedTool === key ? "solid" : "ghost"}
            colorScheme={selectedTool === key ? "teal" : "gray"}
            _hover={{ bg: "teal.200" }}
            justifyContent="flex-start"
          >
            {tools[key].title}
          </Button>
        ))}
      </VStack>

      {/* Main Content */}
      <Box flex="1" p={10} overflowY="auto">
        <ToolUI
          title={tools[selectedTool].title}
          fields={tools[selectedTool].fields}
          promptTemplate={tools[selectedTool].promptTemplate}
        />
      </Box>
    </Flex>
  );
}
