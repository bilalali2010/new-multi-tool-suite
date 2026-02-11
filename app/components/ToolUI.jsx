"use client";

import { useState } from "react";

export default function ToolUI({ title, promptTemplate }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    if (!input) return;

    setLoading(true);
    setOutput("");

    const finalPrompt = promptTemplate.replace("{{input}}", input);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: finalPrompt }),
    });

    const data = await res.json();
    setOutput(data.result || "Error generating response");
    setLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>

      <textarea
        className="w-full border p-4 rounded-xl mb-6 focus:ring-2 focus:ring-indigo-500 outline-none"
        rows="6"
        placeholder="Enter your input..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={generate}
        className="bg-gradient-to-r from-indigo-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:opacity-90 transition"
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {output && (
        <div className="mt-8 p-6 bg-gray-50 rounded-xl border whitespace-pre-wrap">
          {output}
        </div>
      )}
    </div>
  );
}
