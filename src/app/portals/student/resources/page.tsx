"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Resource {
  id: string;
  title: string;
  type: "pdf" | "video" | "link" | "document";
  course: string;
  size: string;
  uploadDate: string;
  description: string;
  downloads: number;
}

const resources: Resource[] = [
  {
    id: "1",
    title: "Algebra Formula Sheet",
    type: "pdf",
    course: "Mathematics - Algebra",
    size: "2.4 MB",
    uploadDate: "2024-01-10",
    description: "Comprehensive formula sheet covering all algebraic concepts",
    downloads: 124,
  },
  {
    id: "2",
    title: "Cell Biology Video Lecture",
    type: "video",
    course: "Science - Biology",
    size: "156 MB",
    uploadDate: "2024-01-08",
    description: "Detailed video explanation of cell structure and functions",
    downloads: 89,
  },
  {
    id: "3",
    title: "Shakespeare Study Guide",
    type: "document",
    course: "English Literature",
    size: "1.8 MB",
    uploadDate: "2024-01-05",
    description: "Complete study guide for Shakespeare's major works",
    downloads: 67,
  },
  {
    id: "4",
    title: "Ancient Civilizations Timeline",
    type: "link",
    course: "World History",
    size: "-",
    uploadDate: "2024-01-12",
    description: "Interactive timeline of ancient civilizations",
    downloads: 203,
  },
  {
    id: "5",
    title: "Problem Solving Techniques",
    type: "pdf",
    course: "Mathematics - Algebra",
    size: "3.1 MB",
    uploadDate: "2024-01-15",
    description: "Advanced problem solving strategies and examples",
    downloads: 56,
  },
];

export default function ResourcesPage() {
  const [filter, setFilter] = useState<
    "all" | "pdf" | "video" | "link" | "document"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResources = resources.filter(
    (resource) =>
      (filter === "all" || resource.type === filter) &&
      resource.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return "📄";
      case "video":
        return "🎬";
      case "link":
        return "🔗";
      case "document":
        return "📝";
      default:
        return "📁";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "pdf":
        return "bg-red-100 text-red-800";
      case "video":
        return "bg-blue-100 text-blue-800";
      case "link":
        return "bg-green-100 text-green-800";
      case "document":
        return "bg-purple-100 text-purple-800";
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
            Learning Resources
          </h1>
          <p className="text-gray-600 mt-2">
            Access study materials, guides, and supplementary content
          </p>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="pdf">PDF</option>
            <option value="video">Video</option>
            <option value="link">Link</option>
            <option value="document">Document</option>
          </select>
        </div>
      </motion.div>

      {/* Resource Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Resources",
            value: resources.length,
            color: "from-gray-500 to-gray-600",
            icon: "📚",
          },
          {
            label: "PDF Files",
            value: resources.filter((r) => r.type === "pdf").length,
            color: "from-red-500 to-pink-500",
            icon: "📄",
          },
          {
            label: "Videos",
            value: resources.filter((r) => r.type === "video").length,
            color: "from-blue-500 to-cyan-500",
            icon: "🎬",
          },
          {
            label: "Total Downloads",
            value: resources.reduce((acc, r) => acc + r.downloads, 0),
            color: "from-green-500 to-emerald-500",
            icon: "⬇️",
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

      {/* Resources Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Available Resources
          </h2>

          {filteredResources.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No resources found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-2xl">
                        {getTypeIcon(resource.type)}
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                          resource.type
                        )}`}
                      >
                        {resource.type.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {resource.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>{resource.size}</span>
                      <span>{resource.downloads} downloads</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {resource.course}
                      </span>
                      <button className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-indigo-700 transition-colors duration-200">
                        Download
                      </button>
                    </div>
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
