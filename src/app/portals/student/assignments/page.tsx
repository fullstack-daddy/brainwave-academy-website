// "use client";

// import { motion } from "framer-motion";
// import { useState } from "react";

// interface Assignment {
//   id: string;
//   title: string;
//   course: string;
//   dueDate: string;
//   status: "pending" | "submitted" | "graded";
//   points: number;
//   description: string;
//   attachments: number;
// }

// const assignments: Assignment[] = [
//   {
//     id: "1",
//     title: "Quadratic Equations Problem Set",
//     course: "Mathematics - Algebra",
//     dueDate: "2024-01-15",
//     status: "pending",
//     points: 100,
//     description:
//       "Solve 20 quadratic equations using different methods including factoring, quadratic formula, and completing the square.",
//     attachments: 3,
//   },
//   {
//     id: "2",
//     title: "Cell Biology Lab Report",
//     course: "Science - Biology",
//     dueDate: "2024-01-18",
//     status: "submitted",
//     points: 150,
//     description:
//       "Write a detailed lab report on the microscope observation of plant and animal cells.",
//     attachments: 2,
//   },
//   {
//     id: "3",
//     title: "Shakespeare Sonnet Analysis",
//     course: "English Literature",
//     dueDate: "2024-01-12",
//     status: "graded",
//     points: 85,
//     description:
//       "Analyze Shakespeare's Sonnet 18 and write a 500-word analysis.",
//     attachments: 1,
//   },
//   {
//     id: "4",
//     title: "Ancient Civilizations Essay",
//     course: "World History",
//     dueDate: "2024-01-20",
//     status: "pending",
//     points: 200,
//     description:
//       "Compare and contrast ancient Egyptian and Mesopotamian civilizations.",
//     attachments: 4,
//   },
// ];

// export default function AssignmentsPage() {
//   const [filter, setFilter] = useState<
//     "all" | "pending" | "submitted" | "graded"
//   >("all");

//   const filteredAssignments = assignments.filter(
//     (assignment) => filter === "all" || assignment.status === filter
//   );

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "submitted":
//         return "bg-blue-100 text-blue-800";
//       case "graded":
//         return "bg-green-100 text-green-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "pending":
//         return "⏰";
//       case "submitted":
//         return "📤";
//       case "graded":
//         return "✅";
//       default:
//         return "📝";
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
//       >
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
//           <p className="text-gray-600 mt-2">
//             Manage your coursework and submissions
//           </p>
//         </div>

//         <div className="flex space-x-3 mt-4 sm:mt-0">
//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value as any)}
//             className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//           >
//             <option value="all">All Assignments</option>
//             <option value="pending">Pending</option>
//             <option value="submitted">Submitted</option>
//             <option value="graded">Graded</option>
//           </select>
//         </div>
//       </motion.div>

//       {/* Assignment Statistics */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         {[
//           {
//             label: "Total",
//             value: assignments.length,
//             color: "from-gray-500 to-gray-600",
//             icon: "📚",
//           },
//           {
//             label: "Pending",
//             value: assignments.filter((a) => a.status === "pending").length,
//             color: "from-yellow-500 to-orange-500",
//             icon: "⏰",
//           },
//           {
//             label: "Submitted",
//             value: assignments.filter((a) => a.status === "submitted").length,
//             color: "from-blue-500 to-cyan-500",
//             icon: "📤",
//           },
//           {
//             label: "Graded",
//             value: assignments.filter((a) => a.status === "graded").length,
//             color: "from-green-500 to-emerald-500",
//             icon: "✅",
//           },
//         ].map((stat, index) => (
//           <motion.div
//             key={stat.label}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">{stat.label}</p>
//                 <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//               </div>
//               <div
//                 className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center text-white text-xl`}
//               >
//                 {stat.icon}
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Assignments List */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//         className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
//       >
//         <div className="p-6">
//           <h2 className="text-xl font-bold text-gray-900 mb-4">
//             Your Assignments
//           </h2>

//           {filteredAssignments.length === 0 ? (
//             <div className="text-center py-8">
//               <div className="text-6xl mb-4">🎉</div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 No assignments found
//               </h3>
//               <p className="text-gray-600">You're all caught up!</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {filteredAssignments.map((assignment, index) => (
//                 <motion.div
//                   key={assignment.id}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200"
//                 >
//                   <div className="flex items-center space-x-4 flex-1">
//                     <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
//                       {getStatusIcon(assignment.status)}
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="font-semibold text-gray-900">
//                         {assignment.title}
//                       </h3>
//                       <p className="text-sm text-gray-600">
//                         {assignment.course}
//                       </p>
//                       <p className="text-sm text-gray-500 mt-1">
//                         {assignment.description}
//                       </p>
//                       <div className="flex items-center space-x-4 mt-2">
//                         <span className="text-xs text-gray-500">
//                           Due:{" "}
//                           {new Date(assignment.dueDate).toLocaleDateString()}
//                         </span>
//                         <span className="text-xs text-gray-500">
//                           {assignment.attachments} attachment
//                           {assignment.attachments !== 1 ? "s" : ""}
//                         </span>
//                         <span className="text-xs font-medium text-gray-700">
//                           {assignment.points} points
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-center space-x-3">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
//                         assignment.status
//                       )}`}
//                     >
//                       {assignment.status.charAt(0).toUpperCase() +
//                         assignment.status.slice(1)}
//                     </span>
//                     <button
//                       className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
//                         assignment.status === "pending"
//                           ? "bg-indigo-600 text-white hover:bg-indigo-700"
//                           : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                       }`}
//                     >
//                       {assignment.status === "pending"
//                         ? "Start"
//                         : assignment.status === "submitted"
//                         ? "View"
//                         : "Review"}
//                     </button>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// }


