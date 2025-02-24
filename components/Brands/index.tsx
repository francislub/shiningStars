"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const features = [
  {
    id: 1,
    title: "Academic",
    description:
      "Students enjoy a fulfilling lifestyle with academic excellence, personal growth, and preparation for future endeavors.",
    position: "left",
    order: 1,
    image: "/images/shin/hm.png",
    link: "/academics",
    icon: "📚",
  },
  {
    id: 2,
    title: "Art & Clubs",
    description:
      "Students explore their passions, unleash their creativity, and build new skills through a variety of enriching programs.",
    position: "left",
    order: 2,
    image: "/images/shin/hm.png",
    link: "/schoolife/itclub",
    icon: "🎨",
  },
  {
    id: 3,
    title: "ICT",
    description:
      "Computer is the gateway to the digital world, empowering students with essential skills for the future.",
    position: "left",
    order: 3,
    image: "/images/shin/hm.png",
    link: "/schoolife/ICT",
    icon: "💻",
  },
  {
    id: 4,
    title: "Curricular Activities",
    description: "Engaging students in diverse extracurricular activities to enhance skills, teamwork, and personal growth.",
    position: "right",
    order: 1,
    image: "/images/shin/gra.jpeg",
    link: "/curricular-activities",
    icon: "🎭",
},
{
    id: 5,
    title: "Subjects",
    description: "Providing a strong academic foundation with a well-structured curriculum across various subjects.",
    position: "right",
    order: 2,
    image: "/images/shin/cake.jpeg",
    link: "/subjects",
    icon: "📚",
},
  {
    id: 6,
    title: "Sports",
    description: "Promoting physical fitness, teamwork, and sportsmanship through various athletic activities.",
    position: "right",
    order: 3,
    image: "/images/shin/build.jpeg",
    link: "/studentlife",
    icon: "⚽",
  },
]

export default function FeatureShowcase() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const showcaseRef = useRef(null)
  const isInView = useInView(showcaseRef, { once: true, margin: "-100px" })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1533] to-[#2d2b4a] relative overflow-hidden py-16 px-4">
      <AnimatedBackground />

      <div ref={showcaseRef} className="max-w-7xl mx-auto relative">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-white text-center mb-20"
        >
          What We Provide
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-blue-500/50 blur-sm"
            initial={{ width: 0 }}
            animate={{ width: isInView ? "8rem" : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative">
          <FeatureColumn
            features={features.filter((f) => f.position === "left")}
            isLeft={true}
            isLoaded={isLoaded}
            isInView={isInView}
          />

          <CenterImage hoveredFeature={hoveredFeature} isInView={isInView} />

          <FeatureColumn
            features={features.filter((f) => f.position === "right")}
            isLeft={false}
            isLoaded={isLoaded}
            isInView={isInView}
          />
        </div>
      </div>
    </div>
  )
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full opacity-20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [0, -20, 0],
            transition: {
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
          style={{
            width: Math.random() * 4 + 1 + "px",
            height: Math.random() * 4 + 1 + "px",
          }}
        />
      ))}
    </div>
  )
}

function FeatureColumn({ features, isLeft, isLoaded, isInView }) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  return (
    <div className="space-y-12">
      {features.map((feature, index) => (
        <FeatureItem
          key={feature.id}
          feature={feature}
          hoveredFeature={hoveredFeature}
          setHoveredFeature={setHoveredFeature}
          isLeft={isLeft}
          delay={index * 0.2}
          isLoaded={isLoaded}
          isInView={isInView}
        />
      ))}
    </div>
  )
}

function FeatureItem({ feature, hoveredFeature, setHoveredFeature, isLeft, delay, isLoaded, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      animate={{ opacity: isLoaded && isInView ? 1 : 0, x: isLoaded && isInView ? 0 : isLeft ? -20 : 20 }}
      transition={{ duration: 0.8, delay }}
      className="relative group"
      onHoverStart={() => setHoveredFeature(feature.id)}
      onHoverEnd={() => setHoveredFeature(null)}
    >
      <Link href={feature.link} className="block">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-start gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-white/10"
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-2xl">
            {feature.icon}
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
              {feature.title}
            </h3>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{feature.description}</p>
          </div>
        </motion.div>
      </Link>
      {hoveredFeature === feature.id && (
        <motion.div
          className="hidden lg:flex absolute top-1/2 items-center"
          style={{ [isLeft ? "right" : "left"]: 0 }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { width: 0 },
            visible: { width: "calc(100% + 2rem)" },
          }}
          transition={{ duration: 0.3 }}
        >
          {isLeft && <div className="w-2 h-2 bg-blue-500 rotate-45 transform translate-x-1" />}
          <motion.div
            className="h-0.5 bg-blue-500 flex-grow"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
          {!isLeft && <div className="w-2 h-2 bg-blue-500 rotate-45 transform -translate-x-1" />}
        </motion.div>
      )}
    </motion.div>
  )
}

function CenterImage({ hoveredFeature, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative"
    >
      <div className="aspect-[4/3] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={hoveredFeature || "default"}
            initial={{ opacity: 0, scale: 0.95, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.95, rotate: 5 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={
                hoveredFeature
                  ? features.find((f) => f.id === hoveredFeature)?.image || "/images/shin/hm.png"
                  : "/images/shin/hm.png"
              }
              alt="Feature Preview"
              fill
              className="object-cover rounded-lg shadow-2xl"
              priority
            />
            <div className="absolute inset-0 bg-gradient-radial from-transparent to-[#1f2937] opacity-50" />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

