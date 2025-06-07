"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { FaArrowRight, FaGraduationCap, FaBook, FaStar, FaLightbulb } from "react-icons/fa"
import { PiStudentFill } from "react-icons/pi"
import { GiTeacher } from "react-icons/gi"
import { LuSchool } from "react-icons/lu"

// Floating decoration component
const FloatingElement = ({ children, delay = 0, x = 0, y = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x, y }}
    animate={{
      opacity: 1,
      x: [x, x + 10, x - 10, x],
      y: [y, y - 15, y + 5, y],
    }}
    transition={{
      delay,
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
    }}
    className="absolute text-blue-300/30 text-4xl"
  >
    {children}
  </motion.div>
)

// Animated counter component
const AnimatedCounter = ({ value, label, icon, delay = 0 }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const interval = 30 // Update every 30ms
    const steps = duration / interval
    const increment = value / steps

    let timer
    let current = 0

    const timeout = setTimeout(() => {
      timer = setInterval(() => {
        current += increment
        if (current >= value) {
          current = value
          clearInterval(timer)
        }
        setCount(Math.floor(current))
      }, interval)
    }, delay)

    return () => {
      clearTimeout(timeout)
      clearInterval(timer)
    }
  }, [value, delay])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className="bg-white/10 rounded-full p-3 mb-2">{icon}</div>
      <div className="text-2xl font-bold">{count}+</div>
      <div className="text-sm opacity-80">{label}</div>
    </motion.div>
  )
}

export default function Welcome() {
  return (
    <section className="min-h-screen relative bg-gradient-to-br from-blue-950 to-purple-900 py-16 mt-[60px] lg:mt-[50px] overflow-hidden">
      {/* Decorative elements */}
      <FloatingElement delay={0.2} x={100} y={100}>
        <FaStar />
      </FloatingElement>
      <FloatingElement delay={0.5} x={200} y={300}>
        <FaBook />
      </FloatingElement>
      <FloatingElement delay={0.8} x={800} y={200}>
        <FaLightbulb />
      </FloatingElement>
      <FloatingElement delay={1.1} x={700} y={400}>
        <FaGraduationCap />
      </FloatingElement>

      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-800/30 -z-10"
        animate={{
          background: [
            "linear-gradient(to right, rgba(30,64,175,0.3), rgba(126,34,206,0.3))",
            "linear-gradient(to right, rgba(30,58,138,0.3), rgba(107,33,168,0.3))",
            "linear-gradient(to right, rgba(30,64,175,0.3), rgba(126,34,206,0.3))",
          ],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />

      {/* Animated grid background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image with animations */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full aspect-square max-w-[400px] mx-auto">
              {/* Animated rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-blue-400/30"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-blue-300/20"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
              />

              {/* Sparkle effects */}
              <motion.div
                className="absolute -top-4 -right-4 text-yellow-300 text-2xl"
                animate={{ scale: [0.8, 1.2, 0.8], rotate: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                ✨
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -left-4 text-yellow-300 text-2xl"
                animate={{ scale: [0.8, 1.2, 0.8], rotate: [0, -15, 0] }}
                transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
              >
                ✨
              </motion.div>

              {/* Main image with hover effect */}
              <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
                <Image
                  src="https://fra.cloud.appwrite.io/v1/storage/buckets/683383760031705f5948/files/6843ecdf003728b442c6/view?project=683381d6001779054d64&mode=admin"
                  alt="Shining Stars Education"
                  width={600}
                  height={250}
                  className="rounded-full w-full h-full object-cover shadow-xl shadow-blue-900/20"
                  priority
                />
              </motion.div>
            </div>

            {/* Stats section */}
            <motion.div
              className="grid grid-cols-3 gap-4 mt-8 text-center text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <AnimatedCounter
                value={450}
                label="Students"
                icon={<PiStudentFill className="text-2xl text-yellow-300" />}
                delay={1000}
              />
              <AnimatedCounter
                value={25}
                label="Teachers"
                icon={<GiTeacher className="text-2xl text-green-300" />}
                delay={1300}
              />
              <AnimatedCounter
                value={5}
                label="Years"
                icon={<LuSchool className="text-2xl text-blue-300" />}
                delay={1600}
              />
            </motion.div>
          </motion.div>

          {/* Right side - Content with animations */}
          <motion.div
            className="text-white space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.h2
                className="text-blue-400 text-xl font-medium"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.7 }}
              >
                You Are Welcome To
              </motion.h2>
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.9 }}
              >
                Shining Stars
              </motion.h1>
            </motion.div>

            <motion.div
              className="space-y-4 text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <motion.p
                className="text-lg leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
               At Shining Stars, we believe that while what our learners know is important, the true measure of a learner's education is the ability to analyse what they do not know.
              </motion.p>
              <motion.p
                className="text-lg leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                The School emphasizes a learner-centred approach to teaching and learning, whereby topics from different subject areas are taught and learners' prior knowledge and experiences are used to teach new content. Learners are allowed to explore and use their environment to learn on their own through research, project work and related learner–centered methods of teaching and learning.
              </motion.p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/school-content"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-lime-500 hover:to-green-500 
                  transition-all duration-300 rounded-full text-white font-medium shadow-lg shadow-violet-700/30 hover:shadow-lime-500/30"
                >
                  Our Work
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/whyshin"
                  className="group inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition-all duration-300 shadow-lg shadow-blue-700/30"
                >
                  <span>Explore More</span>
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