"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: "not_started" | "in_progress" | "submitted" | "graded";
  points: number;
  description: string;
  type: "assignment" | "quiz";
  duration?: number; // For quizzes
  questions?: number; // For quizzes
  attempts?: number; // For quizzes
  maxAttempts?: number; // For quizzes
  score?: number; // For graded items
}

const assignments: Assignment[] = [
  {
    id: "1",
    title: "Quadratic Equations Problem Set",
    course: "Mathematics - Algebra",
    dueDate: "2024-01-15T23:59:00",
    status: "not_started",
    points: 100,
    description:
      "Solve 20 quadratic equations using different methods including factoring, quadratic formula, and completing the square.",
    type: "assignment",
  },
  {
    id: "2",
    title: "Algebra Basics Quiz",
    course: "Mathematics - Algebra",
    dueDate: "2024-01-20T23:59:00",
    status: "not_started",
    points: 50,
    description:
      "Test your understanding of basic algebraic concepts and operations.",
    type: "quiz",
    duration: 30,
    questions: 15,
    attempts: 0,
    maxAttempts: 3,
  },
  {
    id: "3",
    title: "Cell Biology Lab Report",
    course: "Science - Biology",
    dueDate: "2024-01-18T23:59:00",
    status: "in_progress",
    points: 150,
    description:
      "Write a detailed lab report on the microscope observation of plant and animal cells.",
    type: "assignment",
  },
  {
    id: "4",
    title: "Shakespeare Sonnet Analysis",
    course: "English Literature",
    dueDate: "2024-01-12T23:59:00",
    status: "graded",
    points: 85,
    description:
      "Analyze Shakespeare's Sonnet 18 and write a 500-word analysis.",
    type: "assignment",
    score: 76,
  },
  {
    id: "5",
    title: "Biology Chapter 1 Quiz",
    course: "Science - Biology",
    dueDate: "2024-01-25T23:59:00",
    status: "graded",
    points: 100,
    description:
      "Quiz covering cell structure, organelles, and basic biological concepts.",
    type: "quiz",
    duration: 45,
    questions: 20,
    attempts: 1,
    maxAttempts: 2,
    score: 88,
  },
];

export default function AssignmentsPage() {
  const [filter, setFilter] = useState<"all" | "assignment" | "quiz">("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "not_started" | "in_progress" | "submitted" | "graded"
  >("all");

  const filteredAssignments = assignments.filter(
    (item) =>
      (filter === "all" || item.type === filter) &&
      (statusFilter === "all" || item.status === statusFilter)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "not_started":
        return "bg-gray-100 text-gray-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "graded":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "not_started":
        return "⏰";
      case "in_progress":
        return "📝";
      case "submitted":
        return "📤";
      case "graded":
        return "✅";
      default:
        return "📋";
    }
  };

  const getTimeRemaining = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diff = due.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days < 0) return { text: "Overdue", color: "text-red-600" };
    if (days === 0) return { text: "Due today", color: "text-orange-600" };
    if (days === 1) return { text: "Due tomorrow", color: "text-orange-600" };
    if (days <= 7)
      return { text: `Due in ${days} days`, color: "text-yellow-600" };
    return { text: `Due in ${days} days`, color: "text-gray-600" };
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
            Assignments & Quizzes
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your coursework and assessments
          </p>
        </div>
      </motion.div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total",
            value: assignments.length,
            color: "from-gray-500 to-gray-600",
            icon: "📚",
          },
          {
            label: "Pending",
            value: assignments.filter((a) => a.status === "not_started").length,
            color: "from-yellow-500 to-orange-500",
            icon: "⏰",
          },
          {
            label: "In Progress",
            value: assignments.filter((a) => a.status === "in_progress").length,
            color: "from-blue-500 to-cyan-500",
            icon: "📝",
          },
          {
            label: "Graded",
            value: assignments.filter((a) => a.status === "graded").length,
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
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="assignment">Assignments</option>
            <option value="quiz">Quizzes</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="submitted">Submitted</option>
            <option value="graded">Graded</option>
          </select>
        </div>
      </motion.div>

      {/* Assignments List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {filteredAssignments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No assignments found
            </h3>
            <p className="text-gray-600">You're all caught up!</p>
          </div>
        ) : (
          filteredAssignments.map((assignment, index) => (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          assignment.status
                        )}`}
                      >
                        {assignment.type === "quiz"
                          ? "🧠 Quiz"
                          : "📝 Assignment"}
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          getTimeRemaining(assignment.dueDate).color
                        }`}
                      >
                        {getTimeRemaining(assignment.dueDate).text}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {assignment.title}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {assignment.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span>{assignment.course}</span>
                      <span>•</span>
                      <span>{assignment.points} points</span>
                      {assignment.type === "quiz" && (
                        <>
                          <span>•</span>
                          <span>{assignment.duration} minutes</span>
                          <span>•</span>
                          <span>{assignment.questions} questions</span>
                          <span>•</span>
                          <span>
                            {assignment.attempts}/{assignment.maxAttempts}{" "}
                            attempts
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col items-end gap-3">
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <span>{getStatusIcon(assignment.status)}</span>
                        <span className="font-medium text-gray-900 capitalize">
                          {assignment.status.replace("_", " ")}
                        </span>
                      </div>
                      {assignment.score !== undefined && (
                        <div className="text-lg font-bold text-green-600">
                          Score: {assignment.score}%
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/student/assignments/${assignment.id}`}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 whitespace-nowrap"
                    >
                      {assignment.status === "not_started"
                        ? "Start"
                        : assignment.status === "in_progress"
                        ? "Continue"
                        : assignment.status === "submitted"
                        ? "View Submission"
                        : "View Results"}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}