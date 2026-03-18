"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";

export default function ArtificiumChat() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Welcome to Artificium. I am a custom enterprise AI agent. How can I help optimize your corporate workflows today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scrolls the chat to the bottom when a new message appears
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Instantly show the judge's message on the screen
    const userMessage = input;
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      // 2. Ping your secure backend route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      // 3. Display the AI's response
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "ai", content: data.reply }]);
      } else {
        throw new Error("No reply received");
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "System connection interrupted. Please verify network status." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-pink-500/30">
      {/* Top Navigation Bar */}
      <header className="p-6 border-b border-slate-800 bg-slate-900 shadow-md flex justify-between items-center z-10">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
            Artificium
          </h1>
          <p className="text-sm text-slate-400 font-medium tracking-wide">Enterprise AI Consulting</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs text-slate-300 font-medium">System Online</span>
        </div>
      </header>

      {/* Main Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 md:gap-4 max-w-[90%] md:max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                
                {/* Avatar */}
                <div className="flex-shrink-0 mt-1">
                  {msg.role === "user" ? (
                    <div className="p-2 md:p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-900/20">
                      <User size={18} className="text-white" />
                    </div>
                  ) : (
                    <div className="p-2 md:p-3 bg-gradient-to-br from-pink-600 to-rose-600 rounded-xl shadow-lg shadow-pink-900/20">
                      <Bot size={18} className="text-white" />
                    </div>
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`p-4 md:p-5 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-sm"
                      : "bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            </div>
          ))}

          {/* Loading Animation */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-4 max-w-[80%]">
                <div className="p-3 bg-gradient-to-br from-pink-600 to-rose-600 rounded-xl flex-shrink-0 h-fit shadow-lg">
                  <Bot size={18} className="text-white" />
                </div>
                <div className="p-5 rounded-2xl rounded-tl-sm bg-slate-800 border border-slate-700 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* Input Console */}
      <div className="p-4 md:p-6 bg-slate-900 border-t border-slate-800">
        <form onSubmit={sendMessage} className="flex gap-3 md:gap-4 max-w-4xl mx-auto relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about our custom AI workflows..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl pl-5 pr-12 md:pr-6 py-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-100 placeholder:text-slate-500 shadow-inner text-sm md:text-base"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white px-4 md:px-8 py-4 rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2 group"
          >
            <span className="hidden md:inline">Transmit</span>
            <Send size={18} className="group-hover:text-blue-400 transition-colors" />
          </button>
        </form>
      </div>
    </div>
  );
}