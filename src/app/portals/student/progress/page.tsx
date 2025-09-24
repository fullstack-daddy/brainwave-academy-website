"use client";

import { motion } from "framer-motion";

interface ProgressData {
  subject: string;
  currentGrade: number;
  improvement: number;
  completedLessons: number;
  totalLessons: number;
  trend: "up" | "down" | "stable";
}

const progressData: ProgressData[] = [
  {
    subject: "Mathematics",
    currentGrade: 85,
    improvement: 12,
    completedLessons: 18,
    totalLessons: 24,
    trend: "up",
  },
  {
    subject: "Science",
    currentGrade: 78,
    improvement: 5,
    completedLessons: 12,
    totalLessons: 20,
    trend: "up",
  },
  {
    subject: "English",
    currentGrade: 92,
    improvement: 8,
    completedLessons: 14,
    totalLessons: 16,
    trend: "up",
  },
  {
    subject: "History",
    currentGrade: 65,
    improvement: -3,
    completedLessons: 8,
    totalLessons: 28,
    trend: "down",
  },
];

export default function ProgressPage() {
  const overallProgress =
    progressData.reduce((acc, curr) => acc + curr.currentGrade, 0) /
    progressData.length;
  const totalCompleted = progressData.reduce(
    (acc, curr) => acc + curr.completedLessons,
    0
  );
  const totalLessons = progressData.reduce(
    (acc, curr) => acc + curr.totalLessons,
    0
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Learning Progress
          </h1>
          <p className="text-gray-600 mt-2">
            Track your academic journey and achievements
          </p>
        </div>

        <div className="flex space-x-3 mt-4 sm:mt-0">
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
            <option>This Month</option>
            <option>Last Month</option>
            <option>All Time</option>
          </select>
        </div>
      </motion.div>

      {/* Overall Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overall Grade</p>
              <p className="text-3xl font-bold text-gray-900">
                {overallProgress.toFixed(1)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">★</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Lessons Completed</p>
              <p className="text-3xl font-bold text-gray-900">
                {totalCompleted}/{totalLessons}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">✓</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                style={{ width: `${(totalCompleted / totalLessons) * 100}%` }}
              ></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Learning Streak</p>
              <p className="text-3xl font-bold text-gray-900">7 days</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">🔥</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Keep going!</p>
        </motion.div>
      </div>

      {/* Subject-wise Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Subject Progress
        </h2>
        <div className="space-y-6">
          {progressData.map((subject, index) => (
            <motion.div
              key={subject.subject}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                  {subject.subject.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {subject.subject}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {subject.completedLessons}/{subject.totalLessons} lessons
                    completed
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg font-bold text-gray-900">
                    {subject.currentGrade}%
                  </span>
                  <span
                    className={`flex items-center text-sm ${
                      subject.improvement >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {subject.improvement >= 0 ? "↑" : "↓"}{" "}
                    {Math.abs(subject.improvement)}%
                  </span>
                </div>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      subject.currentGrade >= 80
                        ? "bg-green-500"
                        : subject.currentGrade >= 60
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${subject.currentGrade}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Recent Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: "🏆",
              title: "Math Master",
              description: "Scored 90%+ in Algebra",
            },
            {
              icon: "🚀",
              title: "Fast Learner",
              description: "Completed 5 lessons in a day",
            },
            {
              icon: "💪",
              title: "Consistent",
              description: "7-day learning streak",
            },
            {
              icon: "🌟",
              title: "Top Performer",
              description: "Ranked #1 in class",
            },
          ].map((achievement, index) => (
            <motion.div
              key={achievement.title}
              whileHover={{ scale: 1.05 }}
              className="text-center p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors duration-200"
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <h3 className="font-semibold text-gray-900">
                {achievement.title}
              </h3>
              <p className="text-sm text-gray-600">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
