"use client";

import { useState } from "react";
import TeacherSidebar from "@/components/Teacher/TeacherSidebar";
import TeacherNavbar from "@/components/Teacher/TeacherNavbar";

interface TeacherLayoutProps {
  children: React.ReactNode;
}

export default function TeacherLayout({ children }: TeacherLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      <TeacherSidebar isOpen={isSidebarOpen} />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "" : "ml-0"
        }`}
      >
        <TeacherNavbar
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
