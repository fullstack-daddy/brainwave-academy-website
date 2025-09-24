"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  students: number;
  progress: number;
  recentActivity: string;
  nextAssignment?: string;
}

interface PendingItem {
  id: string;
  type: "assignment" | "quiz" | "message";
  title: string;
  course: string;
  dueDate?: string;
  students: number;
  submitted: number;
}

const courses: Course[] = [
  {
    id: "1",
    title: "Advanced Algebra",
    students: 24,
    progress: 75,
    recentActivity: "2 new submissions",
    nextAssignment: "Problem Set #3",
  },
  {
    id: "2",
    title: "Calculus I",
    students: 18,
    progress: 60,
    recentActivity: "Quiz graded",
    nextAssignment: "Chapter 4 Test",
  },
  {
    id: "3",
    title: "Geometry Basics",
    students: 32,
    progress: 45,
    recentActivity: "5 students joined",
    nextAssignment: "Geometry Proofs",
  },
];

const pendingItems: PendingItem[] = [
  {
    id: "1",
    type: "assignment",
    title: "Quadratic Equations Problem Set",
    course: "Advanced Algebra",
    dueDate: "2024-01-15",
    students: 24,
    submitted: 18,
  },
  {
    id: "2",
    type: "quiz",
    title: "Chapter 3 Quiz",
    course: "Calculus I",
    dueDate: "2024-01-18",
    students: 18,
    submitted: 12,
  },
  {
    id: "3",
    type: "message",
    title: "Student Questions",
    course: "Geometry Basics",
    students: 5,
    submitted: 5,
  },
];

export default function TeacherDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, Dr. Chen! 👋
            </h1>
            <p className="text-blue-100 text-lg">
              Here's what's happening with your classes today
            </p>
          </div>
          <div className="flex space-x-3 mt-4 lg:mt-0">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200">
              Create New
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200">
              View Schedule
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          {[
            { label: "Total Students", value: "74", icon: "👥" },
            { label: "Active Courses", value: "3", icon: "📚" },
            { label: "Pending Grading", value: "12", icon: "📝" },
            { label: "Unread Messages", value: "8", icon: "💬" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 rounded-xl p-4 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="text-2xl">{stat.icon}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
            <Link
              href="/portals/teacher/courses"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-indigo-200 hover:bg-indigo-50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                    <span className="font-bold">M</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {course.students} students • {course.recentActivity}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {course.progress}%
                      </span>
                    </div>
                  </div>
                </div>
                <Link
                  href={`/portals/teacher/courses/${course.id}`}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors duration-200"
                >
                  Manage
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pending Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Pending Actions</h2>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              {pendingItems.length} items
            </span>
          </div>

          <div className="space-y-4">
            {pendingItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border border-gray-100 rounded-lg hover:border-indigo-200 transition-colors duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span
                      className={`p-2 rounded-lg ${
                        item.type === "assignment"
                          ? "bg-blue-100 text-blue-600"
                          : item.type === "quiz"
                          ? "bg-green-100 text-green-600"
                          : "bg-purple-100 text-purple-600"
                      }`}
                    >
                      {item.type === "assignment"
                        ? "📝"
                        : item.type === "quiz"
                        ? "🧠"
                        : "💬"}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">{item.course}</p>
                    </div>
                  </div>
                  {item.dueDate && (
                    <span className="text-sm text-gray-500">
                      Due: {new Date(item.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>
                      {item.submitted}/{item.students} submitted
                    </span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.type === "assignment"
                            ? "bg-blue-500"
                            : item.type === "quiz"
                            ? "bg-green-500"
                            : "bg-purple-500"
                        }`}
                        style={{
                          width: `${(item.submitted / item.students) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <button className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700 transition-colors duration-200">
                    {item.type === "message" ? "Respond" : "Grade"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: "📝",
              label: "Create Assignment",
              description: "New homework or project",
              href: "/portals/teacher/assignments/new",
            },
            {
              icon: "🧠",
              label: "Create Quiz",
              description: "Assessment or test",
              href: "/portals/teacher/quizzes/new",
            },
            {
              icon: "📚",
              label: "Add Course",
              description: "New class or subject",
              href: "/portals/teacher/courses/new",
            },
            {
              icon: "📊",
              label: "View Analytics",
              description: "Student performance",
              href: "/portals/teacher/analytics",
            },
          ].map((action, index) => (
            <motion.div
              key={action.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-center p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200"
            >
              <Link href={action.href} className="block">
                <div className="text-3xl mb-2">{action.icon}</div>
                <div className="font-semibold text-gray-900 mb-1">
                  {action.label}
                </div>
                <div className="text-sm text-gray-600">
                  {action.description}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
