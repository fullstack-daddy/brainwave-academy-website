"use client";

import { motion } from "framer-motion";
import Button from "@/components/UI/Button";
import Navbar from "@/components/Layout/Navbar";


const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "Chief Education Officer",
    bio: "15+ years in educational technology and curriculum development. PhD in Learning Sciences from Stanford.",
    image: "/team/sarah-chen.jpg",
  },
  {
    name: "Michael Rodriguez",
    role: "Head of AI Research",
    bio: "Former Google AI researcher specializing in adaptive learning systems and natural language processing.",
    image: "/team/michael-rodriguez.jpg",
  },
  {
    name: "Aisha Johnson",
    role: "Product Design Lead",
    bio: "Award-winning UX designer with expertise in creating inclusive, accessible learning experiences.",
    image: "/team/aisha-johnson.jpg",
  },
  {
    name: "David Kim",
    role: "Engineering Director",
    bio: "Built scalable education platforms serving millions of students across emerging markets.",
    image: "/team/david-kim.jpg",
  },
];

const values = [
  {
    title: "Accessibility First",
    description:
      "We design for the most constrained environments first, ensuring our platform works everywhere.",
    icon: "🌍",
  },
  {
    title: "Evidence-Based Learning",
    description:
      "Every feature is grounded in educational research and learning science principles.",
    icon: "📚",
  },
  {
    title: "Student-Centered Design",
    description:
      "We prioritize the needs, contexts, and aspirations of the students we serve.",
    icon: "🎯",
  },
  {
    title: "Continuous Improvement",
    description:
      "We constantly iterate based on feedback and learning data to enhance outcomes.",
    icon: "🔄",
  },
];

const milestones = [
  {
    year: "2023",
    event: "Brainwave Academy concept born from BrightFuture NGO initiative",
  },
  {
    year: "2024 Q1",
    event: "First prototype developed and tested with 500 students",
  },
  {
    year: "2024 Q3",
    event: "AI tutoring system integrated into learning platform",
  },
  {
    year: "2025",
    event: "Platform launched across 3 regions, serving 10,000+ students",
  },
];

export default function About() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30">
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full">
            <div className="absolute inset-0 bg-gradient-to-l from-indigo-900 to-transparent z-10"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 -right-10 w-72 h-72 bg-purple-300 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-indigo-300 rounded-full filter blur-3xl"></div>
            </div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Our Mission to Transform Education
              </h1>
              <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
                Brainwave Academy was founded on a simple belief: every student
                deserves access to personalized, high-quality education
                regardless of their location or resources.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Brainwave Academy emerged from BrightFuture NGO's
                    decade-long work in underserved communities, where we
                    witnessed firsthand the educational barriers that students
                    face. Despite their potential and determination, limited
                    resources and overcrowded classrooms prevented them from
                    thriving.
                  </p>
                  <p>
                    In 2023, we assembled a team of educators, AI researchers,
                    and designers with a shared vision: to create an adaptive
                    learning platform that could provide personalized education
                    at scale. Our approach combines evidence-based pedagogy with
                    cutting-edge technology to create meaningful learning
                    experiences.
                  </p>
                  <p>
                    Today, we serve thousands of students across multiple
                    regions, but our mission remains the same: to make quality
                    education accessible to all, especially those who need it
                    most.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl overflow-hidden shadow-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">📈</div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        82% Improvement
                      </h3>
                      <p className="text-gray-600">
                        in learning outcomes for students using our platform
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-yellow-100 rounded-2xl shadow-lg flex items-center justify-center">
                  <span className="text-4xl">🎯</span>
                </div>
                <div className="absolute -top-6 -right-6 w-28 h-28 bg-green-100 rounded-2xl shadow-lg flex items-center justify-center">
                  <span className="text-3xl">🌟</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-gray-600">
                These principles guide every decision we make, from product
                design to community engagement.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-md transition-shadow duration-300"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Team
              </h2>
              <p className="text-gray-600">
                We've assembled world-class talent from education, technology,
                and design to realize our vision.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <span className="text-5xl">👤</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-indigo-600 text-sm mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Journey
              </h2>
              <p className="text-gray-600">
                From concept to impact—key milestones in our development and
                growth.
              </p>
            </motion.div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-indigo-200 transform -translate-x-1/2"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative flex flex-col md:flex-row ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    } items-center justify-center`}
                  >
                    <div className="md:w-1/2 flex justify-center md:justify-end mb-4 md:mb-0">
                      <div
                        className={`w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold z-10 ${
                          index % 2 === 0 ? "md:order-2" : ""
                        }`}
                      >
                        {index + 1}
                      </div>
                    </div>

                    <div
                      className={`md:w-1/2 ${
                        index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
                      }`}
                    >
                      <div className="bg-white p-6 rounded-2xl shadow-md">
                        <div className="text-indigo-600 font-semibold">
                          {milestone.year}
                        </div>
                        <p className="text-gray-800">{milestone.event}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-indigo-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">
                Join Us in Transforming Education
              </h2>
              <p className="text-indigo-100 max-w-2xl mx-auto mb-8">
                Whether you're an educator, developer, or simply passionate
                about educational equity, there are many ways to contribute to
                our mission.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-indigo-900"
                >
                  Partner with us
                </Button>
                <Button className="bg-white text-indigo-900 hover:bg-gray-100">
                  Explore opportunities
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
