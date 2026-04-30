"use client";

import { useState } from "react";
import ToolUI from "./components/ToolUI";
import { Typewriter } from "react-simple-typewriter";
import {
  Box,
  VStack,
  Heading,
  Select,
  Text,
  Divider,
} from "@chakra-ui/react";

// ✅ ALL TOOLS (SAFE - NOTHING REMOVED)
const tools = {
  logo: {
    title: "🎨 Logo Prompt Generator",
    fields: [
      { label: "Brand Name", name: "brandName", type: "text" },
      { label: "Brand Niche", name: "brandNiche", type: "text" },
    ],
    promptTemplate:
      "Create a professional logo prompt for {{brandName}} in the niche of {{brandNiche}}",
  },

  rewriter: {
    title: "✍️ Text Rewriter",
    fields: [
      { label: "Text", name: "text", type: "textarea" },
      {
        label: "Style",
        name: "style",
        type: "select",
        options: ["Simple", "Professional", "Creative"],
        default: "Simple",
      },
    ],
    promptTemplate: "Rewrite in {{style}} style:\n{{text}}",
  },

  meme: {
    title: "🤣 Meme Idea Generator",
    fields: [
      { label: "Topic", name: "topic", type: "text" },
      { label: "Count", name: "count", type: "number", default: 5 },
    ],
    promptTemplate: "Generate {{count}} meme ideas about {{topic}}",
  },

  blog: {
    title: "📝 AI Blog Generator",
    fields: [
      { label: "Topic", name: "topic", type: "text" },
      {
        label: "Length",
        name: "length",
        type: "select",
        options: ["Short", "Medium", "Long"],
        default: "Medium",
      },
    ],
    promptTemplate: "Write a {{length}} blog about {{topic}}",
  },

  news: {
    title: "📰 News Writer",
    fields: [
      { label: "Headline", name: "headline", type: "text" },
      {
        label: "Length",
        name: "length",
        type: "select",
        options: ["Short", "Medium", "Long"],
        default: "Medium",
      },
    ],
    promptTemplate: "Write news article about {{headline}}",
  },

  story: {
    title: "📖 Story Writer",
    fields: [
      { label: "Idea", name: "idea", type: "text" },
      {
        label: "Genre",
        name: "genre",
        type: "select",
        options: ["Fantasy", "Sci-Fi", "Drama", "Comedy"],
        default: "Fantasy",
      },
      {
        label: "Length",
        name: "length",
        type: "select",
        options: ["Short", "Medium", "Long"],
        default: "Medium",
      },
    ],
    promptTemplate: "Write a {{length}} {{genre}} story: {{idea}}",
  },

  caption: {
    title: "📱 Caption Generator",
    fields: [
      { label: "Post", name: "description", type: "text" },
      {
        label: "Tone",
        name: "tone",
        type: "select",
        options: ["Funny", "Inspirational", "Professional"],
        default: "Funny",
      },
      { label: "Count", name: "count", type: "number", default: 3 },
    ],
    promptTemplate:
      "Generate {{count}} captions in {{tone}} tone for: {{description}}",
  },

  seo: {
    title: "🔍 SEO Keywords",
    fields: [
      { label: "Topic", name: "topic", type: "text" },
      { label: "Count", name: "count", type: "number", default: 10 },
    ],
    promptTemplate: "Generate {{count}} SEO keywords for {{topic}}",
  },
};

export default function Home() {
  const [selectedTool, setSelectedTool] = useState("logo");

  const currentTool = tools[selectedTool];

  return (
    <Box p={6} maxW="5xl" mx="auto">

      {/* HEADER */}
      <VStack spacing={2} mb={6} textAlign="center">

        <Heading size="lg" color="teal.500">
          ✨ AI Multi-Tool Suite
        </Heading>

        {/* TYPEWRITER */}
        <Text fontSize="md" color="gray.500">
          <Typewriter
            words={[
              "Build Logos ⚡",
              "Write Blogs 📝",
              "Generate Ads 🎯",
              "AI Tools Made Easy 🚀",
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={40}
            delaySpeed={1200}
          />
        </Text>
      </VStack>

      <Divider mb={6} />

      {/* TOOL SELECT */}
      <Select
        value={selectedTool}
        onChange={(e) => setSelectedTool(e.target.value)}
        mb={6}
        size="md"
      >
        {Object.keys(tools).map((key) => (
          <option key={key} value={key}>
            {tools[key].title}
          </option>
        ))}
      </Select>

      {/* TOOL UI */}
      <ToolUI
        title={currentTool.title}
        fields={currentTool.fields}
        promptTemplate={currentTool.promptTemplate}
      />
    </Box>
  );
}
