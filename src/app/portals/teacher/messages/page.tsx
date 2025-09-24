"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Message {
  id: string;
  sender: string;
  senderType: "student" | "parent" | "teacher" | "admin";
  senderClass?: string;
  subject: string;
  content: string;
  timestamp: string;
  unread: boolean;
  priority: "low" | "medium" | "high";
  attachments?: number;
}

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "Michael Chen",
    senderType: "student",
    senderClass: "Algebra II - Period 3",
    subject: "Question about Homework Problem #5",
    content:
      "Dear Mrs. Johnson, I'm having trouble understanding problem #5 on page 42 of our homework assignment. Could you please explain the concept again during tomorrow's class?",
    timestamp: "2024-01-15T14:30:00",
    unread: true,
    priority: "medium",
    attachments: 0,
  },
  {
    id: "2",
    sender: "Robert Davis (Parent)",
    senderType: "parent",
    senderClass: "Geometry - Period 2",
    subject: "Concern about upcoming test",
    content:
      "Hello, I'm concerned about my daughter Sarah's preparation for the upcoming geometry test. Would it be possible to schedule a brief meeting to discuss her progress?",
    timestamp: "2024-01-15T10:15:00",
    unread: true,
    priority: "high",
    attachments: 0,
  },
  {
    id: "3",
    sender: "Mathematics Department",
    senderType: "admin",
    subject: "Curriculum Meeting Reminder",
    content:
      "Reminder: There will be a mathematics department meeting this Friday at 3:00 PM in Room 214. Please bring your curriculum suggestions for next semester.",
    timestamp: "2024-01-14T16:45:00",
    unread: false,
    priority: "medium",
    attachments: 1,
  },
  {
    id: "4",
    sender: "Dr. Sarah Wilson",
    senderType: "teacher",
    subject: "Shared Resources for Calculus",
    content:
      "I've created some new calculus resources that might be helpful for your advanced students. Let me know if you'd like to collaborate on the upcoming project.",
    timestamp: "2024-01-14T11:20:00",
    unread: false,
    priority: "low",
    attachments: 3,
  },
  {
    id: "5",
    sender: "Emily Rodriguez",
    senderType: "student",
    senderClass: "Calculus - Period 1",
    subject: "Thank you for extra help",
    content:
      "Thank you for staying after class yesterday to help me understand derivatives better. I feel much more confident now!",
    timestamp: "2024-01-13T17:30:00",
    unread: false,
    priority: "low",
    attachments: 0,
  },
  {
    id: "6",
    sender: "School Administration",
    senderType: "admin",
    subject: "Professional Development Workshop",
    content:
      "Registration is now open for the upcoming professional development workshop on 'Innovative Teaching Strategies in Mathematics' scheduled for January 25th.",
    timestamp: "2024-01-13T09:00:00",
    unread: false,
    priority: "medium",
    attachments: 2,
  },
];

