"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

interface Course {
  id: string;
  title: string;
  subject: string;
  gradeLevel: string;
  description: string;
  startDate: string;
  endDate: string;
  schedule: string;
  maxStudents: number;
  currentStudents: number;
  isPublic: boolean;
  status: "active" | "archived" | "draft";
}

interface Student {
  id: string;
  name: string;
  email: string;
  progress: number;
  lastActive: string;
  assignmentsCompleted: number;
  totalAssignments: number;
}

const mockCourse: Course = {
  id: "1",
  title: "Advanced Algebra",
  subject: "Mathematics",
  gradeLevel: "Grade 10-12",
  description:
    "Master advanced algebraic concepts including quadratic equations, polynomials, functions, and complex numbers.",
  startDate: "2024-01-10",
  endDate: "2024-06-15",
  schedule: "Mon/Wed/Fri 9:00-10:30 AM",
  maxStudents: 30,
  currentStudents: 24,
  isPublic: true,
  status: "active",
};

const mockStudents: Student[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@student.edu",
    progress: 85,
    lastActive: "2 hours ago",
    assignmentsCompleted: 8,
    totalAssignments: 10,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@student.edu",
    progress: 92,
    lastActive: "1 day ago",
    assignmentsCompleted: 9,
    totalAssignments: 10,
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.b@student.edu",
    progress: 78,
    lastActive: "3 hours ago",
    assignmentsCompleted: 7,
    totalAssignments: 10,
  },
];

export default function ManageCoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [activeTab, setActiveTab] = useState<
    "overview" | "students" | "content" | "settings"
  >("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Course | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourse(mockCourse);
      setEditData(mockCourse);
      setStudents(mockStudents);
    }, 500);
  }, [courseId]);

  const handleSave = () => {
    if (!editData) return;

    setCourse(editData);
    setIsEditing(false);
    // In real app, would make API call here
  };

  const handleCancel = () => {
    setEditData(course);
    setIsEditing(false);
  };

  if (!course || !editData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center"
      >
        <div>
          <div className="flex items-center space-x-2 text-gray-600 mb-2">
            <button
              onClick={() => router.push("/portals/teacher/courses")}
              className="hover:text-gray-900"
            >
              ← Back to Courses
            </button>
            <span>•</span>
            <span>{course.subject}</span>
          </div>
          {isEditing ? (
            <input
              type="text"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
              className="text-3xl font-bold text-gray-900 bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          ) : (
            <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
          )}
          <p className="text-gray-600 mt-2">{course.gradeLevel}</p>
        </div>

        <div className="flex space-x-3 mt-4 lg:mt-0">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Edit Course
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                Export Data
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleCancel}
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200"
      >
        <div className="flex border-b border-gray-200">
          {[
            { id: "overview", label: "Overview", icon: "📊" },
            { id: "students", label: "Students", icon: "👥" },
            { id: "content", label: "Content", icon: "📚" },
            { id: "settings", label: "Settings", icon: "⚙️" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {course.currentStudents}/{course.maxStudents}
                    </div>
                    <div className="text-blue-800 font-medium">
                      Students Enrolled
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      78%
                    </div>
                    <div className="text-green-800 font-medium">
                      Average Progress
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-6">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      12
                    </div>
                    <div className="text-purple-800 font-medium">
                      Active Assignments
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Course Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Schedule:</span>
                        <span className="font-medium">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editData.schedule}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  schedule: e.target.value,
                                })
                              }
                              className="border rounded px-2 py-1"
                            />
                          ) : (
                            course.schedule
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">
                          {course.startDate} to {course.endDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            course.status === "active"
                              ? "bg-green-100 text-green-800"
                              : course.status === "archived"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {course.status.charAt(0).toUpperCase() +
                            course.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Course Description
                    </h3>
                    {isEditing ? (
                      <textarea
                        value={editData.description}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            description: e.target.value,
                          })
                        }
                        rows={4}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-gray-700">{course.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "students" && (
              <motion.div
                key="students"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Enrolled Students
                  </h3>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                    Add Students
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Progress
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Assignments
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Active
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {students.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium text-gray-900">
                                {student.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {student.email}
                              </div>
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
                            {student.assignmentsCompleted}/
                            {student.totalAssignments}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {student.lastActive}
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                              View Profile
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === "content" && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Course Content
                  </h3>
                  <div className="flex space-x-3">
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                      + Add Module
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
                      + Add Assignment
                    </button>
                  </div>
                </div>

                {/* Course Modules */}
                <div className="space-y-4">
                  {[1, 2, 3].map((module) => (
                    <div
                      key={module}
                      className="bg-white border border-gray-200 rounded-2xl p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">
                          Module {module}: Algebraic Foundations
                        </h4>
                        <button className="text-gray-400 hover:text-gray-600">
                          ⋮
                        </button>
                      </div>

                      <div className="space-y-3">
                        {[1, 2, 3].map((lesson) => (
                          <div
                            key={lesson}
                            className="flex items-center justify-between p-3 border border-gray-100 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-gray-600">{lesson}</span>
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">
                                  Lesson {lesson}: Introduction to Variables
                                </div>
                                <div className="text-sm text-gray-600">
                                  Video • 15 min
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                                Edit
                              </button>
                              <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  Course Settings
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Maximum Students
                      </label>
                      <input
                        type="number"
                        value={editData.maxStudents}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            maxStudents: parseInt(e.target.value),
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={editData.isPublic}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            isPublic: e.target.checked,
                          })
                        }
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <label className="text-sm font-medium text-gray-700">
                        Publicly visible to students
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Status
                      </label>
                      <select
                        value={editData.status}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            status: e.target.value as any,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={editData.startDate}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            startDate: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={editData.endDate}
                        onChange={(e) =>
                          setEditData({ ...editData, endDate: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-800 mb-2">Danger Zone</h4>
                  <p className="text-red-700 text-sm mb-3">
                    Once you delete a course, there is no going back. Please be
                    certain.
                  </p>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200">
                    Delete Course
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
