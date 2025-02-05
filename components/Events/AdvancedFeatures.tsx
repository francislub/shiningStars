"use client"

import React from "react"
import { motion } from "framer-motion"
import { Calendar, Bell, Users } from "lucide-react"

const AdvancedFeatures = () => {
  const features = [
    { icon: Calendar, title: "Event Calendar", description: "Stay organized with our interactive event calendar" },
    {
      icon: Bell,
      title: "Event Reminders",
      description: "Never miss an important event with personalized notifications",
    },
    {
      icon: Users,
      title: "Community Engagement",
      description: "Connect with other parents and students in our community",
    },
  ]

  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-6 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Event Features</h3>
      <div className="space-y-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="flex items-start space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="flex-shrink-0">
              <motion.div
                className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon size={24} />
              </motion.div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg blur"></div>
          <button className="relative w-full py-3 px-6 bg-white text-primary font-semibold rounded-lg shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-75">
            Explore More Features
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default AdvancedFeatures

