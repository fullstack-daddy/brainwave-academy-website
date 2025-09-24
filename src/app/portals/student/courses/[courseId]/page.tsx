"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  rating: number;
  students: number;
  duration: string;
  lessons: number;
  level: string;
  category: string;
  thumbnail: string;
  progress: number;
  price: number;
  objectives: string[];
  requirements: string[];
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "text" | "quiz" | "assignment";
  completed: boolean;
  locked: boolean;
  content?: string;
  videoUrl?: string;
  questions?: QuizQuestion[];
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Note {
  id: string;
  lessonId: string;
  content: string;
  timestamp: string;
  tags: string[];
}

interface AIQuestion {
  id: string;
  question: string;
  answer: string;
  timestamp: Date;
}

// Mock data - In real app, this would come from API
const mockCourse: Course = {
  id: "1",
  title: "Advanced Algebra Masterclass",
  instructor: "Dr. Sarah Chen",
  description:
    "Master advanced algebraic concepts including quadratic equations, polynomials, functions, and complex numbers. This comprehensive course takes you from basic principles to advanced problem-solving techniques used in competitive mathematics.",
  rating: 4.8,
  students: 12450,
  duration: "12 hours",
  lessons: 24,
  level: "Intermediate",
  category: "Mathematics",
  thumbnail: "∫",
  progress: 65,
  price: 89.99,
  objectives: [
    "Solve complex quadratic equations using multiple methods",
    "Understand polynomial functions and their properties",
    "Master function transformations and compositions",
    "Work with complex numbers and their applications",
    "Develop advanced problem-solving strategies",
  ],
  requirements: [
    "Basic algebra knowledge",
    "Understanding of equations and inequalities",
    "Familiarity with graphing concepts",
  ],
};

const mockLessons: Lesson[] = [
  {
    id: "1",
    title: "Introduction to Quadratic Equations",
    duration: "25 min",
    type: "video",
    completed: true,
    locked: false,
    videoUrl: "https://example.com/video1",
  },
  {
    id: "2",
    title: "Factoring Quadratic Expressions",
    duration: "35 min",
    type: "video",
    completed: true,
    locked: false,
    videoUrl: "https://example.com/video2",
  },
  {
    id: "3",
    title: "Quadratic Formula Deep Dive",
    duration: "40 min",
    type: "video",
    completed: false,
    locked: false,
    videoUrl: "https://example.com/video3",
  },
  {
    id: "4",
    title: "Practice Problem Set",
    duration: "45 min",
    type: "assignment",
    completed: false,
    locked: false,
  },
  {
    id: "5",
    title: "Complex Numbers Introduction",
    duration: "30 min",
    type: "video",
    completed: false,
    locked: false,
    videoUrl: "https://example.com/video4",
  },
  {
    id: "6",
    title: "Chapter 1 Quiz",
    duration: "20 min",
    type: "quiz",
    completed: false,
    locked: true,
    questions: [
      {
        id: "1",
        question: "What is the solution to x² + 5x + 6 = 0?",
        options: ["x = -2, -3", "x = 2, 3", "x = -1, -6", "x = 1, 6"],
        correctAnswer: 0,
        explanation:
          "The equation factors to (x + 2)(x + 3) = 0, giving solutions x = -2 and x = -3.",
      },
    ],
  },
];

