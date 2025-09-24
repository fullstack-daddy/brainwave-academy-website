"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

interface Question {
  id: string;
  type: "multiple_choice" | "true_false" | "short_answer" | "essay";
  question: string;
  points: number;
  options?: string[];
  correctAnswer?: number | string;
  explanation?: string;
}

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: "not_started" | "in_progress" | "submitted" | "graded";
  points: number;
  description: string;
  type: "assignment" | "quiz";
  duration?: number;
  questions?: Question[];
  instructions: string;
  allowedAttempts: number;
  currentAttempt: number;
  timeLimit?: number;
  showResults: boolean;
}

interface Answer {
  questionId: string;
  answer: string | number;
  isCorrect?: boolean;
}

// Mock data
const mockAssignment: Assignment = {
  id: "1",
  title: "Algebra Basics Quiz",
  course: "Mathematics - Algebra",
  dueDate: "2024-01-20T23:59:00",
  status: "not_started",
  points: 100,
  description:
    "Test your understanding of basic algebraic concepts and operations.",
  type: "quiz",
  duration: 30,
  instructions:
    "This quiz consists of multiple choice and true/false questions. You have 30 minutes to complete it. Once started, the timer cannot be paused.",
  allowedAttempts: 3,
  currentAttempt: 1,
  timeLimit: 1800, // 30 minutes in seconds
  showResults: true,
  questions: [
    {
      id: "1",
      type: "multiple_choice",
      question: "What is the solution to the equation: 2x + 5 = 15?",
      points: 10,
      options: ["x = 5", "x = 10", "x = 7.5", "x = 6"],
      correctAnswer: 0,
      explanation:
        "Subtract 5 from both sides: 2x = 10, then divide by 2: x = 5",
    },
    {
      id: "2",
      type: "true_false",
      question: "The equation x² = 9 has only one solution.",
      points: 10,
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "x² = 9 has two solutions: x = 3 and x = -3",
    },
    {
      id: "3",
      type: "multiple_choice",
      question: "Which of the following is a linear equation?",
      points: 15,
      options: ["x² + 2x + 1 = 0", "2x - 3 = 7", "y = x²", "x³ = 8"],
      correctAnswer: 1,
      explanation: "A linear equation has the highest power of 1",
    },
    {
      id: "4",
      type: "short_answer",
      question: "Solve for y: 3y - 7 = 14",
      points: 20,
      correctAnswer: "7",
      explanation: "Add 7 to both sides: 3y = 21, then divide by 3: y = 7",
    },
    {
      id: "5",
      type: "essay",
      question:
        "Explain the difference between an expression and an equation. Provide examples of each.",
      points: 45,
      explanation:
        "An expression is a combination of numbers and variables without an equals sign (e.g., 2x + 3). An equation has an equals sign and shows equality (e.g., 2x + 3 = 7).",
    },
  ],
};

