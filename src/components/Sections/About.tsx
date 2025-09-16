"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-16 bg-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="lg:text-center"
        >
          <h2 className="text-base font-semibold tracking-wide uppercase text-indigo-600">
            About Us
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better future through education
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Brainwave Academy is an initiative by BrightFuture NGO to bridge the
            educational gap in underserved communities through technology.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Our Mission
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  To provide affordable, high-quality digital education with AI
                  support to students regardless of their geographical or
                  economic constraints.
                </p>
              </div>
              <div className="mt-3 text-sm">
                <a
                  href="/about"
                  className="font-medium text-indigo-600 hover:text-indigo-500 inline-flex items-center"
                >
                  Learn more about our vision
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
