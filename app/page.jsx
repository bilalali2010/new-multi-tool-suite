"use client";

import { useState } from "react";
import { Box, Select, Heading } from "@chakra-ui/react";
import ToolUI from "@/components/ToolUI";

const tools = {
  "AI Chatbot": "Answer this: {{input}}",
  "Logo Prompt Generator": "Create one professional logo prompt for {{input}}",
  "Text Rewriter": "Rewrite in professional style: {{input}}",
  "Meme Idea Generator": "Give 5 meme ideas about {{input}}",
  "AI Blog Generator": "Write a blog with headings on {{input}}",
  "News Article Writer": "Write a news article on {{input}}",
  "Story Writer": "Write a creative story about {{input}}",
  "Caption Writer": "Generate social media captions for {{input}}",
  "SEO Keyword Generator": "Generate SEO keywords for {{input}}",
  "Email Writer": "Write a professional email about {{input}}"
};

export default function Home() {
  const [selected, setSelected] = useState("AI Chatbot");

  return (
    <Box p={8}>
      <Heading mb={6}>✨ AI Multi-Tool Suite</Heading>

      <Select
        mb={6}
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        maxW="400px"
      >
        {Object.keys(tools).map((tool) => (
          <option key={tool}>{tool}</option>
        ))}
      </Select>

      <ToolUI
        title={selected}
        promptTemplate={tools[selected]}
      />
    </Box>
  );
}