export default function AssignmentPage() {
  const params = useParams();
  const router = useRouter();
  const assignmentId = params.assignmentId as string;

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [viewMode, setViewMode] = useState<"instructions" | "quiz" | "results">(
    "instructions"
  );

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAssignment(mockAssignment);
      setTimeLeft(mockAssignment.timeLimit || 0);
    }, 500);
  }, [assignmentId]);

  useEffect(() => {
    if (viewMode === "quiz" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [viewMode, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswer = (questionId: string, answer: string | number) => {
    setAnswers((prev) => {
      const existingAnswer = prev.find((a) => a.questionId === questionId);
      if (existingAnswer) {
        return prev.map((a) =>
          a.questionId === questionId ? { ...a, answer } : a
        );
      }
      return [...prev, { questionId, answer }];
    });
  };

  const handleStart = () => {
    setViewMode("quiz");
    setAssignment((prev) =>
      prev ? { ...prev, status: "in_progress" as const } : null
    );
  };

  const handleAutoSubmit = () => {
    if (!assignment) return;

    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      const gradedAnswers = answers.map((answer) => {
        const question = assignment.questions?.find(
          (q) => q.id === answer.questionId
        );
        return {
          ...answer,
          isCorrect:
            question?.correctAnswer !== undefined &&
            answer.answer.toString() === question.correctAnswer.toString(),
        };
      });

      setAnswers(gradedAnswers);
      setShowResults(true);
      setViewMode("results");
      setIsSubmitting(false);

      setAssignment((prev) =>
        prev
          ? {
              ...prev,
              status: "graded" as const,
              currentAttempt: prev.currentAttempt + 1,
            }
          : null
      );
    }, 2000);
  };

  const handleSubmit = () => {
    if (
      !assignment ||
      !window.confirm(
        "Are you sure you want to submit? You cannot change answers after submission."
      )
    ) {
      return;
    }

    handleAutoSubmit();
  };

  const calculateScore = () => {
    if (!assignment?.questions) return 0;

    const totalPoints = assignment.questions.reduce(
      (sum, q) => sum + q.points,
      0
    );
    const earnedPoints = answers.reduce((sum, answer) => {
      if (answer.isCorrect) {
        const question = assignment.questions?.find(
          (q) => q.id === answer.questionId
        );
        return sum + (question?.points || 0);
      }
      return sum;
    }, 0);

    return Math.round((earnedPoints / totalPoints) * 100);
  };

  const getProgress = () => {
    if (!assignment?.questions) return 0;
    return (answers.length / assignment.questions.length) * 100;
  };

  if (!assignment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assignment...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b border-gray-200"
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-2"
              >
                <span>←</span>
                <span>Back to Assignments</span>
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {assignment.title}
              </h1>
              <p className="text-gray-600">{assignment.course}</p>
            </div>

            {viewMode === "quiz" && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                <div className="text-red-600 font-semibold text-lg">
                  Time Left: {formatTime(timeLeft)}
                </div>
                <div className="text-red-500 text-sm">
                  Auto-submits when time expires
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {viewMode === "instructions" && (
            <motion.div
              key="instructions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
            >
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🧠</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Quiz Instructions
                </h2>
                <p className="text-gray-600">
                  Please read the instructions carefully before starting
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Quiz Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Points:</span>
                      <span className="font-semibold">{assignment.points}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time Limit:</span>
                      <span className="font-semibold">
                        {assignment.duration} minutes
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Questions:</span>
                      <span className="font-semibold">
                        {assignment.questions?.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Attempts:</span>
                      <span className="font-semibold">
                        {assignment.currentAttempt}/{assignment.allowedAttempts}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Due Date:</span>
                      <span className="font-semibold">
                        {new Date(assignment.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Instructions
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {assignment.instructions}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Important Notes
                </h4>
                <ul className="text-blue-800 space-y-1">
                  <li>• You cannot pause the timer once started</li>
                  <li>• Answers are auto-saved as you progress</li>
                  <li>• Use the navigation to move between questions</li>
                  <li>• Review your answers before submitting</li>
                </ul>
              </div>

              <div className="text-center">
                <button
                  onClick={handleStart}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors duration-200"
                >
                  Start Quiz
                </button>
                <p className="text-gray-600 mt-2">
                  You have{" "}
                  {assignment.timeLimit && formatTime(assignment.timeLimit)} to
                  complete
                </p>
              </div>
            </motion.div>
          )}

          {viewMode === "quiz" && assignment.questions && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200"
            >
              {/* Progress Bar */}
              <div className="border-b border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Question {currentQuestion + 1} of{" "}
                    {assignment.questions.length}
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {Math.round(getProgress())}% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgress()}%` }}
                  ></div>
                </div>
              </div>

              <div className="p-6">
                {/* Question Navigation */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {assignment.questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      className={`w-10 h-10 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                        index === currentQuestion
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : answers.find(
                              (a) =>
                                a.questionId === assignment.questions![index].id
                            )
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-gray-100 text-gray-700 border-gray-200"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                {/* Current Question */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Question {currentQuestion + 1}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {assignment.questions[currentQuestion].points} points
                    </span>
                  </div>

                  <p className="text-gray-800 text-lg mb-6">
                    {assignment.questions[currentQuestion].question}
                  </p>

                  {/* Answer Options */}
                  <div className="space-y-3">
                    {assignment.questions[currentQuestion].options?.map(
                      (option, index) => (
                        <label
                          key={index}
                          className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-indigo-300 cursor-pointer transition-colors duration-200"
                        >
                          <input
                            type={
                              assignment.questions![currentQuestion].type ===
                              "multiple_choice"
                                ? "radio"
                                : "checkbox"
                            }
                            name={`question-${assignment.questions![currentQuestion].id}`}
                            checked={
                              answers.find(
                                (a) =>
                                  a.questionId ===
                                  assignment.questions![currentQuestion].id
                              )?.answer === index.toString()
                            }
                            onChange={() =>
                              handleAnswer(
                                assignment.questions![currentQuestion].id,
                                index.toString()
                              )
                            }
                            className="text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      )
                    )}

                    {assignment.questions[currentQuestion].type ===
                      "short_answer" && (
                      <textarea
                        value={
                          (answers.find(
                            (a) =>
                              a.questionId ===
                              assignment.questions![currentQuestion].id
                          )?.answer as string) || ""
                        }
                        onChange={(e) =>
                          handleAnswer(
                            assignment.questions![currentQuestion].id,
                            e.target.value
                          )
                        }
                        placeholder="Type your answer here..."
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        rows={3}
                      />
                    )}

                    {assignment.questions[currentQuestion].type === "essay" && (
                      <textarea
                        value={
                          (answers.find(
                            (a) =>
                              a.questionId ===
                              assignment.questions![currentQuestion].id
                          )?.answer as string) || ""
                        }
                        onChange={(e) =>
                          handleAnswer(
                            assignment.questions![currentQuestion].id,
                            e.target.value
                          )
                        }
                        placeholder="Write your essay answer here..."
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        rows={8}
                      />
                    )}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() =>
                      setCurrentQuestion((prev) => Math.max(0, prev - 1))
                    }
                    disabled={currentQuestion === 0}
                    className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Previous
                  </button>

                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">
                      {answers.length}/{assignment.questions.length} questions
                      answered
                    </span>

                    {currentQuestion === assignment.questions.length - 1 ? (
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors duration-200"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Quiz"}
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          setCurrentQuestion((prev) =>
                            Math.min(assignment.questions!.length - 1, prev + 1)
                          )
                        }
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                      >
                        Next Question
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {viewMode === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
            >
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Quiz Submitted!
                </h2>
                <p className="text-gray-600">Your results are ready</p>
              </div>

              {/* Score Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {calculateScore()}%
                  </div>
                  <div className="text-green-800 font-medium">
                    Overall Score
                  </div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {answers.filter((a) => a.isCorrect).length}/
                    {assignment.questions?.length}
                  </div>
                  <div className="text-blue-800 font-medium">
                    Correct Answers
                  </div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {assignment.currentAttempt}/{assignment.allowedAttempts}
                  </div>
                  <div className="text-purple-800 font-medium">
                    Attempt Used
                  </div>
                </div>
              </div>

              {/* Detailed Results */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Question Review
                </h3>
                <div className="space-y-4">
                  {assignment.questions?.map((question, index) => {
                    const answer = answers.find(
                      (a) => a.questionId === question.id
                    );
                    return (
                      <div
                        key={question.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium text-gray-900">
                            Question {index + 1}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              answer?.isCorrect
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {answer?.isCorrect ? "Correct" : "Incorrect"} •{" "}
                            {question.points} pts
                          </span>
                        </div>

                        <p className="text-gray-700 mb-3">
                          {question.question}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-600">
                              Your Answer:
                            </span>
                            <p className="text-gray-900 mt-1">
                              {answer
                                ? question.options
                                  ? question.options[
                                      parseInt(answer.answer as string)
                                    ]
                                  : answer.answer
                                : "No answer provided"}
                            </p>
                          </div>

                          {!answer?.isCorrect &&
                            question.correctAnswer !== undefined && (
                              <div>
                                <span className="font-medium text-gray-600">
                                  Correct Answer:
                                </span>
                                <p className="text-green-700 mt-1">
                                  {question.options
                                    ? question.options[
                                        question.correctAnswer as number
                                      ]
                                    : question.correctAnswer}
                                </p>
                              </div>
                            )}
                        </div>

                        {question.explanation && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <span className="font-medium text-blue-900">
                              Explanation:
                            </span>
                            <p className="text-blue-800 mt-1">
                              {question.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push("/portals/student/assignments")}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Back to Assignments
                </button>

                {assignment.currentAttempt < assignment.allowedAttempts && (
                  <button
                    onClick={() => {
                      setViewMode("instructions");
                      setCurrentQuestion(0);
                      setAnswers([]);
                      setTimeLeft(assignment.timeLimit || 0);
                    }}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    Try Again (
                    {assignment.allowedAttempts - assignment.currentAttempt}{" "}
                    attempts left)
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
