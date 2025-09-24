"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Message {
  id: string;
  sender: string;
  senderType: "teacher" | "ai" | "system";
  preview: string;
  timestamp: string;
  unread: boolean;
  course?: string;
}

interface Conversation {
  id: string;
  sender: string;
  senderType: "teacher" | "ai" | "system";
  messages: { text: string; timestamp: Date; sender: "user" | "other" }[];
}

const initialMessages: Message[] = [
  {
    id: "1",
    sender: "Dr. Sarah Chen",
    senderType: "teacher",
    preview:
      "Great work on the algebra assignment! Let me know if you need help with the next problem set.",
    timestamp: "2 hours ago",
    unread: true,
    course: "Mathematics - Algebra",
  },
  {
    id: "2",
    sender: "AI Tutor",
    senderType: "ai",
    preview:
      "I noticed you were reviewing quadratic equations. Would you like me to explain the quadratic formula again?",
    timestamp: "5 hours ago",
    unread: true,
  },
  {
    id: "3",
    sender: "Prof. Michael Rodriguez",
    senderType: "teacher",
    preview:
      "Lab report feedback is ready. You did excellent work on the cell structure analysis.",
    timestamp: "1 day ago",
    unread: false,
    course: "Science - Biology",
  },
  {
    id: "4",
    sender: "System",
    senderType: "system",
    preview:
      "New assignment posted: Shakespeare Sonnet Analysis due January 12th",
    timestamp: "2 days ago",
    unread: false,
    course: "English Literature",
  },
];

const initialConversation: Conversation = {
  id: "1",
  sender: "Dr. Sarah Chen",
  senderType: "teacher",
  messages: [
    {
      text: "Hi! I wanted to follow up on your algebra assignment. You're doing great!",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      sender: "other",
    },
    {
      text: "Thank you, Dr. Chen! I'm working on the quadratic equations now.",
      timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
      sender: "user",
    },
    {
      text: "Excellent! Remember to check your work using the quadratic formula. Let me know if you get stuck on any problems.",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      sender: "other",
    },
  ],
};

export default function MessagesPage() {
  const [messages] = useState<Message[]>(initialMessages);
  const [activeConversation, setActiveConversation] =
    useState<Conversation>(initialConversation);
  const [newMessage, setNewMessage] = useState("");

  const getSenderIcon = (senderType: string) => {
    switch (senderType) {
      case "teacher":
        return "👨‍🏫";
      case "ai":
        return "🤖";
      case "system":
        return "⚙️";
      default:
        return "👤";
    }
  };

  const getSenderColor = (senderType: string) => {
    switch (senderType) {
      case "teacher":
        return "bg-blue-100 text-blue-800";
      case "ai":
        return "bg-green-100 text-green-800";
      case "system":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      text: newMessage,
      timestamp: new Date(),
      sender: "user" as const,
    };

    setActiveConversation((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
    }));

    setNewMessage("");

    // Simulate reply
    setTimeout(() => {
      const replyMessage = {
        text: "Thanks for your message! I'll get back to you soon with more guidance.",
        timestamp: new Date(),
        sender: "other" as const,
      };

      setActiveConversation((prev) => ({
        ...prev,
        messages: [...prev.messages, replyMessage],
      }));
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-2">
            Communicate with teachers and your AI tutor
          </p>
        </div>

        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm text-gray-600">All systems operational</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Messages List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Conversations</h2>
          </div>

          <div className="overflow-y-auto h-full">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                  message.unread ? "bg-blue-50" : ""
                }`}
                onClick={() =>
                  setActiveConversation({
                    id: message.id,
                    sender: message.sender,
                    senderType: message.senderType,
                    messages: initialConversation.messages,
                  })
                }
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">
                    {getSenderIcon(message.senderType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {message.sender}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {message.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {message.preview}
                    </p>
                    {message.course && (
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs mt-1">
                        {message.course}
                      </span>
                    )}
                  </div>
                  {message.unread && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Active Conversation */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col"
        >
          {/* Conversation Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">
                {getSenderIcon(activeConversation.senderType)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {activeConversation.sender}
                </h3>
                <p className="text-sm text-gray-600">
                  {activeConversation.senderType === "teacher"
                    ? "Teacher"
                    : activeConversation.senderType === "ai"
                    ? "AI Tutor"
                    : "System"}
                </p>
              </div>
              <span
                className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${getSenderColor(
                  activeConversation.senderType
                )}`}
              >
                {activeConversation.senderType}
              </span>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeConversation.messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md rounded-2xl p-3 ${
                    message.sender === "user"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "user"
                        ? "text-indigo-200"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Send
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
