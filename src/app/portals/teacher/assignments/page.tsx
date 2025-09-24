"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: "draft" | "published" | "grading" | "completed";
  points: number;
  submissions: number;
  totalStudents: number;
  averageScore?: number;
  type: "homework" | "project" | "essay";
}

const assignments: Assignment[] = [
  {
    id: "1",
    title: "Quadratic Equations Problem Set",
    course: "Advanced Algebra",
    dueDate: "2024-01-15T23:59:00",
    status: "grading",
    points: 100,
    submissions: 18,
    totalStudents: 24,
    averageScore: 76,
    type: "homework",
  },
  {
    id: "2",
    title: "Functions Analysis Project",
    course: "Calculus I",
    dueDate: "2024-01-20T23:59:00",
    status: "published",
    points: 150,
    submissions: 8,
    totalStudents: 18,
    type: "project",
  },
  {
    id: "3",
    title: "Geometry Proofs Essay",
    course: "Geometry Basics",
    dueDate: "2024-01-25T23:59:00",
    status: "draft",
    points: 200,
    submissions: 0,
    totalStudents: 32,
    type: "essay",
  },
  {
    id: "4",
    title: "Linear Equations Practice",
    course: "Advanced Algebra",
    dueDate: "2024-01-10T23:59:00",
    status: "completed",
    points: 50,
    submissions: 24,
    totalStudents: 24,
    averageScore: 88,
    type: "homework",
  },
];

export default function AssignmentsPage() {
  const [filter, setFilter] = useState<
    "all" | "draft" | "published" | "grading" | "completed"
  >("all");

  const filteredAssignments = assignments.filter(
    (assignment) => filter === "all" || assignment.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "published":
        return "bg-blue-100 text-blue-800";
      case "grading":
        return "bg-orange-100 text-orange-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "homework":
        return "📝";
      case "project":
        return "📁";
      case "essay":
        return "📄";
      default:
        return "📋";
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
          <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
          <p className="text-gray-600 mt-2">
            Create and manage student assignments
          </p>
        </div>

        <Link
          href="/portals/teacher/assignments/new"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 mt-4 sm:mt-0"
        >
          + Create New Assignment
        </Link>
      </motion.div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Assignments",
            value: assignments.length,
            color: "from-gray-500 to-gray-600",
            icon: "📝",
          },
          {
            label: "Need Grading",
            value: assignments.filter((a) => a.status === "grading").length,
            color: "from-orange-500 to-red-500",
            icon: "⏰",
          },
          {
            label: "Published",
            value: assignments.filter((a) => a.status === "published").length,
            color: "from-blue-500 to-cyan-500",
            icon: "📤",
          },
          {
            label: "Avg Submission",
            value: `${Math.round(
              assignments.reduce(
                (sum, a) => sum + (a.submissions / a.totalStudents) * 100,
                0
              ) / assignments.length
            )}%`,
            color: "from-green-500 to-emerald-500",
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

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex space-x-2">
            {[
              { value: "all", label: "All Assignments" },
              { value: "draft", label: "Draft" },
              { value: "published", label: "Published" },
              { value: "grading", label: "Grading" },
              { value: "completed", label: "Completed" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  filter === tab.value
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Assignments List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Your Assignments
          </h2>

          {filteredAssignments.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No assignments found
              </h3>
              <p className="text-gray-600">
                Create your first assignment to get started
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAssignments.map((assignment, index) => (
                <motion.div
                  key={assignment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="text-2xl">
                      {getTypeIcon(assignment.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {assignment.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            assignment.status
                          )}`}
                        >
                          {assignment.status.charAt(0).toUpperCase() +
                            assignment.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {assignment.course}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>
                          Due:{" "}
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span>{assignment.points} points</span>
                        <span>•</span>
                        <span>
                          {assignment.submissions}/{assignment.totalStudents}{" "}
                          submitted
                        </span>
                        {assignment.averageScore && (
                          <>
                            <span>•</span>
                            <span className="font-medium text-green-600">
                              Avg: {assignment.averageScore}%
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {assignment.status === "grading" && (
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
                        {assignment.totalStudents - assignment.submissions} to
                        grade
                      </span>
                    )}
                    <Link
                      href={`/portals/teacher/assignments/${assignment.id}`}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors duration-200"
                    >
                      {assignment.status === "draft"
                        ? "Edit"
                        : assignment.status === "grading"
                        ? "Grade"
                        : assignment.status === "published"
                        ? "View"
                        : "Results"}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
