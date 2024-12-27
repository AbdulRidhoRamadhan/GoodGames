import React, { useState, useRef, useEffect } from "react";
import { api } from "../api/axios";

function Chatbot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async () => {
    if (!userInput.trim()) return;

    const userMessage = { role: "user", content: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput("");

    try {
      const { data } = await api.post("/api/chat", { input: userInput });
      const botMessage = { role: "bot", content: data };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message to chatbot:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-5 right-5 w-96 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-4 z-50">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="h-96 overflow-y-auto mb-4 custom-scrollbar">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message mb-3 ${
              message.role === "user"
                ? "flex justify-end"
                : "flex justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.role === "user"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-gray-800 text-gray-200 rounded-bl-none"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={userInput}
          onChange={handleUserInput}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-xl transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
