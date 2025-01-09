"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import axios from "axios";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to the code page with the prompt as a param
    const response = await axios.post('/api/template', { prompt : prompt })
    const data = response.data.prompts;
    data.push(prompt)  
    router.push(`/code?prompt=${JSON.stringify(data)}`);
  };

  return (
    <main className="min-h-screen bg-background dark:bg-gray-900 text-foreground dark:text-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <Sparkles className="h-12 w-12 text-primary dark:text-yellow-400" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Website Builder AI</h1>
          <p className="text-muted-foreground dark:text-gray-400 mb-8">
            Describe your dream website, and we'll generate the code for you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your website... (e.g., 'Create a modern landing page for a coffee shop with a hero section, menu, and contact form')"
                className="w-full h-40 p-4 rounded-lg bg-card dark:bg-gray-800 text-card-foreground dark:text-gray-100 border border-border dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-yellow-400"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary dark:bg-yellow-500 text-primary-foreground dark:text-black hover:bg-primary/90 dark:hover:bg-yellow-600 transition-colors"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Website
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
