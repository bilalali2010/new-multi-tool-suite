"use client";

import { useState } from "react";
import ToolUI from "./components/ToolUI";
import {
  Box,
  VStack,
  HStack,
  Button,
  Heading,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";

// All 18 tools
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
  resume: {
    title: "🧩 AI Resume Builder",
    fields: [
      { label: "Full Name", name: "fullName", type: "text" },
      { label: "Job Title", name: "jobTitle", type: "text" },
      { label: "Skills", name: "skills", type: "text", placeholder: "Comma separated" },
      { label: "Experience Summary", name: "experience", type: "textarea", placeholder: "Enter your experience" },
    ],
    promptTemplate: "Create a professional resume for {{fullName}}, applying for {{jobTitle}} with skills {{skills}} and experience: {{experience}}",
  },
  adcopy: {
    title: "🎯 AI Marketing Ad Copy",
    fields: [
      { label: "Product/Service Name", name: "productName", type: "text" },
      { label: "Target Audience", name: "audience", type: "text" },
      { label: "Tone", name: "tone", type: "select", options: ["Friendly", "Persuasive", "Formal"], default: "Friendly" },
    ],
    promptTemplate: "Write a compelling ad copy for {{productName}} targeting {{audience}} in a {{tone}} tone",
  },
  linkedin: {
    title: "📚 LinkedIn Post Generator",
    fields: [
      { label: "Topic", name: "topic", type: "text" },
      { label: "Tone", name: "tone", type: "select", options: ["Professional", "Inspiring", "Humorous"], default: "Professional" },
      { label: "Length", name: "length", type: "select", options: ["Short", "Medium", "Long"], default: "Medium" },
    ],
    promptTemplate: "Write a {{length}} LinkedIn post about {{topic}} in a {{tone}} tone",
  },
  socialCaption: {
    title: "🖼 Social Media Image Caption",
    fields: [
      { label: "Image Description", name: "imageDescription", type: "text" },
      { label: "Tone", name: "tone", type: "select", options: ["Funny", "Inspiring", "Professional"], default: "Funny" },
    ],
    promptTemplate: "Generate 5 captions in a {{tone}} tone for the social media image: {{imageDescription}}",
  },
  productDescription: {
    title: "📜 Product Description Writer",
    fields: [
      { label: "Product Name", name: "productName", type: "text" },
      { label: "Category", name: "category", type: "text" },
      { label: "Features", name: "features", type: "text", placeholder: "Comma separated" },
    ],
    promptTemplate: "Write a detailed product description for {{productName}} in the category {{category}}, highlighting features: {{features}}",
  },
  youtubeScript: {
    title: "🎥 YouTube Video Script Generator",
    fields: [
      { label: "Video Topic", name: "topic", type: "text" },
      { label: "Tone", name: "tone", type: "select", options: ["Funny", "Informative", "Engaging"], default: "Informative" },
      { label: "Length", name: "length", type: "select", options: ["Short", "Medium", "Long"], default: "Medium" },
    ],
    promptTemplate: "Write a {{length}} YouTube video script about {{topic}} in a {{tone}} tone",
  },
  quiz: {
    title: "🧠 AI Quiz / Trivia Generator",
    fields: [
      { label: "Topic", name: "topic", type: "text" },
      { label: "Number of Questions", name: "count", type: "number", min: 1, max: 20, default: 5 },
      { label: "Difficulty", name: "difficulty", type: "select", options: ["Easy", "Medium", "Hard"], default: "Medium" },
    ],
    promptTemplate: "Generate {{count}} trivia questions on {{topic}} with {{difficulty}} difficulty",
  },
  summary: {
    title: "📝 Summary Generator",
    fields: [
      { label: "Text / Article", name: "text", type: "textarea", placeholder: "Paste your text here" },
      { label: "Summary Length", name: "length", type: "select", options: ["Short", "Medium", "Long"], default: "Medium" },
    ],
    promptTemplate: "Summarize the following text in a {{length}} summary:\n{{text}}",
  },
  customerSupport: {
    title: "💬 AI Customer Support Response",
    fields: [
      { label: "Customer Query", name: "query", type: "textarea", placeholder: "Enter customer query" },
      { label: "Tone", name: "tone", type: "select", options: ["Polite", "Professional", "Friendly"], default: "Polite" },
    ],
    promptTemplate: "Write a {{tone}} customer support response to the following query: {{query}}",
  },
};

export default function Home() {
  const [selectedTool, setSelectedTool] = useState("logo");

  return (
    <Box p={4} maxW="5xl" mx="auto">
      {/* Tool Selector */}
      <VStack spacing={4} mb={6} align="stretch">
        <Heading size="lg" bgGradient="linear(to-r, teal.500, green.500)" bgClip="text">
          ✨ AI Multi-Tool Suite
        </Heading>
        <Select
          value={selectedTool}
          onChange={(e) => setSelectedTool(e.target.value)}
        >
          {Object.keys(tools).map((key) => (
            <option key={key} value={key}>
              {tools[key].title}
            </option>
          ))}
        </Select>
      </VStack>

      {/* Tool UI */}
      <ToolUI
        title={tools[selectedTool].title}
        fields={tools[selectedTool].fields}
        promptTemplate={tools[selectedTool].promptTemplate}
      />
    </Box>
  );
}
