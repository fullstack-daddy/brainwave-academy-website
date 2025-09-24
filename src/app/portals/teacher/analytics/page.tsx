"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface AnalyticsData {
  course: string;
  students: number;
  averageScore: number;
  completionRate: number;
  engagement: number;
  assignments: number;
    trending: "up" | "down" | "stable";
}

const mockAnalytics: AnalyticsData[] = [
  {
    course: "Advanced Algebra",
    students: 24,
    averageScore: 84,
    completionRate: 78,
    engagement: 92,
    assignments: 8,
    trending: "up",
  },
  {
    course: "Calculus I",
    students: 18,
    averageScore: 79,
    completionRate: 65,
    engagement: 85,
    assignments: 6,
    trending: "stable",
  },
  {
    course: "Geometry Basics",
    students: 32,
    averageScore: 88,
    completionRate: 92,
    engagement: 94,
    assignments: 4,
    trending: "up",
  },
];

const engagementData = [
  { day: "Mon", active: 45, completed: 12 },
  { day: "Tue", active: 52, completed: 18 },
  { day: "Wed", active: 48, completed: 15 },
  { day: "Thu", active: 61, completed: 22 },
  { day: "Fri", active: 38, completed: 10 },
  { day: "Sat", active: 28, completed: 8 },
  { day: "Sun", active: 22, completed: 5 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "semester">(
    "week"
  );
  const [selectedCourse, setSelectedCourse] = useState("all");

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return "📈";
      case "down":
        return "📉";
      default:
        return "➡️";
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
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
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Track student performance and engagement metrics
          </p>
        </div>

        <div className="flex space-x-3 mt-4 sm:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="semester">This Semester</option>
          </select>

          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Courses</option>
            <option value="algebra">Advanced Algebra</option>
            <option value="calculus">Calculus I</option>
            <option value="geometry">Geometry Basics</option>
          </select>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Total Students",
            value: "74",
            change: "+5%",
            trend: "up",
            icon: "👥",
            color: "from-blue-500 to-cyan-500",
          },
          {
            label: "Avg Completion",
            value: "78%",
            change: "+12%",
            trend: "up",
            icon: "✅",
            color: "from-green-500 to-emerald-500",
          },
          {
            label: "Avg Score",
            value: "84%",
            change: "+3%",
            trend: "up",
            icon: "📊",
            color: "from-purple-500 to-pink-500",
          },
          {
            label: "Engagement",
            value: "90%",
            change: "+8%",
            trend: "up",
            icon: "🔥",
            color: "from-orange-500 to-red-500",
          },
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-lg flex items-center justify-center text-white text-xl`}
              >
                {metric.icon}
              </div>
              <span
                className={`flex items-center text-sm font-medium ${getTrendColor(
                  metric.trend
                )}`}
              >
                {metric.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {metric.value}
            </div>
            <div className="text-sm text-gray-600">{metric.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Course Performance
          </h3>
          <div className="space-y-4">
            {mockAnalytics.map((course, index) => (
              <div
                key={course.course}
                className="flex items-center justify-between p-3 border border-gray-100 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">
                      {course.course}
                    </span>
                    <span className="flex items-center text-sm font-medium text-gray-600">
                      {getTrendIcon(course.trending)} {course.averageScore}%
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                    <span>{course.students} students</span>
                    <span>{course.completionRate}% completed</span>
                    <span>{course.engagement}% engaged</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                      style={{ width: `${course.completionRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Engagement Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Weekly Engagement
          </h3>
          <div className="space-y-3">
            {engagementData.map((day, index) => (
              <div key={day.day} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 w-12">
                  {day.day}
                </span>
                <div className="flex-1 mx-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full"
                        style={{ width: `${(day.active / 70) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 w-8 text-right">
                      {day.active}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(day.completed / 25) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 w-8 text-right">
                      {day.completed}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-gray-600">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Active Students</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Completed Work</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Assignment Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Assignment Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Quadratic Equations",
              submissions: 18,
              average: 76,
              trending: "up",
            },
            {
              title: "Functions Analysis",
              submissions: 12,
              average: 82,
              trending: "stable",
            },
            {
              title: "Geometry Proofs",
              submissions: 24,
              average: 88,
              trending: "up",
            },
          ].map((assignment, index) => (
            <div
              key={assignment.title}
              className="border border-gray-200 rounded-lg p-4"
            >
              <h4 className="font-medium text-gray-900 mb-2">
                {assignment.title}
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Submissions:</span>
                  <span className="font-medium">
                    {assignment.submissions}/24
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Average Score:</span>
                  <span
                    className={`font-medium ${getTrendColor(
                      assignment.trending
                    )}`}
                  >
                    {assignment.average}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    style={{ width: `${(assignment.submissions / 24) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Student Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Top Performers</h3>
          <div className="space-y-3">
            {[
              { name: "Sarah Johnson", score: 98, course: "Advanced Algebra" },
              { name: "Michael Chen", score: 96, course: "Calculus I" },
              { name: "Emma Wilson", score: 95, course: "Geometry Basics" },
            ].map((student, index) => (
              <div
                key={student.name}
                className="flex items-center justify-between p-3 bg-white/10 rounded-lg"
              >
                <div>
                  <div className="font-medium">{student.name}</div>
                  <div className="text-indigo-200 text-sm">
                    {student.course}
                  </div>
                </div>
                <div className="text-2xl font-bold">{student.score}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Need Attention</h3>
          <div className="space-y-3">
            {[
              { name: "Alex Thompson", score: 62, course: "Advanced Algebra" },
              { name: "Jessica Brown", score: 58, course: "Calculus I" },
              { name: "David Lee", score: 65, course: "Geometry Basics" },
            ].map((student, index) => (
              <div
                key={student.name}
                className="flex items-center justify-between p-3 bg-white/10 rounded-lg"
              >
                <div>
                  <div className="font-medium">{student.name}</div>
                  <div className="text-red-200 text-sm">{student.course}</div>
                </div>
                <div className="text-2xl font-bold">{student.score}%</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
