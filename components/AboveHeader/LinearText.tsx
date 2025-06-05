"use client"

import type React from "react"

import { motion } from "framer-motion"

interface LinearTextProps {
  text: string
}

export const LinearText: React.FC<LinearTextProps> = ({ text }) => {
  return (
    <div className="hidden lg:block overflow-hidden w-96 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-4 py-2 shadow-sm">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        }}
        className="whitespace-nowrap text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
      >
        ✨ {text} ✨
      </motion.div>
    </div>
  )
}