export default function CoursePage() {
  const params = useParams();
  const courseId = params.courseId as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [aiQuestions, setAiQuestions] = useState<AIQuestion[]>([]);
  const [newNote, setNewNote] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "content" | "notes" | "questions" | "resources"
  >("content");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourse(mockCourse);
      setLessons(mockLessons);
      setActiveLesson(mockLessons[2]); // Start with third lesson
    }, 500);
  }, [courseId]);

  const addNote = () => {
    if (!newNote.trim() || !activeLesson) return;

    const note: Note = {
      id: Date.now().toString(),
      lessonId: activeLesson.id,
      content: newNote,
      timestamp: new Date().toISOString(),
      tags: extractTags(newNote),
    };

    setNotes((prev) => [note, ...prev]);
    setNewNote("");
  };

  const extractTags = (content: string): string[] => {
    const tags = [];
    if (content.toLowerCase().includes("important")) tags.push("important");
    if (content.toLowerCase().includes("formula")) tags.push("formula");
    if (content.toLowerCase().includes("example")) tags.push("example");
    if (content.toLowerCase().includes("review")) tags.push("review");
    return tags;
  };

  const askAI = async () => {
    if (!newQuestion.trim()) return;

    const userQuestion: AIQuestion = {
      id: Date.now().toString(),
      question: newQuestion,
      answer: "",
      timestamp: new Date(),
    };

    setAiQuestions((prev) => [userQuestion, ...prev]);
    setNewQuestion("");
    setIsAiThinking(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const aiResponse: AIQuestion = {
        id: (Date.now() + 1).toString(),
        question: newQuestion,
        answer: generateAIResponse(newQuestion),
        timestamp: new Date(),
      };

      setAiQuestions((prev) => [aiResponse, ...prev.slice(1)]);
      setIsAiThinking(false);
    }, 2000);
  };

  const generateAIResponse = (question: string): string => {
    const responses = {
      explain:
        "Let me break this down step by step. The key concept here is...",
      example: "Here's a practical example to illustrate this concept...",
      formula: "The formula works by... Remember to pay attention to...",
      practice: "I recommend practicing with these types of problems...",
      default:
        "That's an excellent question! Based on the current lesson, here's what you need to know...",
    };

    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes("explain")) return responses.explain;
    if (lowerQuestion.includes("example")) return responses.example;
    if (lowerQuestion.includes("formula")) return responses.formula;
    if (lowerQuestion.includes("practice")) return responses.practice;

    return responses.default;
  };

  const completeLesson = (lessonId: string) => {
    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, completed: true } : lesson
      )
    );
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course content...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
                {course.category}
              </span>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-indigo-100 text-lg mb-6">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="bg-white/20 px-2 py-1 rounded">
                    ⭐ {course.rating}
                  </span>
                  <span>({course.students.toLocaleString()} students)</span>
                </div>
                <span>•</span>
                <span>{course.duration} total</span>
                <span>•</span>
                <span>{course.lessons} lessons</span>
                <span>•</span>
                <span>{course.level} level</span>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-6xl text-center mb-4">
                {course.thumbnail}
              </div>
              <div className="space-y-4">
                <button className="w-full bg-white text-indigo-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Continue Learning
                </button>
                <button className="w-full border border-white text-white py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  Add to Favorites
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <h3 className="font-semibold mb-3">Course Progress</h3>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-green-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm mt-2">{course.progress}% completed</p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Course Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 sticky top-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="font-bold text-gray-900">Course Content</h2>
                <p className="text-sm text-gray-600">
                  {lessons.filter((l) => l.completed).length}/{lessons.length}{" "}
                  lessons completed
                </p>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {lessons.map((lesson, index) => (
                  <motion.button
                    key={lesson.id}
                    whileHover={{ x: 4 }}
                    onClick={() => !lesson.locked && setActiveLesson(lesson)}
                    className={`w-full text-left p-4 border-b border-gray-100 transition-colors duration-200 ${
                      activeLesson?.id === lesson.id
                        ? "bg-indigo-50 border-indigo-200"
                        : lesson.locked
                        ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                            lesson.completed
                              ? "bg-green-100 text-green-600"
                              : lesson.locked
                              ? "bg-gray-200 text-gray-400"
                              : "bg-indigo-100 text-indigo-600"
                          }`}
                        >
                          {lesson.completed ? "✓" : index + 1}
                        </div>
                        <span className="font-medium">{lesson.title}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{lesson.duration}</span>
                        {lesson.type === "video" && "🎬"}
                        {lesson.type === "quiz" && "🧠"}
                        {lesson.type === "assignment" && "📝"}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 space-y-4"
            >
              <button
                onClick={() => setActiveTab("questions")}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-2xl text-left hover:shadow-lg transition-all duration-200"
              >
                <div className="text-2xl mb-2">🤖</div>
                <h3 className="font-semibold">Ask AI Tutor</h3>
                <p className="text-sm opacity-90">
                  Get instant help with concepts
                </p>
              </button>

              <button
                onClick={() => setActiveTab("notes")}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-4 rounded-2xl text-left hover:shadow-lg transition-all duration-200"
              >
                <div className="text-2xl mb-2">📝</div>
                <h3 className="font-semibold">My Notes</h3>
                <p className="text-sm opacity-90">{notes.length} notes saved</p>
              </button>
            </motion.div>
          </motion.div>

          {/* Main Content Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Navigation Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="flex border-b border-gray-200">
                {[
                  { id: "content", label: "Lesson Content", icon: "📚" },
                  { id: "notes", label: "Notes", icon: "📝" },
                  { id: "questions", label: "AI Tutor", icon: "🤖" },
                  { id: "resources", label: "Resources", icon: "📁" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium transition-colors duration-200 ${
                      activeTab === tab.id
                        ? "border-indigo-600 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === "content" && activeLesson && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">
                            {activeLesson.title}
                          </h2>
                          <p className="text-gray-600">
                            {activeLesson.duration} • {activeLesson.type}
                          </p>
                        </div>
                        {!activeLesson.completed && (
                          <button
                            onClick={() => completeLesson(activeLesson.id)}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
                          >
                            Mark Complete
                          </button>
                        )}
                      </div>

                      {/* Video Player Placeholder */}
                      {activeLesson.type === "video" && (
                        <div className="bg-black rounded-2xl aspect-video flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="text-6xl mb-4">🎬</div>
                            <p className="text-xl">Video Player</p>
                            <p className="text-gray-400">
                              Lesson content would play here
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Lesson Content */}
                      <div className="prose max-w-none">
                        <h3>Lesson Overview</h3>
                        <p>
                          This lesson covers fundamental concepts that build
                          upon previous knowledge. Pay close attention to the
                          examples provided.
                        </p>

                        <h4>Key Concepts</h4>
                        <ul>
                          <li>Understanding the core principles</li>
                          <li>Practical applications</li>
                          <li>Common mistakes to avoid</li>
                          <li>Practice exercises</li>
                        </ul>

                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                          <strong>💡 Pro Tip:</strong> Take notes as you go
                          through this lesson. The AI tutor can help clarify any
                          confusing points.
                        </div>
                      </div>

                      {/* Quick Note Taking */}
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="font-semibold mb-4">Quick Note</h3>
                        <div className="flex space-x-3">
                          <input
                            type="text"
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Add a note about this lesson..."
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                          <button
                            onClick={addNote}
                            disabled={!newNote.trim()}
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                          >
                            Add Note
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "notes" && (
                    <motion.div
                      key="notes"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold text-gray-900">
                        My Notes
                      </h2>

                      {notes.length === 0 ? (
                        <div className="text-center py-12">
                          <div className="text-6xl mb-4">📝</div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            No notes yet
                          </h3>
                          <p className="text-gray-600">
                            Start taking notes to track your learning journey
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {notes.map((note) => (
                            <motion.div
                              key={note.id}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-shadow duration-200"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-500">
                                  {new Date(
                                    note.timestamp
                                  ).toLocaleDateString()}
                                </span>
                                <div className="flex space-x-1">
                                  {note.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-800">{note.content}</p>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === "questions" && (
                    <motion.div
                      key="questions"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold text-gray-900">
                        AI Tutor
                      </h2>
                      <p className="text-gray-600">
                        Ask questions about the course content and get instant
                        AI-powered answers.
                      </p>

                      {/* AI Chat Interface */}
                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6">
                        <div className="flex items-center space-x-3 mb-6">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl">
                            🤖
                          </div>
                          <div>
                            <h3 className="font-semibold">
                              Brainwave AI Tutor
                            </h3>
                            <p className="text-sm text-gray-600">
                              Ready to help you learn!
                            </p>
                          </div>
                        </div>

                        {/* Questions List */}
                        <div className="space-y-4 max-h-96 overflow-y-auto mb-6">
                          {aiQuestions.map((q) => (
                            <div key={q.id} className="space-y-3">
                              <div className="bg-white rounded-2xl p-4 ml-8 shadow-sm">
                                <p className="text-gray-900">{q.question}</p>
                                <span className="text-xs text-gray-500">
                                  {q.timestamp.toLocaleTimeString()}
                                </span>
                              </div>
                              {q.answer && (
                                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-4 mr-8 shadow-sm">
                                  <p>{q.answer}</p>
                                  <span className="text-xs text-green-200">
                                    AI Tutor •{" "}
                                    {q.timestamp.toLocaleTimeString()}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}

                          {isAiThinking && (
                            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-4 mr-8 shadow-sm">
                              <div className="flex space-x-2">
                                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                                <div
                                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                ></div>
                                <div
                                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Input Area */}
                        <div className="flex space-x-3">
                          <input
                            type="text"
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && askAI()}
                            placeholder="Ask a question about the course..."
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                          <button
                            onClick={askAI}
                            disabled={!newQuestion.trim() || isAiThinking}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                          >
                            Ask AI
                          </button>
                        </div>
                      </div>

                      {/* Suggested Questions */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          "Explain the main concept of this lesson",
                          "Give me an example of this in practice",
                          "What's the most common mistake students make?",
                          "How does this relate to previous lessons?",
                        ].map((question, index) => (
                          <button
                            key={index}
                            onClick={() => setNewQuestion(question)}
                            className="p-4 border border-gray-200 rounded-2xl text-left hover:border-indigo-300 hover:bg-indigo-50 transition-colors duration-200"
                          >
                            <p className="text-sm text-gray-700">{question}</p>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "resources" && (
                    <motion.div
                      key="resources"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold text-gray-900">
                        Course Resources
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                          {
                            icon: "📄",
                            title: "Formula Sheet",
                            description: "All important formulas",
                            downloads: 124,
                          },
                          {
                            icon: "📚",
                            title: "Textbook PDF",
                            description: "Complete course textbook",
                            downloads: 89,
                          },
                          {
                            icon: "🎬",
                            title: "Video Library",
                            description: "Additional explanations",
                            downloads: 67,
                          },
                          {
                            icon: "📝",
                            title: "Practice Problems",
                            description: "Extra exercises",
                            downloads: 203,
                          },
                          {
                            icon: "🔍",
                            title: "Case Studies",
                            description: "Real-world applications",
                            downloads: 56,
                          },
                          {
                            icon: "📊",
                            title: "Cheat Sheets",
                            description: "Quick reference guides",
                            downloads: 178,
                          },
                        ].map((resource, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-md transition-all duration-200"
                          >
                            <div className="text-4xl mb-3">{resource.icon}</div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                              {resource.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">
                              {resource.description}
                            </p>
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors duration-200">
                              Download
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
