"use client";

import { useState } from "react";
import ToolUI from "./components/ToolUI";
import {
  Box,
  VStack,
  Heading,
  Select,
  Text,
  Divider,
} from "@chakra-ui/react";

// ✅ ALL TOOLS UPDATED + EXPANDED
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

  seo: {
    title: "🔍 SEO Keyword Generator",
    fields: [
      { label: "Topic", name: "topic", type: "text" },
      { label: "Count", name: "count", type: "number", default: 10 },
    ],
    promptTemplate: "Generate {{count}} SEO keywords for {{topic}}",
  },

  caption: {
    title: "📱 Social Media Caption Writer",
    fields: [
      { label: "Post Description", name: "description", type: "text" },
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
      "Generate {{count}} social media captions in {{tone}} tone for: {{description}}",
  },

  adcopy: {
    title: "📢 AI Marketing Ad Copy",
    fields: [
      { label: "Product/Service", name: "product", type: "text" },
      {
        label: "Platform",
        name: "platform",
        type: "select",
        options: ["Facebook", "Instagram", "Google Ads", "TikTok"],
        default: "Facebook",
      },
    ],
    promptTemplate:
      "Write high-converting ad copy for {{product}} for {{platform}}",
  },

  email: {
    title: "📧 AI Email Writer",
    fields: [
      { label: "Purpose", name: "purpose", type: "text" },
      {
        label: "Tone",
        name: "tone",
        type: "select",
        options: ["Formal", "Friendly", "Persuasive"],
        default: "Formal",
      },
    ],
    promptTemplate:
      "Write a {{tone}} email for the purpose: {{purpose}}",
  },

  product: {
    title: "🛍️ Product Description Writer",
    fields: [
      { label: "Product Name", name: "product", type: "text" },
      { label: "Features", name: "features", type: "text" },
    ],
    promptTemplate:
      "Write a compelling product description for {{product}} with features: {{features}}",
  },

  resume: {
    title: "📄 AI Resume Builder",
    fields: [
      { label: "Name", name: "name", type: "text" },
      { label: "Skills", name: "skills", type: "text" },
      { label: "Experience", name: "experience", type: "textarea" },
    ],
    promptTemplate:
      "Create a professional resume for {{name}} with skills {{skills}} and experience {{experience}}",
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

  youtube: {
    title: "🎬 YouTube Video Script Generator",
    fields: [
      { label: "Topic", name: "topic", type: "text" },
      {
        label: "Style",
        name: "style",
        type: "select",
        options: ["Educational", "Entertainment", "Review"],
        default: "Educational",
      },
    ],
    promptTemplate:
      "Write a {{style}} YouTube video script about {{topic}}",
  },

  support: {
    title: "💬 AI Customer Support Response",
    fields: [
      { label: "Customer Issue", name: "issue", type: "textarea" },
      {
        label: "Tone",
        name: "tone",
        type: "select",
        options: ["Polite", "Friendly", "Professional"],
        default: "Professional",
      },
    ],
    promptTemplate:
      "Write a {{tone}} customer support response for: {{issue}}",
  },
};

export default function Home() {
  const [selectedTool, setSelectedTool] = useState("blog");

  const currentTool = tools[selectedTool];

  return (
    <Box p={6} maxW="5xl" mx="auto">

      {/* HEADER */}
      <VStack spacing={2} mb={6} textAlign="center">

        <Heading size="lg" color="teal.500">
          ✨ AI Multi-Tool Suite
        </Heading>

        <Text fontSize="md" color="gray.500">
          Build, Write, Market & Automate Everything with AI 🚀
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
