"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface StudentGrade {
  id: string;
  name: string;
  assignments: {
    id: string;
    title: string;
    score: number;
    maxScore: number;
    status: "graded" | "missing" | "submitted";
  }[];
  average: number;
}

const mockGrades: StudentGrade[] = [
  {
    id: "1",
    name: "John Smith",
    average: 85,
    assignments: [
      {
        id: "1",
        title: "Algebra Basics",
        score: 92,
        maxScore: 100,
        status: "graded",
      },
      {
        id: "2",
        title: "Quadratic Equations",
        score: 78,
        maxScore: 100,
        status: "graded",
      },
      {
        id: "3",
        title: "Functions Project",
        score: 0,
        maxScore: 150,
        status: "missing",
      },
      {
        id: "4",
        title: "Chapter 1 Quiz",
        score: 88,
        maxScore: 100,
        status: "graded",
      },
    ],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    average: 92,
    assignments: [
      {
        id: "1",
        title: "Algebra Basics",
        score: 98,
        maxScore: 100,
        status: "graded",
      },
      {
        id: "2",
        title: "Quadratic Equations",
        score: 95,
        maxScore: 100,
        status: "graded",
      },
      {
        id: "3",
        title: "Functions Project",
        score: 142,
        maxScore: 150,
        status: "graded",
      },
      {
        id: "4",
        title: "Chapter 1 Quiz",
        score: 94,
        maxScore: 100,
        status: "graded",
      },
    ],
  },
];

export default function GradebookPage() {
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const courses = [
    { id: "all", name: "All Courses" },
    { id: "1", name: "Advanced Algebra" },
    { id: "2", name: "Calculus I" },
    { id: "3", name: "Geometry Basics" },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gradebook</h1>
          <p className="text-gray-600 mt-2">
            Track student performance and grades
          </p>
        </div>

        <div className="flex space-x-3 mt-4 sm:mt-0">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
          >
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>

          <div className="flex border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 ${
                viewMode === "grid"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 ${
                viewMode === "list"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600"
              }`}
            >
              List
            </button>
          </div>
        </div>
      </motion.div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Students",
            value: "24",
            color: "from-blue-500 to-cyan-500",
            icon: "👥",
          },
          {
            label: "Class Average",
            value: "84%",
            color: "from-green-500 to-emerald-500",
            icon: "📊",
          },
          {
            label: "Assignments",
            value: "12",
            color: "from-purple-500 to-pink-500",
            icon: "📝",
          },
          {
            label: "Completion",
            value: "92%",
            color: "from-orange-500 to-red-500",
            icon: "✅",
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

      {/* Gradebook Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Student Grades</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average
                </th>
                {mockGrades[0]?.assignments.map((assignment) => (
                  <th
                    key={assignment.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {assignment.title}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockGrades.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {student.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`text-lg font-bold ${
                        student.average >= 90
                          ? "text-green-600"
                          : student.average >= 80
                          ? "text-blue-600"
                          : student.average >= 70
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {student.average}%
                    </div>
                  </td>
                  {student.assignments.map((assignment) => (
                    <td key={assignment.id} className="px-6 py-4">
                      <div
                        className={`text-sm font-medium ${
                          assignment.status === "missing"
                            ? "text-red-600"
                            : assignment.score >= 90
                            ? "text-green-600"
                            : assignment.score >= 80
                            ? "text-blue-600"
                            : assignment.score >= 70
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {assignment.status === "missing"
                          ? "Missing"
                          : `${assignment.score}/${assignment.maxScore}`}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className={`h-2 rounded-full ${
                            assignment.status === "missing"
                              ? "bg-red-500"
                              : assignment.score >= 90
                              ? "bg-green-500"
                              : assignment.score >= 80
                              ? "bg-blue-500"
                              : assignment.score >= 70
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{
                            width: `${
                              (assignment.score / assignment.maxScore) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </td>
                  ))}
                  <td className="px-6 py-4">
                    <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Export Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-blue-50 border border-blue-200 rounded-2xl p-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">
              Export Gradebook
            </h3>
            <p className="text-blue-700">
              Download grades in various formats for record keeping
            </p>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <button className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
              Export as CSV
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Export as PDF
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
