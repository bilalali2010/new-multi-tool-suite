"use client";

import { useState } from "react";
import ToolUI from "./components/ToolUI";

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
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-72 bg-white shadow-lg p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-8 bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
          AI Multi-Tool
        </h1>

        <div className="space-y-2 overflow-y-auto">
          {Object.keys(tools).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedTool(key)}
              className={`w-full text-left px-4 py-2 rounded-xl transition 
                ${selectedTool === key ? "bg-indigo-600 text-white" : "hover:bg-gray-100"}`}
            >
              {tools[key].title}
            </button>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-10 overflow-y-auto">
        <ToolUI
          title={tools[selectedTool].title}
          promptTemplate={tools[selectedTool].prompt}
        />
      </div>
    </div>
  );
}
