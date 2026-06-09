"use client";
import { useState, useRef, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

interface Message {
  role: "user" | "bot";
  text: string;
}

const renderMessage = (text: string) => {
  const lines = text.split("\n");
  return lines.map((line, lineIdx) => {
    let isBullet = false;
    let cleanLine = line.trim();
    if (cleanLine.startsWith("* ") || cleanLine.startsWith("- ")) {
      isBullet = true;
      cleanLine = cleanLine.substring(2);
    } else if (cleanLine.startsWith("*") && !cleanLine.startsWith("**")) {
      isBullet = true;
      cleanLine = cleanLine.substring(1);
    } else {
      cleanLine = line; // Preserve original spacing/indentation for non-bullet lines
    }

    // Parse Markdown links [label](url) and bold **text**
    const regex = /(\[.*?\]\(.*?\))|(\*\*.*?\*\*)/g;
    const parts = cleanLine.split(regex);
    const content = parts.map((part, partIdx) => {
      if (!part) return null;

      if (part.startsWith("[") && part.includes("](")) {
        const match = part.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
          const [_, label, url] = match;
          const isExternal = url.startsWith("http") || url.startsWith("mailto:") || url.startsWith("tel:");
          if (isExternal) {
            return (
              <a key={partIdx} href={url} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline font-semibold">
                {label}
              </a>
            );
          } else {
            return (
              <Link key={partIdx} href={url} className="text-sky-600 hover:underline font-semibold">
                {label}
              </Link>
            );
          }
        }
      }

      if (part.startsWith("**") && part.endsWith("**")) {
        const boldText = part.slice(2, -2);
        return <strong key={partIdx} className="font-extrabold text-slate-900">{boldText}</strong>;
      }

      return part;
    });

    if (isBullet) {
      return (
        <div key={lineIdx} className="flex items-start gap-2 my-1 pl-2">
          <span className="text-sky-500 select-none">•</span>
          <div className="flex-1 text-slate-700">{content}</div>
        </div>
      );
    }

    return (
      <div key={lineIdx} className={lineIdx > 0 ? "mt-1.5" : ""}>
        {content}
      </div>
    );
  });
};


export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! I'm Moonshot Minds assistant. How can I help you? 🚀" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("chatbot-toggle", { detail: isOpen }));
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    setMessages(prev => [...prev, { role: "user", text: input }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "bot", text: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "bot", text: "Error! Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:right-6 sm:left-auto z-50 flex flex-col items-end pointer-events-none">
      {isOpen && (
        <div className="pointer-events-auto mb-4 w-full sm:w-96 rounded-2xl shadow-2xl bg-white border border-slate-100 flex flex-col overflow-hidden max-h-[calc(100vh-120px)]" 
          style={{ height: "480px" }}>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-500 to-sky-600 px-4 py-3 flex justify-between items-center">
            <div>
              <p className="text-white font-semibold text-sm">🚀 Moonshot Assistant</p>
              <p className="text-sky-100 text-xs">Online • Ready to help</p>
            </div>
            <button onClick={() => setIsOpen(false)} 
              className="text-white hover:text-sky-200 text-xl font-bold">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-slate-50">
            {messages.map((msg, i) => (
              <div key={i} className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
                ${msg.role === "user"
                  ? "self-end bg-sky-500 text-white rounded-br-sm"
                  : "self-start bg-white text-slate-800 shadow-sm rounded-bl-sm"}`}>
                {renderMessage(msg.text)}
              </div>
            ))}
            {loading && (
              <div className="self-start bg-white text-slate-400 px-4 py-2 rounded-2xl text-sm shadow-sm">
                ⏳ typing...
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-100 flex gap-2 bg-white">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 
                         text-sm outline-none focus:border-sky-400 text-slate-800"
            />
            <button onClick={sendMessage} disabled={loading}
              className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 
                         rounded-xl text-sm disabled:opacity-50">
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto w-12 h-12 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 
                   text-white text-xl shadow-lg flex items-center justify-center 
                   hover:scale-110 transition-transform">
        {isOpen ? "✕" : "🚀"}
      </button>
    </div>
  );
}