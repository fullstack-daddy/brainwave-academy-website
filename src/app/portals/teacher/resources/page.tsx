"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Resource {
  id: string;
  title: string;
  type: "pdf" | "video" | "document" | "link" | "presentation";
  course: string;
  uploadDate: string;
  size: string;
  downloads: number;
  description: string;
  tags: string[];
}

const mockResources: Resource[] = [
  {
    id: "1",
    title: "Algebra Formula Sheet",
    type: "pdf",
    course: "Advanced Algebra",
    uploadDate: "2024-01-10",
    size: "2.4 MB",
    downloads: 124,
    description: "Comprehensive formula sheet covering all algebraic concepts",
    tags: ["formulas", "reference", "cheat-sheet"],
  },
  {
    id: "2",
    title: "Calculus Video Lectures",
    type: "video",
    course: "Calculus I",
    uploadDate: "2024-01-08",
    size: "156 MB",
    downloads: 89,
    description: "Complete video series covering calculus fundamentals",
    tags: ["videos", "lectures", "tutorials"],
  },
  {
    id: "3",
    title: "Geometry Lesson Plans",
    type: "document",
    course: "Geometry Basics",
    uploadDate: "2024-01-05",
    size: "1.8 MB",
    downloads: 67,
    description: "Weekly lesson plans and activity guides",
    tags: ["lesson-plans", "activities", "guides"],
  },
  {
    id: "4",
    title: "Interactive Math Tools",
    type: "link",
    course: "All Courses",
    uploadDate: "2024-01-12",
    size: "-",
    downloads: 203,
    description: "Collection of online interactive mathematics tools",
    tags: ["interactive", "tools", "online"],
  },
  {
    id: "5",
    title: "Statistics Presentation",
    type: "presentation",
    course: "Probability & Statistics",
    uploadDate: "2024-01-15",
    size: "4.2 MB",
    downloads: 45,
    description: "Slide deck for introductory statistics concepts",
    tags: ["slides", "lecture", "visuals"],
  },
];

export default function ResourcesPage() {
  const [filter, setFilter] = useState<
    "all" | "pdf" | "video" | "document" | "link" | "presentation"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const filteredResources = mockResources.filter(
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
      case "document":
        return "📝";
      case "link":
        return "🔗";
      case "presentation":
        return "📊";
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
      case "document":
        return "bg-green-100 text-green-800";
      case "link":
        return "bg-purple-100 text-purple-800";
      case "presentation":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      alert("Resource uploaded successfully!");
    }, 2000);
  };

  const handleDownload = (resource: Resource) => {
    // Simulate download
    alert(`Downloading: ${resource.title}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
            Teaching Resources
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and share educational materials
          </p>
        </div>

        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors duration-200 mt-4 sm:mt-0"
        >
          {isUploading ? "Uploading..." : "+ Upload Resource"}
        </button>
      </motion.div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Resources",
            value: mockResources.length,
            color: "from-gray-500 to-gray-600",
            icon: "📚",
          },
          {
            label: "PDF Files",
            value: mockResources.filter((r) => r.type === "pdf").length,
            color: "from-red-500 to-pink-500",
            icon: "📄",
          },
          {
            label: "Videos",
            value: mockResources.filter((r) => r.type === "video").length,
            color: "from-blue-500 to-cyan-500",
            icon: "🎬",
          },
          {
            label: "Total Downloads",
            value: mockResources.reduce((sum, r) => sum + r.downloads, 0),
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

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-wrap gap-2">
            {[
              { value: "all", label: "All Types" },
              { value: "pdf", label: "PDF" },
              { value: "video", label: "Video" },
              { value: "document", label: "Document" },
              { value: "link", label: "Link" },
              { value: "presentation", label: "Presentation" },
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
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
      </motion.div>

      {/* Resources Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredResources.length > 0 ? (
          filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
                      resource.type
                    )}`}
                  >
                    <span className="mr-2">{getTypeIcon(resource.type)}</span>
                    {resource.type.toUpperCase()}
                  </div>
                  <span className="text-sm text-gray-500">{resource.size}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-indigo-600">
                    {resource.course}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(resource.uploadDate)}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {resource.downloads} download
                    {resource.downloads !== 1 ? "s" : ""}
                  </span>
                  <button
                    onClick={() => handleDownload(resource)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium"
                  >
                    Download
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No resources found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
