"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const features = [
  {
    id: 1,
    title: "Academic",
    description: "Students enjoy a fulfilling lifestyle with academic excellence, personal growth, and preparation for future endeavors.",
    position: "left",
    order: 1,
    image: "/images/shin/hm.png",
  },
  {
    id: 2,
    title: "Art & Clubs",
    description: "Students explore their passions, unleash their creativity, and build new skills through a variety of enriching programs.",
    position: "left",
    order: 2,
    image: "/images/shin/hm.png",
  },
  {
    id: 3,
    title: "ICT",
    description:
      "Computer is the",
    position: "left",
    order: 3,
    image: "/images/shin/hm.png",
  },
  {
    id: 4,
    title: "Music",
    description:
      "Music helps in providing pupils talents ",
    position: "right",
    order: 1,
    image: "/images/shin/gra.jpeg",
  },
  {
    id: 5,
    title: "Agriculture",
    description: "more about agriculture",
    position: "right",
    order: 2,
    image: "/images/shin/cake.jpeg",
  },
  {
    id: 6,
    title: "Sports",
    description:
      "more in sports",
    position: "right",
    order: 3,
    image: "/images/shin/build.jpeg",
  },
]

export default function FeatureShowcase() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1533] to-[#2d2b4a] relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-20">
            What We Provide
          <div className="absolute -bottom-2 right-1/4 w-32 h-2 bg-blue-500/50 blur-sm" />
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative">
          {/* Left Features */}
          <div className="space-y-12">
            {features
              .filter((f) => f.position === "left")
              .map((feature) => (
                <motion.div
                  key={feature.id}
                  className="relative group"
                  onHoverStart={() => setHoveredFeature(feature.id)}
                  onHoverEnd={() => setHoveredFeature(null)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400 font-semibold">{feature.id}</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                  {hoveredFeature === feature.id && (
                    <motion.div
                      className="hidden lg:flex absolute top-1/2 right-0 items-center"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { width: 0 },
                        visible: { width: "calc(100% + 2rem)" },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="h-0.5 bg-blue-500 flex-grow"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="w-2 h-2 bg-blue-500 rotate-45 transform translate-x-1" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
          </div>

          {/* Center Image */}
          <div className="relative">
            <div className="aspect-[4/3] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={hoveredFeature || "default"}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={
                      hoveredFeature
                        ? features.find((f) => f.id === hoveredFeature)?.image ||
                          "/images/shin/hm.png"
                        : "/images/shin/hm.png"
                    }
                    alt="Feature Preview"
                    fill
                    className="object-contain rounded-lg"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-radial from-transparent to-[#1f2937] opacity-50" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Features */}
          <div className="space-y-12">
            {features
              .filter((f) => f.position === "right")
              .map((feature) => (
                <motion.div
                  key={feature.id}
                  className="relative group"
                  onHoverStart={() => setHoveredFeature(feature.id)}
                  onHoverEnd={() => setHoveredFeature(null)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400 font-semibold">{feature.id}</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                  {hoveredFeature === feature.id && (
                    <motion.div
                      className="hidden lg:flex absolute top-1/2 left-0 items-center"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { width: 0 },
                        visible: { width: "calc(100% + 2rem)" },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-2 h-2 bg-blue-500 rotate-45 transform -translate-x-1" />
                      <motion.div
                        className="h-0.5 bg-blue-500 flex-grow"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  )}
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

