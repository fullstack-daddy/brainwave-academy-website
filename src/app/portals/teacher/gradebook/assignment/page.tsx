"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  submissions: number;
  totalStudents: number;
  averageScore?: number;
  status: "not_started" | "in_progress" | "completed";
}

interface Submission {
  id: string;
  studentName: string;
  studentId: string;
  submittedAt: string;
  status: "submitted" | "graded";
  score?: number;
  comments?: string;
}

const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "Quadratic Equations Problem Set",
    course: "Advanced Algebra",
    dueDate: "2024-01-15",
    submissions: 18,
    totalStudents: 24,
    averageScore: 76,
    status: "in_progress",
  },
  {
    id: "2",
    title: "Functions Analysis Project",
    course: "Calculus I",
    dueDate: "2024-01-20",
    submissions: 8,
    totalStudents: 18,
    status: "not_started",
  },
  {
    id: "3",
    title: "Geometry Proofs Essay",
    course: "Geometry Basics",
    dueDate: "2024-01-25",
    submissions: 24,
    totalStudents: 32,
    averageScore: 88,
    status: "completed",
  },
];

const mockSubmissions: Submission[] = [
  {
    id: "1",
    studentName: "John Smith",
    studentId: "S001",
    submittedAt: "2024-01-14 14:30",
    status: "graded",
    score: 85,
    comments: "Excellent work showing all steps clearly.",
  },
  {
    id: "2",
    studentName: "Sarah Johnson",
    studentId: "S002",
    submittedAt: "2024-01-14 16:45",
    status: "graded",
    score: 92,
    comments: "Outstanding solution with creative approach.",
  },
  {
    id: "3",
    studentName: "Michael Brown",
    studentId: "S003",
    submittedAt: "2024-01-15 09:15",
    status: "submitted",
  },
];

export default function GradeAssignmentsPage() {
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [gradingData, setGradingData] = useState<{
    [key: string]: { score: number; comments: string };
  }>({});

  const handleSelectAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setSubmissions(mockSubmissions); // In real app, fetch submissions for this assignment
  };

  const handleGradeSubmission = (
    submissionId: string,
    score: number,
    comments: string
  ) => {
    setGradingData((prev) => ({
      ...prev,
      [submissionId]: { score, comments },
    }));
  };

  const handleSubmitGrades = () => {
    // In real app, submit all grades to backend
    console.log("Submitting grades:", gradingData);
    alert("Grades submitted successfully!");
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Grade Assignments
          </h1>
          <p className="text-gray-600 mt-2">
            Review and grade student submissions
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assignments List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">
              Assignments to Grade
            </h2>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {mockAssignments.map((assignment, index) => (
              <motion.button
                key={assignment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleSelectAssignment(assignment)}
                className={`w-full text-left p-4 border-b border-gray-100 transition-colors duration-200 ${
                  selectedAssignment?.id === assignment.id
                    ? "bg-indigo-50 border-indigo-200"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">
                    {assignment.title}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      assignment.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : assignment.status === "in_progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {assignment.submissions}/{assignment.totalStudents}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{assignment.course}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Due: {new Date(assignment.dueDate).toLocaleDateString()}
                </p>
                {assignment.averageScore && (
                  <p className="text-xs text-green-600 mt-1">
                    Average: {assignment.averageScore}%
                  </p>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Grading Interface */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <AnimatePresence mode="wait">
            {!selectedAssignment ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center"
              >
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Select an Assignment
                </h3>
                <p className="text-gray-600">
                  Choose an assignment from the list to start grading
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="grading-interface"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200"
              >
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {selectedAssignment.title}
                      </h2>
                      <p className="text-gray-600">
                        {selectedAssignment.course}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        {
                          submissions.filter((s) => s.status === "graded")
                            .length
                        }
                        /{submissions.length} graded
                      </div>
                      <div className="text-lg font-bold text-green-600">
                        Avg: {selectedAssignment.averageScore || 0}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submissions List */}
                <div className="max-h-96 overflow-y-auto">
                  {submissions.map((submission, index) => (
                    <motion.div
                      key={submission.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 border-b border-gray-100"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {submission.studentName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            ID: {submission.studentId}
                          </p>
                          <p className="text-xs text-gray-500">
                            Submitted: {submission.submittedAt}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            submission.status === "graded"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {submission.status === "graded"
                            ? "Graded"
                            : "Pending"}
                        </span>
                      </div>

                      {/* Grading Form */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Score
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={
                              gradingData[submission.id]?.score ||
                              submission.score ||
                              ""
                            }
                            onChange={(e) =>
                              handleGradeSubmission(
                                submission.id,
                                parseInt(e.target.value) || 0,
                                gradingData[submission.id]?.comments || ""
                              )
                            }
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                            placeholder="0-100"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Comments
                          </label>
                          <textarea
                            value={
                              gradingData[submission.id]?.comments ||
                              submission.comments ||
                              ""
                            }
                            onChange={(e) =>
                              handleGradeSubmission(
                                submission.id,
                                gradingData[submission.id]?.score ||
                                  submission.score ||
                                  0,
                                e.target.value
                              )
                            }
                            rows={2}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                            placeholder="Provide feedback..."
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-end space-x-3 mt-4">
                        <button className="text-gray-600 hover:text-gray-900 text-sm">
                          View Submission
                        </button>
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700">
                          Save Grade
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bulk Actions */}
                <div className="p-6 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {Object.keys(gradingData).length} grades ready to submit
                    </span>
                    <button
                      onClick={handleSubmitGrades}
                      disabled={Object.keys(gradingData).length === 0}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit All Grades
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
