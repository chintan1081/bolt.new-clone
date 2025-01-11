"use client";

import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ClipboardCopy } from "lucide-react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function Code() {
    const searchParams = useSearchParams();
    const prompt = searchParams.get("prompt");    
    console.log(prompt);
        
    const [copied, setCopied] = useState(false);
    const [generatedCode, setGeneratedCode] = useState('')
    useEffect( () => {
        try {
            axios.post('/api/chat', {prompt : prompt} )
            .then( response => setGeneratedCode(response.data.msg.text) )
        } catch (error) {
            console.log(error);
        }
    }, [prompt]);

    console.log(generatedCode);
    

      const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500); // Reset after 1.5 seconds
      };

    return (
        <div className="container min-h-screen mx-auto px-4 py-14 bg-background dark:bg-gray-900 text-foreground dark:text-gray-100">
            <div className="max-w-6xl mx-auto p-6 bg-card dark:bg-gray-800 rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl font-bold">Generated Code</h2>
                    <CopyToClipboard text={generatedCode} onCopy={handleCopy}>
                        <button
                            className="px-4 py-2 bg-primary dark:bg-yellow-500 text-primary-foreground dark:text-black rounded-lg flex items-center hover:bg-primary/90 dark:hover:bg-yellow-600 transition-colors"
                        >
                            <ClipboardCopy className="w-5 h-5 mr-2" />
                            {copied ? "Copied!" : "Copy Code"}
                        </button>
                    </CopyToClipboard>
                </div>

                <div className="overflow-auto    text-muted-foreground dark:text-gray-400 mb-4">
                    <strong>Prompt:</strong> {typeof(prompt) == 'string' ? JSON.parse(prompt)[2] : '' }
                </div>

                <pre className="overflow-auto bg-gray-800 dark:bg-gray-700 text-white p-4 rounded-lg">
                    <code>{generatedCode}</code>
                </pre>
            </div>
        </div>
    );
}
