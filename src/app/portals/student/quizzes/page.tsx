"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Quiz {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  duration: number;
  questions: number;
  status: "available" | "completed" | "upcoming";
  score?: number;
  attempts: number;
  maxAttempts: number;
}

const quizzes: Quiz[] = [
  {
    id: "1",
    title: "Algebra Basics Quiz",
    course: "Mathematics - Algebra",
    dueDate: "2024-01-20",
    duration: 30,
    questions: 15,
    status: "available",
    attempts: 0,
    maxAttempts: 3,
  },
  {
    id: "2",
    title: "Cell Biology Quiz",
    course: "Science - Biology",
    dueDate: "2024-01-25",
    duration: 45,
    questions: 20,
    status: "completed",
    score: 85,
    attempts: 1,
    maxAttempts: 2,
  },
  {
    id: "3",
    title: "Shakespeare Knowledge Test",
    course: "English Literature",
    dueDate: "2024-01-30",
    duration: 60,
    questions: 25,
    status: "upcoming",
    attempts: 0,
    maxAttempts: 1,
  },
  {
    id: "4",
    title: "Ancient History Quiz",
    course: "World History",
    dueDate: "2024-02-05",
    duration: 40,
    questions: 18,
    status: "available",
    attempts: 1,
    maxAttempts: 3,
  },
];

export default function QuizzesPage() {
  const [filter, setFilter] = useState<
    "all" | "available" | "completed" | "upcoming"
  >("all");

  const filteredQuizzes = quizzes.filter(
    (quiz) => filter === "all" || quiz.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "upcoming":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return "🎯";
      case "completed":
        return "✅";
      case "upcoming":
        return "📅";
      default:
        return "❓";
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quizzes & Tests</h1>
          <p className="text-gray-600 mt-2">
            Test your knowledge and track your progress
          </p>
        </div>

        <div className="flex space-x-3 mt-4 sm:mt-0">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">All Quizzes</option>
            <option value="available">Available</option>
            <option value="completed">Completed</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>
      </motion.div>

      {/* Quiz Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Quizzes",
            value: quizzes.length,
            color: "from-gray-500 to-gray-600",
            icon: "📊",
          },
          {
            label: "Available",
            value: quizzes.filter((q) => q.status === "available").length,
            color: "from-green-500 to-emerald-500",
            icon: "🎯",
          },
          {
            label: "Completed",
            value: quizzes.filter((q) => q.status === "completed").length,
            color: "from-blue-500 to-cyan-500",
            icon: "✅",
          },
          {
            label: "Average Score",
            value: "82%",
            color: "from-purple-500 to-pink-500",
            icon: "⭐",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div
                className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center text-white text-xl`}
              >
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quizzes List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Quizzes</h2>

          {filteredQuizzes.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No quizzes found
              </h3>
              <p className="text-gray-600">Check back later for new quizzes</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredQuizzes.map((quiz, index) => (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                      {getStatusIcon(quiz.status)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {quiz.title}
                      </h3>
                      <p className="text-sm text-gray-600">{quiz.course}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>{quiz.duration} minutes</span>
                        <span>{quiz.questions} questions</span>
                        <span>
                          Due: {new Date(quiz.dueDate).toLocaleDateString()}
                        </span>
                        {quiz.score && (
                          <span className="font-medium text-green-600">
                            Score: {quiz.score}%
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">
                          Attempts: {quiz.attempts}/{quiz.maxAttempts}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        quiz.status
                      )}`}
                    >
                      {quiz.status.charAt(0).toUpperCase() +
                        quiz.status.slice(1)}
                    </span>
                    <button
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        quiz.status === "available"
                          ? "bg-indigo-600 text-white hover:bg-indigo-700"
                          : quiz.status === "completed"
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {quiz.status === "available"
                        ? "Start Quiz"
                        : quiz.status === "completed"
                        ? "Review"
                        : "View Details"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-blue-50 border border-blue-200 rounded-2xl p-6"
      >
        <div className="flex items-start space-x-4">
          <div className="text-2xl">💡</div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Quiz Tips</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Read each question carefully before answering</li>
              <li>• Manage your time wisely during the quiz</li>
              <li>• Review your answers before submitting</li>
              <li>• Use available attempts strategically</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