export default function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(
    mockMessages[0]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<
    "all" | "unread" | "students" | "parents" | "teachers"
  >("all");
  const [composeOpen, setComposeOpen] = useState(false);

  const filteredMessages = mockMessages.filter((message) => {
    const matchesSearch =
      message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && message.unread) ||
      (filter === "students" && message.senderType === "student") ||
      (filter === "parents" && message.senderType === "parent") ||
      (filter === "teachers" && message.senderType === "teacher");
    return matchesSearch && matchesFilter;
  });

  const unreadCount = mockMessages.filter((m) => m.unread).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSenderIcon = (type: string) => {
    switch (type) {
      case "student":
        return "👨‍🎓";
      case "parent":
        return "👨‍👩‍👧‍👦";
      case "teacher":
        return "👨‍🏫";
      case "admin":
        return "🏢";
      default:
        return "👤";
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const markAsRead = (messageId: string) => {
    const message = mockMessages.find((m) => m.id === messageId);
    if (message) message.unread = false;
    setSelectedMessage({ ...selectedMessage! });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
            <p className="text-gray-600 mt-2">
              Communicate with students, parents, and staff
            </p>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <button
              onClick={() => setComposeOpen(true)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
            >
              + Compose Message
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              {/* Search and Filters */}
              <div className="p-6 border-b border-gray-200">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <div className="flex flex-wrap gap-2">
                    {[
                      {
                        value: "all",
                        label: "All",
                        count: mockMessages.length,
                      },
                      { value: "unread", label: "Unread", count: unreadCount },
                      {
                        value: "students",
                        label: "Students",
                        count: mockMessages.filter(
                          (m) => m.senderType === "student"
                        ).length,
                      },
                      {
                        value: "parents",
                        label: "Parents",
                        count: mockMessages.filter(
                          (m) => m.senderType === "parent"
                        ).length,
                      },
                      {
                        value: "teachers",
                        label: "Teachers",
                        count: mockMessages.filter(
                          (m) => m.senderType === "teacher"
                        ).length,
                      },
                    ].map((tab) => (
                      <button
                        key={tab.value}
                        onClick={() => setFilter(tab.value as any)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 flex items-center space-x-1 ${
                          filter === tab.value
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <span>{tab.label}</span>
                        <span className="text-xs opacity-75">
                          ({tab.count})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Messages List */}
              <div className="max-h-[600px] overflow-y-auto">
                {filteredMessages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      setSelectedMessage(message);
                      markAsRead(message.id);
                    }}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                      selectedMessage?.id === message.id
                        ? "bg-indigo-50 border-indigo-200"
                        : ""
                    } ${message.unread ? "bg-blue-50" : ""}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl flex-shrink-0">
                        {getSenderIcon(message.senderType)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`font-medium truncate ${
                              message.unread ? "text-blue-600" : "text-gray-900"
                            }`}
                          >
                            {message.sender}
                          </span>
                          <div className="flex items-center space-x-2">
                            {message.attachments && message.attachments > 0 && (
                              <span className="text-xs text-gray-500">
                                📎{message.attachments}
                              </span>
                            )}
                            <span className="text-xs text-gray-500">
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-900 truncate mb-1">
                          {message.subject}
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {message.content}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(
                              message.priority
                            )}`}
                          >
                            {message.priority}
                          </span>
                          {message.senderClass && (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {message.senderClass}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Message Detail */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 h-full">
              {selectedMessage ? (
                <div className="h-full flex flex-col">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">
                          {getSenderIcon(selectedMessage.senderType)}
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">
                            {selectedMessage.subject}
                          </h2>
                          <div className="flex items-center space-x-2 mt-1">
                            <p className="text-gray-600 font-medium">
                              {selectedMessage.sender}
                            </p>
                            {selectedMessage.senderClass && (
                              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {selectedMessage.senderClass}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {new Date(selectedMessage.timestamp).toLocaleString()}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(
                            selectedMessage.priority
                          )}`}
                        >
                          {selectedMessage.priority} priority
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium">
                        Reply
                      </button>
                      <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium">
                        Forward
                      </button>
                      <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium">
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 p-6 overflow-y-auto">
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {selectedMessage.content}
                      </p>

                      {selectedMessage.attachments &&
                        selectedMessage.attachments > 0 && (
                          <div className="mt-6">
                            <h4 className="font-medium text-gray-900 mb-3">
                              Attachments ({selectedMessage.attachments})
                            </h4>
                            <div className="space-y-2">
                              {[...Array(selectedMessage.attachments)].map(
                                (_, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                                  >
                                    <span className="text-2xl">📎</span>
                                    <div>
                                      <p className="text-sm font-medium">
                                        document_{i + 1}.pdf
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {(1.2 + i * 0.5).toFixed(1)} MB
                                      </p>
                                    </div>
                                    <button className="ml-auto text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                                      Download
                                    </button>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>

                  {/* Reply Section */}
                  <div className="p-6 border-t border-gray-200">
                    <textarea
                      placeholder="Type your reply..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      rows={3}
                    />
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                          📎
                        </button>
                        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                          🖼️
                        </button>
                      </div>
                      <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                        Send Reply
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full py-12">
                  <div className="text-center">
                    <div className="text-6xl mb-4">💬</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No message selected
                    </h3>
                    <p className="text-gray-600">
                      Choose a message from the list to view its contents
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
