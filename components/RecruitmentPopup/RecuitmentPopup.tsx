"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaMinusCircle, FaPlusCircle, FaTimes } from "react-icons/fa"

const RecruitmentPopup = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [position, setPosition] = useState<"left" | "right">("right")

  // Show popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const recruitmentData = {
    title: "WE'RE HIRING",
    tagline: "JOIN US!",
    requirements: ["GOD FEARING.", "SELF MOTIVATED.", "FLEXIBLE."],
    positions: ["UPPER PRIMARY ENGLISH TEACHER", "UPPER PRIMARY MATHEMATICS TEACHER", "NURSERY TEACHER"],
    deadline: "10TH JAN, 2026",
    contact: {
      email: "shiningstars2022@gmail.com",
      phone1: "0773 297 951",
      phone2: "0753 753 179",
      location: "Located in Vvumba off Gayazo - Zimbabwe RD",
    },
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 right-6 lg:right-8 z-40 max-w-lg w-full mx-4"
          >
            <div className="bg-white rounded-xl shadow-2xl border-4 border-yellow-400 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-4 flex justify-between items-center">
                <h2 className="text-yellow-400 text-2xl font-bold">WE'RE HIRING</h2>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMinimized(true)}
                    className="text-white hover:text-yellow-300 transition-colors"
                    aria-label="Minimize"
                  >
                    <FaMinusCircle size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-yellow-300 transition-colors"
                    aria-label="Close"
                  >
                    <FaTimes size={20} />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Join Us Button */}
                <div className="flex justify-center mb-4">
                  <div className="bg-yellow-400 px-6 py-2 rounded-lg font-bold text-blue-900">JOIN US!</div>
                </div>

                {/* Requirements */}
                <div className="space-y-2">
                  {recruitmentData.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="text-yellow-400 text-lg">✓</span>
                      <span className="font-semibold text-gray-800">{req}</span>
                    </div>
                  ))}
                </div>

                {/* Positions */}
                <div className="border-t-2 border-b-2 border-gray-300 py-4 space-y-2">
                  <p className="font-bold text-gray-900 mb-3">POSITIONS:</p>
                  {recruitmentData.positions.map((pos, idx) => (
                    <p key={idx} className="text-yellow-600 font-semibold text-sm">
                      {pos}
                    </p>
                  ))}
                </div>

                {/* Deadline */}
                <div className="bg-yellow-400 px-4 py-3 rounded-lg text-center">
                  <p className="font-bold text-blue-900">SEND US YOUR CV OR DROP IT AT OUR SCHOOL BEFORE</p>
                  <p className="text-2xl font-bold text-blue-900">{recruitmentData.deadline}</p>
                </div>

                {/* Contact Info */}
                <div className="bg-yellow-400 px-4 py-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🌍</span>
                    <p className="text-sm font-semibold text-gray-800">{recruitmentData.contact.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📱</span>
                    <p className="text-sm font-semibold text-gray-800">
                      {recruitmentData.contact.phone1} | {recruitmentData.contact.phone2}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📍</span>
                    <p className="text-sm font-semibold text-gray-800">{recruitmentData.contact.location}</p>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.a
                  href={`mailto:${recruitmentData.contact.email}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="block w-full bg-gradient-to-r from-blue-900 to-blue-800 text-yellow-400 font-bold py-3 rounded-lg text-center hover:shadow-lg transition-shadow"
                >
                  APPLY NOW
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}

        {/* Minimized State - Floating Button */}
        {isOpen && isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-6 z-40 ${position === "right" ? "right-6" : "left-6"} lg:${position === "right" ? "right-8" : "left-8"}`}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMinimized(false)}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:shadow-xl transition-all"
              aria-label="Open recruitment popup"
            >
              <FaPlusCircle size={24} />
            </motion.button>

            {/* Position Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPosition(position === "right" ? "left" : "right")}
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow-lg hover:shadow-xl transition-all"
              aria-label="Toggle position"
            >
              {position === "right" ? "← Move Left" : "Move Right →"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default RecruitmentPopup
