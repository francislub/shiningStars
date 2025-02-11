"use client"

import Image from "next/image"
import { BookOpenIcon, GlobeAltIcon, StarIcon, EyeIcon } from "@heroicons/react/solid"
import { useState } from "react"
import { motion } from "framer-motion"

import image from "../../public/images/shin/stu.jpg"
import community from "../../public/images/shi/pip.jpeg"
import music from "../../public/images/shi/songg.jpeg"

const activities = [
  {
    title: "Music",
    description:
      "Students can participate in school bands, orchestras, or choirs, learning instruments or vocal performance.",
    example:
      "A student plays the trumpet in the school band, performing at school events and concerts, enhancing their musical talents and discipline.",
    image: music,
    icon: StarIcon,
  },
  {
    title: "Debate Club",
    description: "Debate clubs help students develop critical thinking, public speaking, and argumentation skills.",
    example:
      "A student competes in inter-school debate competitions, researching topics and practicing persuasive speaking.",
    image: image,
    icon: BookOpenIcon,
  },
  {
    title: "Community Service",
    description: "Community service programs encourage students to engage in volunteer work and social initiatives.",
    example: "A student volunteers at a local food bank, developing a sense of civic responsibility and empathy.",
    image: community,
    icon: GlobeAltIcon,
  },
]

const AboutSectionCoActivities = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Excellence in Research, Teaching, and Medical Care
        </h2>
        <div className="space-y-16">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              className="flex flex-col lg:flex-row items-center gap-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="lg:w-1/2 order-2 lg:order-1">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                  <activity.icon className="w-12 h-12 text-blue-500 mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">{activity.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{activity.description}</p>
                  <p className="text-gray-700 dark:text-gray-200 italic">Example: {activity.example}</p>
                </div>
              </div>
              <div className="lg:w-1/2 order-1 lg:order-2">
                <motion.div
                  className="relative overflow-hidden rounded-lg shadow-xl"
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  whileHover={{ scale: 1.05 }}
                >
                  <Image
                    src={activity.image || "/placeholder.svg"}
                    alt={activity.title}
                    width={500}
                    height={300}
                    className="w-full h-auto"
                  />
                  {hoveredIndex === index && (
                    <motion.div
                      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <EyeIcon className="w-16 h-16 text-white" />
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSectionCoActivities

