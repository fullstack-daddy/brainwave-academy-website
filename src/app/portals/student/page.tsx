"use client";

import { motion } from "framer-motion";

interface CourseCard {
  title: string;
  progress: number;
  instructor: string;
  nextLesson: string;
  icon: string;
  color: string;
}

const courses: CourseCard[] = [
  {
    title: "Mathematics - Algebra",
    progress: 75,
    instructor: "Dr. Sarah Chen",
    nextLesson: "Quadratic Equations",
    icon: "∫",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Science - Biology",
    progress: 45,
    instructor: "Prof. Michael Rodriguez",
    nextLesson: "Cell Structure",
    icon: "🔬",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "English Literature",
    progress: 60,
    instructor: "Ms. Emily Watson",
    nextLesson: "Shakespeare Analysis",
    icon: "📖",
    color: "from-purple-500 to-pink-500",
  },
];

const upcomingAssignments = [
  {
    title: "Math Problem Set",
    due: "Tomorrow",
    course: "Algebra",
    priority: "high",
  },
  {
    title: "Science Lab Report",
    due: "In 3 days",
    course: "Biology",
    priority: "medium",
  },
  {
    title: "Book Review",
    due: "Next week",
    course: "Literature",
    priority: "low",
  },
];

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome back, Student! 👋</h1>
        <p className="text-indigo-100">
          Continue your learning journey where you left off
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-sm opacity-90">Courses Enrolled</p>
            <p className="text-2xl font-bold">5</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-sm opacity-90">Completed Lessons</p>
            <p className="text-2xl font-bold">24</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-sm opacity-90">Current Streak</p>
            <p className="text-2xl font-bold">7 days</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Courses Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">My Courses</h2>
          <div className="space-y-4">
            {courses.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 rounded-lg border border-gray-100 hover:border-indigo-200 transition-colors duration-200"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${course.color} rounded-lg flex items-center justify-center text-white text-xl`}
                >
                  {course.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600">{course.instructor}</p>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Assignments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Upcoming Assignments
          </h2>
          <div className="space-y-3">
            {upcomingAssignments.map((assignment, index) => (
              <motion.div
                key={assignment.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <div>
                  <h3 className="font-medium text-gray-900">
                    {assignment.title}
                  </h3>
                  <p className="text-sm text-gray-600">{assignment.course}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      assignment.priority === "high"
                        ? "bg-red-100 text-red-800"
                        : assignment.priority === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {assignment.due}
                  </span>
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
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: "🤖",
              label: "AI Tutor",
              description: "Get help instantly",
            },
            { icon: "📚", label: "Library", description: "Browse resources" },
            { icon: "📊", label: "Progress", description: "View analytics" },
            { icon: "🎯", label: "Goals", description: "Set targets" },
          ].map((action, index) => (
            <motion.button
              key={action.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 text-center"
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <div className="font-medium text-gray-900">{action.label}</div>
              <div className="text-sm text-gray-600">{action.description}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
