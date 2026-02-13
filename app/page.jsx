"use client";

import { useState } from "react";
import ToolUI from "./components/ToolUI";
import { Box, VStack, Button, Heading } from "@chakra-ui/react";

// All tools with dynamic options and placeholders
const tools = {
  chatbot: {
    title: "🤖 AI Chatbot",
    prompt: "{{input}}",
    options: [
      { type: "select", name: "length", options: ["Short", "Medium", "Long"], default: "Medium" },
    ],
  },
  logo: {
    title: "🎨 Logo Prompt Generator",
    prompt: "Create a professional logo prompt for {{input}}",
    options: [
      { type: "select", name: "style", options: ["Minimal", "Modern", "Vintage"], default: "Minimal" },
    ],
  },
  rewriter: {
    title: "✍️ Text Rewriter",
    prompt: "Rewrite professionally:\n{{input}}",
    options: [
      { type: "select", name: "tone", options: ["Formal", "Casual", "Persuasive"], default: "Formal" },
    ],
  },
  meme: {
    title: "🤣 Meme Idea Generator",
    prompt: "Give {{count}} meme ideas about {{input}}",
    options: [
      { type: "number", name: "count", min: 1, max: 10, default: 5 },
    ],
  },
  blog: {
    title: "📝 Blog Generator",
    prompt: "Write a detailed blog ({{length}}) with headings about {{input}}",
    options: [
      { type: "select", name: "length", options: ["Short", "Medium", "Long"], default: "Medium" },
    ],
  },
  news: {
    title: "📰 News Article Writer",
    prompt: "Write a news article ({{length}}) about {{input}}",
    options: [
      { type: "select", name: "length", options: ["Short", "Medium", "Long"], default: "Medium" },
    ],
  },
  story: {
    title: "📖 Story Writer",
    prompt: "Write a creative story ({{length}}) based on {{input}}",
    options: [
      { type: "select", name: "length", options: ["Short", "Medium", "Long"], default: "Medium" },
      { type: "select", name: "genre", options: ["Fantasy", "Sci-Fi", "Drama", "Comedy"], default: "Fantasy" },
    ],
  },
  caption: {
    title: "📱 Caption Writer",
    prompt: "Generate social media captions ({{tone}}) for {{input}}",
    options: [
      { type: "select", name: "tone", options: ["Funny", "Inspirational", "Professional"], default: "Funny" },
      { type: "number", name: "count", min: 1, max: 5, default: 3 },
    ],
  },
  seo: {
    title: "🔍 SEO Keyword Generator",
    prompt: "Generate SEO keywords for {{input}}",
    options: [
      { type: "number", name: "count", min: 1, max: 20, default: 10 },
    ],
  },
  email: {
    title: "📧 Email Writer",
    prompt: "Write a professional email ({{tone}}) about {{input}}",
    options: [
      { type: "select", name: "tone", options: ["Formal", "Casual", "Persuasive"], default: "Formal" },
    ],
  },
};

export default function Home() {
  const [selectedTool, setSelectedTool] = useState("chatbot");

  return (
    <Box display="flex" h="100vh" bg="gray.100">
      {/* Sidebar */}
      <VStack w="72" bg="white" p={6} spacing={2} align="stretch" boxShadow="lg">
        <Heading size="md" mb={8} bgGradient="linear(to-r, teal.500, green.500)" bgClip="text">
          AI Multi-Tool
        </Heading>

        {Object.keys(tools).map((key) => (
          <Button
            key={key}
            onClick={() => setSelectedTool(key)}
            variant={selectedTool === key ? "solid" : "ghost"}
            colorScheme={selectedTool === key ? "teal" : "gray"}
          >
            {tools[key].title}
          </Button>
        ))}
      </VStack>

      {/* Main */}
      <Box flex="1" p={10} overflowY="auto">
        <ToolUI
          title={tools[selectedTool].title}
          promptTemplate={tools[selectedTool].prompt}
          options={tools[selectedTool].options}
        />
      </Box>
    </Box>
  );
}
