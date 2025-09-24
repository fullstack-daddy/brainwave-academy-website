"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  subject: string;
  gradeLevel: string;
  students: number;
  status: "active" | "archived" | "draft";
  progress: number;
  lastActivity: string;
  assignments: number;
  quizzes: number;
}

const courses: Course[] = [
  {
    id: "1",
    title: "Advanced Algebra",
    subject: "Mathematics",
    gradeLevel: "Grade 10-12",
    students: 24,
    status: "active",
    progress: 75,
    lastActivity: "2 hours ago",
    assignments: 8,
    quizzes: 4,
  },
  {
    id: "2",
    title: "Calculus I",
    subject: "Mathematics",
    gradeLevel: "Grade 11-12",
    students: 18,
    status: "active",
    progress: 60,
    lastActivity: "1 day ago",
    assignments: 6,
    quizzes: 3,
  },
  {
    id: "3",
    title: "Geometry Basics",
    subject: "Mathematics",
    gradeLevel: "Grade 9-10",
    students: 32,
    status: "active",
    progress: 45,
    lastActivity: "3 days ago",
    assignments: 4,
    quizzes: 2,
  },
  {
    id: "4",
    title: "Advanced Calculus",
    subject: "Mathematics",
    gradeLevel: "Grade 12",
    students: 0,
    status: "draft",
    progress: 0,
    lastActivity: "Not started",
    assignments: 0,
    quizzes: 0,
  },
];

export default function CoursesPage() {
  const [filter, setFilter] = useState<"all" | "active" | "archived" | "draft">(
    "all"
  );

  const filteredCourses = courses.filter(
    (course) => filter === "all" || course.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
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
          <h1 className="text-3xl font-bold text-gray-900">
            Course Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your courses and teaching materials
          </p>
        </div>

        <Link
          href="/portals/teacher/courses/new"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 mt-4 sm:mt-0"
        >
          + Create New Course
        </Link>
      </motion.div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Courses",
            value: courses.length,
            color: "from-gray-500 to-gray-600",
            icon: "📚",
          },
          {
            label: "Active Students",
            value: courses.reduce((sum, course) => sum + course.students, 0),
            color: "from-green-500 to-emerald-500",
            icon: "👥",
          },
          {
            label: "Assignments",
            value: courses.reduce((sum, course) => sum + course.assignments, 0),
            color: "from-blue-500 to-cyan-500",
            icon: "📝",
          },
          {
            label: "Average Progress",
            value: `${Math.round(
              courses.reduce((sum, course) => sum + course.progress, 0) /
                courses.length
            )}%`,
            color: "from-purple-500 to-pink-500",
            icon: "📈",
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
              { value: "all", label: "All Courses" },
              { value: "active", label: "Active" },
              { value: "draft", label: "Draft" },
              { value: "archived", label: "Archived" },
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

          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Search courses..."
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
      </motion.div>

      {/* Courses Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    course.status
                  )}`}
                >
                  {course.status.charAt(0).toUpperCase() +
                    course.status.slice(1)}
                </span>
                <div className="text-2xl">📊</div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {course.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {course.subject} • {course.gradeLevel}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Students</span>
                  <span>{course.students} enrolled</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progress</span>
                  <span>{course.progress}% complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{course.assignments} assignments</span>
                <span>{course.quizzes} quizzes</span>
              </div>

              <div className="flex space-x-3">
                <Link
                  href={`/portals/teacher/courses/${course.id}`}
                  className="flex-1 bg-indigo-600 text-white text-center py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Manage
                </Link>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  ⋮
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredCourses.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-200"
        >
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No courses found
          </h3>
          <p className="text-gray-600 mb-4">
            Create your first course to get started
          </p>
          <Link
            href="/portals/teacher/courses/new"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Create New Course
          </Link>
        </motion.div>
      )}
    </div>
  );
}
