"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Student {
  id: string;
  name: string;
  email: string;
  courses: string[];
  joinDate: string;
  lastActive: string;
  progress: number;
  assignmentsCompleted: number;
  totalAssignments: number;
  averageScore: number;
  status: "active" | "inactive" | "at-risk";
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@student.edu",
    courses: ["Advanced Algebra", "Physics"],
    joinDate: "2024-01-10",
    lastActive: "2 hours ago",
    progress: 85,
    assignmentsCompleted: 24,
    totalAssignments: 28,
    averageScore: 88,
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@student.edu",
    courses: ["Advanced Algebra", "Calculus I"],
    joinDate: "2024-01-12",
    lastActive: "1 day ago",
    progress: 92,
    assignmentsCompleted: 26,
    totalAssignments: 28,
    averageScore: 94,
    status: "active",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.b@student.edu",
    courses: ["Geometry Basics"],
    joinDate: "2024-01-08",
    lastActive: "3 days ago",
    progress: 65,
    assignmentsCompleted: 18,
    totalAssignments: 28,
    averageScore: 72,
    status: "at-risk",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@student.edu",
    courses: ["Advanced Algebra", "Geometry Basics"],
    joinDate: "2024-01-15",
    lastActive: "1 week ago",
    progress: 45,
    assignmentsCompleted: 12,
    totalAssignments: 28,
    averageScore: 68,
    status: "inactive",
  },
];

export default function StudentsPage() {
  const [filter, setFilter] = useState<
    "all" | "active" | "inactive" | "at-risk"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filteredStudents = mockStudents.filter(
    (student) =>
      (filter === "all" || student.status === filter) &&
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "at-risk":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return "✅";
      case "inactive":
        return "⏸️";
      case "at-risk":
        return "⚠️";
      default:
        return "❓";
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
            Student Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and monitor student progress
          </p>
        </div>

        <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 mt-4 sm:mt-0">
          + Add Student
        </button>
      </motion.div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Students",
            value: mockStudents.length,
            color: "from-gray-500 to-gray-600",
            icon: "👥",
          },
          {
            label: "Active",
            value: mockStudents.filter((s) => s.status === "active").length,
            color: "from-green-500 to-emerald-500",
            icon: "✅",
          },
          {
            label: "At Risk",
            value: mockStudents.filter((s) => s.status === "at-risk").length,
            color: "from-red-500 to-orange-500",
            icon: "⚠️",
          },
          {
            label: "Avg Progress",
            value: `${Math.round(
              mockStudents.reduce((sum, s) => sum + s.progress, 0) /
                mockStudents.length
            )}%`,
            color: "from-blue-500 to-cyan-500",
            icon: "📊",
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

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex space-x-2">
            {[
              { value: "all", label: "All Students" },
              { value: "active", label: "Active" },
              { value: "at-risk", label: "At Risk" },
              { value: "inactive", label: "Inactive" },
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

          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
      </motion.div>

      {/* Students Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Student Roster</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Courses
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignments
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {student.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {student.email}
                      </div>
                      <div className="text-xs text-gray-400">
                        Joined:{" "}
                        {new Date(student.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {student.courses.map((course) => (
                        <span
                          key={course}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {student.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {student.assignmentsCompleted}/{student.totalAssignments}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-medium ${
                        student.averageScore >= 90
                          ? "text-green-600"
                          : student.averageScore >= 80
                          ? "text-blue-600"
                          : student.averageScore >= 70
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {student.averageScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        student.status
                      )}`}
                    >
                      {getStatusIcon(student.status)}{" "}
                      {student.status.charAt(0).toUpperCase() +
                        student.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                        Message
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No students found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </motion.div>

      {/* Bulk Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-blue-50 border border-blue-200 rounded-2xl p-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Bulk Actions</h3>
            <p className="text-blue-700">Manage multiple students at once</p>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <button className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
              Export List
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Send Message to All
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
