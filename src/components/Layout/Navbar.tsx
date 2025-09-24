"use client";

import { useState } from "react";
import Button from "../UI/Button";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                BA
              </div>
              <span className="ml-3 text-xl font-bold text-gray-800">
                Brainwave Academy
              </span>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <a
                href="#"
                className="text-indigo-600 border-indigo-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200"
              >
                Home
              </a>
              <a
                href="#features"
                className="text-gray-500 hover:text-indigo-600 border-transparent hover:border-indigo-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200"
              >
                Features
              </a>
              <a
                href="/about"
                className="text-gray-500 hover:text-indigo-600 border-transparent hover:border-indigo-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-500 hover:text-indigo-600 border-transparent hover:border-indigo-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a href="/auth/sign-in" className="">
              <Button variant="outline" className="rounded-full">
                Login
              </Button>
            </a>
            <a href="/auth/sign-up" className="">
              {" "}
              <Button className="rounded-full">Sign Up</Button>
            </a>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-xl rounded-b-lg">
          <div className="pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="bg-indigo-50 text-indigo-600 border-indigo-500 block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="#features"
              className="border-transparent text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300 block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#about"
              className="border-transparent text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300 block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#contact"
              className="border-transparent text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300 block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200"
            >
              Contact
            </a>
            <div className="mt-4 pt-4 border-t border-gray-200 px-4 space-y-2">
              <Link
                href="/auth/sign-in"
                className="w-full rounded-full bg-white text-black border border-gray-300 px-4 py-2 text-center hover:bg-gray-100 transition"
              >
                Login
              </Link>

              <Link
                href="/auth/sign-up"
                className="w-full rounded-full bg-black text-white px-4 py-2 text-center hover:bg-gray-800 transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
