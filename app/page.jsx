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

// ================================
// 🚀 PRO AI TOOL SYSTEM (UPGRADED)
// ================================
const tools = {
  logo: {
    title: "🎨 Logo Prompt Generator",
    fields: [
      { label: "Brand Name", name: "brandName", type: "text" },
      { label: "Brand Niche", name: "brandNiche", type: "text" },
    ],
    promptTemplate: `
You are a professional brand identity designer.

Create a high-quality logo design prompt.

Brand Name: {{brandName}}
Niche: {{brandNiche}}

Return:
- Logo concept description
- Color suggestions
- Style direction
- Typography ideas
`,
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
    promptTemplate: `
You are an expert content writer.

Write a {{length}} SEO-optimized blog post.

Topic: {{topic}}

Include:
- Engaging introduction
- Clear headings
- Valuable insights
- Conclusion
`,
  },

  seo: {
    title: "🔍 SEO Keyword Generator",
    fields: [
      { label: "Topic", name: "topic", type: "text" },
      { label: "Count", name: "count", type: "number", default: 10 },
    ],
    promptTemplate: `
You are an SEO expert.

Generate {{count}} high-ranking SEO keywords.

Topic: {{topic}}

Return:
- High search volume keywords
- Long-tail keywords
- Trending variations
`,
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
    promptTemplate: `
You are a social media marketing expert.

Generate {{count}} engaging captions in {{tone}} tone.

Post: {{description}}

Make them viral, engaging, and emoji-rich.
`,
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
    promptTemplate: `
You are a high-converting marketing copywriter.

Write persuasive ad copy for {{platform}}.

Product: {{product}}

Include:
- Hook
- Emotional trigger
- Call to action
`,
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
    promptTemplate: `
You are a professional email copywriter.

Write a {{tone}} business email.

Purpose: {{purpose}}

Format strictly:
Subject:
Greeting:
Body:
Call to Action:
Signature:
`,
  },

  product: {
    title: "🛍️ Product Description Writer",
    fields: [
      { label: "Product Name", name: "product", type: "text" },
      { label: "Features", name: "features", type: "text" },
    ],
    promptTemplate: `
You are an eCommerce copywriting expert.

Write a persuasive product description.

Product: {{product}}
Features: {{features}}

Include:
- Emotional appeal
- Benefits
- Sales-driven tone
`,
  },

  resume: {
    title: "📄 AI Resume Builder",
    fields: [
      { label: "Name", name: "name", type: "text" },
      { label: "Skills", name: "skills", type: "text" },
      { label: "Experience", name: "experience", type: "textarea" },
    ],
    promptTemplate: `
You are a professional HR recruiter.

Create a modern ATS-friendly resume.

Name: {{name}}
Skills: {{skills}}
Experience: {{experience}}

Format:
- Summary
- Skills
- Experience
- Education
`,
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
    promptTemplate: `
You are a professional editor.

Rewrite the text in {{style}} style.

Text:
{{text}}

Maintain original meaning but improve clarity.
`,
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
    promptTemplate: `
You are a YouTube content strategist.

Write a {{style}} video script.

Topic: {{topic}}

Include:
- Hook (first 10 seconds)
- Main content
- Engagement prompts
- Ending CTA
`,
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
    promptTemplate: `
You are a customer support specialist.

Write a {{tone}} response.

Issue: {{issue}}

Must include:
- Empathy
- Solution
- Follow-up offer
`,
  },
};

// ================================
// 🚀 MAIN APP
// ================================
export default function Home() {
  const [selectedTool, setSelectedTool] = useState("blog");

  const currentTool = tools[selectedTool];

  return (
    <Box p={6} maxW="5xl" mx="auto">

      {/* HEADER */}
      <VStack spacing={2} mb={6} textAlign="center">

        <Heading size="lg" color="teal.500">
          🚀 AI Multi-Tool Suite (PRO SYSTEM)
        </Heading>

        <Text fontSize="md" color="gray.500">
          Smart AI Agents for Writing, Marketing & Business Automation
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
