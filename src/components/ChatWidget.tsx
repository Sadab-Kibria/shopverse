"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, User } from "lucide-react";
import { FiMessageCircle, FiSend, FiX } from "react-icons/fi";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi there! I'm your shopping assistant. How can I help you find the perfect product today? 😊" }
  ]);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    const userInput = input;
    setInput("");

    // Show typing indicator
    setTyping(true);
    setMessages(prev => [...prev, { from: "bot", text: "typing..." }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await res.json();
      const botReply = data.reply;

      setMessages(prev => {
        const newList = prev.slice(0, -1);
        return [...newList, { from: "bot", text: botReply }];
      });
    } catch (err) {
      setMessages(prev => {
        const newList = prev.slice(0, -1);
        return [...newList, { from: "bot", text: "I'm having trouble connecting right now. Please try again in a moment." }];
      });
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button - Right side, above cart button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-20 right-6 z-40 flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
      >
        <FiMessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span className="hidden md:block font-semibold">Live Chat</span>
      </button>

      {/* Chat Popup */}
      <div
        className={`fixed bottom-44 right-6 z-50 transition-all duration-300 ease-out ${
          open 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        {open && (
          <div className="w-full sm:w-96 bg-white rounded-lg shadow-2xl border border-white/20 overflow-hidden">
            {/* Header */}
            <div className="bg-blue-600 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Shopping Assistant</h3>
                    <p className="text-blue-100 text-sm">Live AI Support</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <FiX className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="h-96 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white space-y-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${msg.from === "user" ? "flex-row-reverse" : ""}`}
                  >
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.from === "user" 
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500" 
                        : "bg-gradient-to-r from-gray-300 to-gray-400"
                    }`}>
                      {msg.from === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[75%] rounded-2xl p-3 ${
                        msg.from === "user"
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      {msg.text === "typing..." && (
                        <div className="flex gap-1 mt-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-100 p-4 bg-white">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Type your message here..."
                      className="w-full pl-4 pr-12 py-3 bg-gray-50 text-gray-800 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 transition-all duration-200 outline-none placeholder-gray-500"
                      disabled={typing}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim() || typing}
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all ${
                        input.trim() && !typing
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-md"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <FiSend className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Helper Text */}
                <p className="text-xs text-gray-500 text-center mt-3">
                  Ask about products, pricing, shipping, or anything else!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}