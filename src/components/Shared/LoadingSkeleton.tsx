"use client";

import { motion } from "framer-motion";

export default function CourseLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-6 bg-indigo-500 rounded w-32"></div>
              <div className="h-12 bg-indigo-500 rounded w-3/4"></div>
              <div className="h-4 bg-indigo-500 rounded w-full"></div>
              <div className="h-4 bg-indigo-500 rounded w-2/3"></div>
              <div className="flex space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-6 bg-indigo-500 rounded w-20"></div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 space-y-4">
              <div className="h-32 bg-indigo-500 rounded"></div>
              <div className="h-10 bg-indigo-500 rounded"></div>
              <div className="h-10 bg-indigo-500 rounded"></div>
              <div className="h-4 bg-indigo-500 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 space-y-4">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl p-6 space-y-6">
              <div className="h-8 bg-gray-300 rounded w-1/2"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
