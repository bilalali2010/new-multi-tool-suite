"use client";

import { useState } from "react";
import ToolUI from "./components/ToolUI";
import {
  Box,
  VStack,
  Select,
  Heading,
} from "@chakra-ui/react";

import { Typewriter } from "react-simple-typewriter";

/* =========================
   TOOLS (ALL RESTORED + FIXED)
========================= */

const tools = {
  logo: {
    title: "🎨 Logo Prompt Generator",
    fields: [
      { label: "🏷 Brand Name", name: "brandName", type: "text" },
      { label: "🎯 Brand Niche", name: "brandNiche", type: "text" },
    ],
    promptTemplate:
      "Generate ONLY a single AI logo prompt for brand '{{brandName}}' in '{{brandNiche}}' niche. No explanation. Only final prompt.",
  },

  rewriter: {
    title: "✍️ Text Rewriter",
    fields: [
      { label: "📄 Original Text", name: "text", type: "textarea" },
      {
        label: "🎨 Rewrite Style",
        name: "style",
        type: "select",
        options: ["Simple", "Professional", "Creative"],
        default: "Simple",
      },
    ],
    promptTemplate:
      "Rewrite in {{style}} style. ONLY final rewritten text:\n{{text}}",
  },

  meme: {
    title: "🤣 Meme Idea Generator",
    fields: [
      { label: "🔥 Topic", name: "topic", type: "text" },
      { label: "📝 Count", name: "count", type: "number", default: 5 },
    ],
    promptTemplate:
      "Generate {{count}} meme ideas about {{topic}}. Only list ideas.",
  },

  blog: {
    title: "📝 AI Blog Generator",
    fields: [
      { label: "🧠 Topic", name: "topic", type: "text" },
      {
        label: "📏 Length",
        name: "length",
        type: "select",
        options: ["Short", "Medium", "Long"],
        default: "Medium",
      },
    ],
    promptTemplate:
      "Write a {{length}} blog about {{topic}}. ONLY final blog with headings. No reasoning.",
  },

  news: {
    title: "📰 News Article Writer",
    fields: [
      { label: "🗞 Headline", name: "headline", type: "text" },
      {
        label: "📏 Length",
        name: "length",
        type: "select",
        options: ["Short", "Medium", "Long"],
        default: "Medium",
      },
    ],
    promptTemplate:
      "Write a {{length}} news article about {{headline}}. Only final article.",
  },

  story: {
    title: "📖 Story Writer",
    fields: [
      { label: "🌱 Idea", name: "idea", type: "text" },
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
    promptTemplate:
      "Write a {{length}} {{genre}} story about {{idea}}. Only final story.",
  },

  caption: {
    title: "📱 Social Caption Writer",
    fields: [
      { label: "📸 Description", name: "description", type: "text" },
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
    title: "🔍 SEO Keyword Generator",
    fields: [
      { label: "🌐 Topic", name: "topic", type: "text" },
      { label: "Count", name: "count", type: "number", default: 10 },
    ],
    promptTemplate:
      "Generate {{count}} SEO keywords for {{topic}}. Only keywords list.",
  },

  email: {
    title: "📧 Email Writer",
    fields: [
      { label: "Purpose", name: "purpose", type: "text" },
      {
        label: "Tone",
        name: "tone",
        type: "select",
        options: ["Formal", "Casual", "Persuasive"],
        default: "Formal",
      },
    ],
    promptTemplate:
      "Write a {{tone}} email about {{purpose}}. Only final email.",
  },

  resume: {
    title: "🧩 Resume Builder",
    fields: [
      { label: "Name", name: "fullName", type: "text" },
      { label: "Job", name: "jobTitle", type: "text" },
      { label: "Skills", name: "skills", type: "text" },
      { label: "Experience", name: "experience", type: "textarea" },
    ],
    promptTemplate:
      "Create resume for {{fullName}}, job {{jobTitle}}, skills {{skills}}, experience {{experience}}.",
  },

  adcopy: {
    title: "🎯 Ad Copy Generator",
    fields: [
      { label: "Product", name: "productName", type: "text" },
      { label: "Audience", name: "audience", type: "text" },
      {
        label: "Tone",
        name: "tone",
        type: "select",
        options: ["Friendly", "Persuasive", "Formal"],
        default: "Friendly",
      },
    ],
    promptTemplate:
      "Write ad copy for {{productName}} targeting {{audience}} in {{tone}} tone.",
  },

  linkedin: {
    title: "📚 LinkedIn Post",
    fields: [
      { label: "Topic", name: "topic", type: "text" },
      {
        label: "Tone",
        name: "tone",
        type: "select",
        options: ["Professional", "Inspiring", "Humorous"],
        default: "Professional",
      },
    ],
    promptTemplate:
      "Write LinkedIn post about {{topic}} in {{tone}} tone.",
  },

  socialCaption: {
    title: "🖼 Image Caption",
    fields: [
      { label: "Image", name: "imageDescription", type: "text" },
      {
        label: "Tone",
        name: "tone",
        type: "select",
        options: ["Funny", "Inspiring", "Professional"],
        default: "Funny",
      },
    ],
    promptTemplate:
      "Generate captions for image: {{imageDescription}} in {{tone}} tone.",
  },

  productDescription: {
    title: "📜 Product Description",
    fields: [
      { label: "Product", name: "productName", type: "text" },
      { label: "Category", name: "category", type: "text" },
      { label: "Features", name: "features", type: "text" },
    ],
    promptTemplate:
      "Write product description for {{productName}} in {{category}} with features {{features}}.",
  },

  youtubeScript: {
    title: "🎥 YouTube Script",
    fields: [
      { label: "Topic", name: "topic", type: "text" },
      {
        label: "Tone",
        name: "tone",
        type: "select",
        options: ["Funny", "Informative", "Engaging"],
        default: "Informative",
      },
    ],
    promptTemplate:
      "Write YouTube script about {{topic}} in {{tone}} tone.",
  },

  quiz: {
    title: "🧠 Quiz Generator",
    fields: [
      { label: "Topic", name: "topic", type: "text" },
      { label: "Count", name: "count", type: "number", default: 5 },
      {
        label: "Difficulty",
        name: "difficulty",
        type: "select",
        options: ["Easy", "Medium", "Hard"],
        default: "Medium",
      },
    ],
    promptTemplate:
      "Generate {{count}} {{difficulty}} questions about {{topic}}.",
  },

  summary: {
    title: "📝 Summary Tool",
    fields: [
      { label: "Text", name: "text", type: "textarea" },
      {
        label: "Length",
        name: "length",
        type: "select",
        options: ["Short", "Medium", "Long"],
        default: "Medium",
      },
    ],
    promptTemplate:
      "Summarize in {{length}}: {{text}}",
  },

  customerSupport: {
    title: "💬 Support Reply",
    fields: [
      { label: "Query", name: "query", type: "textarea" },
      {
        label: "Tone",
        name: "tone",
        type: "select",
        options: ["Polite", "Professional", "Friendly"],
        default: "Polite",
      },
    ],
    promptTemplate:
      "Write {{tone}} support reply: {{query}}",
  },
};

/* =========================
   MAIN UI
========================= */

export default function Home() {
  const [selectedTool, setSelectedTool] = useState("logo");

  return (
    <Box p={4} maxW="5xl" mx="auto">

      <VStack spacing={4} mb={6} align="stretch">
        <Heading size="lg" bgGradient="linear(to-r, teal.500, green.500)" bgClip="text">
          <Typewriter
            words={["✨ AI Multi-Tool Suite", "⚡ Smart AI Tools", "🚀 Creator Studio"]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={40}
            delaySpeed={1500}
          />
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

      <ToolUI
        title={tools[selectedTool].title}
        fields={tools[selectedTool].fields}
        promptTemplate={tools[selectedTool].promptTemplate}
      />
    </Box>
  );
}
