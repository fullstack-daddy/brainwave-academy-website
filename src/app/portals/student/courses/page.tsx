"use client";

import { motion } from "framer-motion";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  progress: number;
  duration: string;
  lessons: number;
  image: string;
  category: string;
  level: string;
}

const courses: Course[] = [
  {
    id: "1",
    title: "Advanced Algebra",
    description:
      "Master quadratic equations, polynomials, and complex algebraic concepts",
    instructor: "Dr. Sarah Chen",
    progress: 75,
    duration: "12 weeks",
    lessons: 24,
    image: "∫",
    category: "Mathematics",
    level: "Intermediate",
  },
  {
    id: "2",
    title: "Cell Biology",
    description:
      "Explore the fascinating world of cells, DNA, and cellular processes",
    instructor: "Prof. Michael Rodriguez",
    progress: 45,
    duration: "10 weeks",
    lessons: 20,
    image: "🔬",
    category: "Science",
    level: "Beginner",
  },
  {
    id: "3",
    title: "Shakespeare Literature",
    description:
      "Dive into the works of William Shakespeare and Elizabethan drama",
    instructor: "Ms. Emily Watson",
    progress: 60,
    duration: "8 weeks",
    lessons: 16,
    image: "📖",
    category: "English",
    level: "Advanced",
  },
  {
    id: "4",
    title: "World History",
    description: "Journey through ancient civilizations to modern world events",
    instructor: "Dr. James Wilson",
    progress: 30,
    duration: "14 weeks",
    lessons: 28,
    image: "🌍",
    category: "History",
    level: "Intermediate",
  },
];

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600 mt-2">Continue your learning journey</p>
        </div>

        <div className="flex space-x-3 mt-4 sm:mt-0">
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
            <option>All Categories</option>
            <option>Mathematics</option>
            <option>Science</option>
            <option>English</option>
            <option>History</option>
          </select>

          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
            + New Course
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-xl">
                  {course.image}
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    course.level === "Beginner"
                      ? "bg-green-100 text-green-800"
                      : course.level === "Intermediate"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {course.level}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {course.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{course.duration}</span>
                <span>{course.lessons} lessons</span>
              </div>

              <div className="mb-4">
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

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  By {course.instructor}
                </span>
                <a href='/portals/student/courses/1' className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors duration-200">
                  Continue
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State for New Courses */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center py-12"
      >
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Explore More Courses
        </h3>
        <p className="text-gray-600 mb-4">
          Discover new subjects and expand your knowledge
        </p>
        <button className="bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors duration-200">
          Browse Course Catalog
        </button>
      </motion.div>
    </div>
  );
}
