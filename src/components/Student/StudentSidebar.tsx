"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SidebarItem {
  name: string;
  href: string;
  icon: string;
  badge?: number;
}

interface StudentSidebarProps {
  isOpen: boolean;
}

const sidebarItems: SidebarItem[] = [
  { name: "Dashboard", href: "/portals/student", icon: "📊" },
  { name: "My Courses", href: "/portals/student/courses", icon: "📚", badge: 3 },
  { name: "Assignments", href: "/portals/student/assignments", icon: "📝", badge: 2 },
  // { name: "Quizzes", href: "/portals/student/quizzes", icon: "🧠", badge: 1 },
  { name: "Progress", href: "/portals/student/progress", icon: "📈" },
  { name: "AI Tutor", href: "/portals/student/ai-tutor", icon: "🤖" },
  { name: "Resources", href: "/portals/student/resources", icon: "📁" },
  { name: "Messages", href: "/portals/student/messages", icon: "💬", badge: 5 },
  { name: "Settings", href: "/portals/student/settings", icon: "⚙️" },
];

export default function StudentSidebar({ isOpen }: StudentSidebarProps) {
  const pathname = usePathname();
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const sidebarVariants = {
    open: {
      width: 256,
      transition: { duration: 0.5 }, 
    },
    closed: {
      width: 0,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }, 
    },
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
      },
    },
  };
 
  return (
    <>
      <motion.div
        variants={sidebarVariants}
        initial="open"
        animate={isOpen ? "open" : "closed"}
        className="fixed lg:relative z-40 h-full bg-white shadow-xl border-r border-gray-200 overflow-hidden"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <motion.div
            variants={itemVariants}
            className="p-6 border-b border-gray-200"
          >
            <Link href="/student" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BA</span>
              </div>
              {isOpen && (
                <span className="text-xl font-bold text-gray-900">
                  Brainwave Academy
                </span>
              )}
            </Link>
          </motion.div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <motion.div key={item.name} variants={itemVariants}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span className="text-lg mr-3">{item.icon}</span>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="whitespace-nowrap overflow-hidden"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {item.badge && isOpen && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* User Profile Section */}
          <motion.div
            variants={itemVariants}
            className="p-4 border-t border-gray-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">S</span>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="flex-1 min-w-0"
                  >
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Student Name
                    </p>
                    <p className="text-xs text-gray-500 truncate">Grade 10</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => {}}
          />
        )}
      </AnimatePresence>
    </>
  );
}
