"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, User } from "lucide-react";
import { FiMessageCircle, FiSend, FiX } from "react-icons/fi";

export default function NavChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi there! I'm your shopping assistant. How can I help you find the perfect product today? 😊" }
  ]);
  const [typing, setTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Click outside to close logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatContainerRef.current && !chatContainerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    const userInput = input;
    setInput("");
    setTyping(true);
    setMessages(prev => [...prev, { from: "bot", text: "typing..." }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await res.json();
      setMessages(prev => [...prev.slice(0, -1), { from: "bot", text: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev.slice(0, -1), { from: "bot", text: "I'm having trouble connecting right now." }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="relative" ref={chatContainerRef}>
      {/* Navbar Style Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`p-3 rounded-2xl transition-all duration-300 ${
          open ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-100"
        }`}
      >
        <FiMessageCircle size={24} className={open ? "rotate-12" : ""} />
      </button>

      {/* Dropdown Chat Box */}
      <div
        className={`absolute right-0 mt-3 w-80 sm:w-96 z-50 transition-all duration-300 ease-out origin-top-right ${
          open 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Shopping Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-blue-100 text-xs">Online</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg text-white"
              >
                <FiX size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-80 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.from === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.from === "user" ? "bg-blue-600" : "bg-gray-300"
                }`}>
                  {msg.from === "user" ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
                </div>
                <div className={`p-3 rounded-2xl text-sm max-w-[80%] ${
                  msg.from === "user" 
                    ? "bg-blue-600 text-white rounded-tr-none" 
                    : "bg-white text-gray-800 shadow-sm rounded-tl-none"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask me anything..."
                className="w-full pl-4 pr-10 py-2.5 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all"
                disabled={typing}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || typing}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-blue-600 disabled:text-gray-300"
              >
                <FiSend size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}