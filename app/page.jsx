"use client";

import { useState } from "react";
import ToolUI from "./components/ToolUI";
import { Box, VStack, Button, Heading } from "@chakra-ui/react";

const tools = {
  chatbot: { title: "🤖 AI Chatbot", prompt: "{{input}}" },
  logo: { title: "🎨 Logo Prompt Generator", prompt: "Create a professional logo prompt for {{input}}." },
  rewriter: { title: "✍️ Text Rewriter", prompt: "Rewrite professionally:\n{{input}}" },
  meme: { title: "🤣 Meme Idea Generator", prompt: "Give 5 meme ideas about {{input}}" },
  blog: { title: "📝 Blog Generator", prompt: "Write a detailed blog with headings about {{input}}" },
  news: { title: "📰 News Article Writer", prompt: "Write a news article about {{input}}" },
  story: { title: "📖 Story Writer", prompt: "Write a creative story based on {{input}}" },
  caption: { title: "📱 Caption Writer", prompt: "Generate social media captions for {{input}}" },
  seo: { title: "🔍 SEO Keyword Generator", prompt: "Generate SEO keywords for {{input}}" },
  email: { title: "📧 Email Writer", prompt: "Write a professional email about {{input}}" },
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
        />
      </Box>
    </Box>
  );
}
