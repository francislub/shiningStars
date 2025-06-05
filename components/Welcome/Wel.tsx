"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Sun, Cloud, BookOpen,Monitor, Mic } from "lucide-react"
import Image from "next/image"

// Updated showcase items with more child-friendly descriptions
const showcaseItems = [
  {
    id: 1,
    title: "Our School Director",
    description: "Leading with Heart and Vision",
    subtext:
      "Guiding our little stars to shine their brightest every day at Shining Stars Nursery and Primary School, Vvumba.",
    image: "/images/shi/drrr.jpeg",
    icon: "Star",
    bgColor: "from-blue-400 to-purple-500",
    decorations: ["stars", "books"],
  },
  {
    id: 2,
    title: "Our Amazing Teachers",
    description: "Nurturing Young Minds",
    subtext:
      "Our dedicated teachers create a fun and supportive learning environment where every child can grow, explore, and discover their potential.",
    image: "/images/new/staff.jpg",
    icon: "BookOpen",
    bgColor: "from-green-400 to-teal-500",
    decorations: ["pencils", "books"],
  },
  {
    id: 3,
    title: "Our School Leaders",
    description: "Creating a Happy Learning Home",
    subtext:
      "Our administrators ensure Shining Stars Nursery and Primary School, Vvumba is a safe, organized, and joyful place for children to learn and play.",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/683383760031705f5948/files/6841a2250036dca8eaac/view?project=683381d6001779054d64&mode=admin",
    icon: "Sun",
    bgColor: "from-orange-400 to-amber-500",
    decorations: ["clouds", "sun"],
  },
  {
    id: 4,
    title: "Happy School Life",
    description: "Where Learning is an Adventure",
    subtext:
      "At Shining Stars Vvumba, every day is filled with discovery, friendship, and fun activities that help our pupils grow into confident learners.",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/683383760031705f5948/files/6841a2c40008bd4b425d/view?project=683381d6001779054d64&mode=admin",
    icon: "Cloud",
    bgColor: "from-pink-400 to-purple-500",
    decorations: ["balloons", "stars"],
  },
  {
    id: 5,
    title: "Debating Club",
    description: "Sharpening Minds Through Words",
    subtext:
      "Our debating sessions encourage pupils to speak confidently, think critically, and engage with ideas respectfully—skills that last a lifetime.",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/683383760031705f5948/files/6841a4580026f8a170ac/view?project=683381d6001779054d64&mode=admin",
    icon: "Mic",
    bgColor: "from-yellow-400 to-red-500",
    decorations: ["speech-bubbles", "microphones"],
  },
  {
    id: 6,
    title: "Computer Studies",
    description: "Empowering Digital Learners",
    subtext:
      "From keyboard skills to coding basics, our pupils are introduced to essential digital tools that prepare them for a tech-driven future.",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/683383760031705f5948/files/6841a4970039c3427287/view?project=683381d6001779054d64&mode=admin",
    icon: "Monitor",
    bgColor: "from-blue-400 to-indigo-500",
    decorations: ["laptops", "keyboards"],
  },
]

// Bubble component for the dreamy effect
const Bubble = ({ size, delay, duration, left }) => {
  return (
    <motion.div
      className={`absolute rounded-full bg-white/30 backdrop-blur-sm`}
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        bottom: "-100px",
      }}
      animate={{
        y: [0, -500, -1000],
        x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
        opacity: [0.7, 0.8, 0],
        scale: [1, 1.2, 0.8],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: Math.random() * 2,
      }}
    />
  )
}

// Floating element component
const FloatingElement = ({ children, xRange = 20, yRange = 20, duration = 5 }) => {
  return (
    <motion.div
      animate={{
        y: [`-${yRange / 2}px`, `${yRange / 2}px`, `-${yRange / 2}px`],
        x: [`-${xRange / 2}px`, `${xRange / 2}px`, `-${xRange / 2}px`],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

export default function WebsiteShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)

  const changeSlide = useCallback(
    (newIndex) => {
      if (newIndex !== currentIndex) {
        setDirection(newIndex > currentIndex ? 1 : -1)
        setCurrentIndex(newIndex)
      }
    },
    [currentIndex],
  )

  const nextSlide = useCallback(() => {
    const newIndex = (currentIndex + 1) % showcaseItems.length
    changeSlide(newIndex)
  }, [currentIndex, changeSlide])

  const prevSlide = useCallback(() => {
    const newIndex = (currentIndex - 1 + showcaseItems.length) % showcaseItems.length
    changeSlide(newIndex)
  }, [currentIndex, changeSlide])

  // Auto-sliding functionality
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        nextSlide()
      }, 6000) // Change slide every 6 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [nextSlide, isPaused])

  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.9,
    }),
  }

  // Get the current icon component
  const getIcon = (iconName) => {
    switch (iconName) {
      case "Star":
        return <Star className="h-8 w-8 text-yellow-300" />
      case "BookOpen":
        return <BookOpen className="h-8 w-8 text-green-500" />
      case "Sun":
        return <Sun className="h-8 w-8 text-amber-400" />
      case "Cloud":
        return <Cloud className="h-8 w-8 text-blue-400" />
      case "Mic":
        return <Mic className="h-8 w-8 text-blue-400" />
      case "Monitor":
        return <Monitor className="h-8 w-8 text-blue-400" />
      default:
        return <Star className="h-8 w-8 text-yellow-300" />
    }
  }

  // Generate decorative elements based on type
  const getDecorations = (types) => {
    return types.map((type, index) => {
      switch (type) {
        case "stars":
          return (
            <div key={`star-${index}`} className="absolute">
              {[...Array(5)].map((_, i) => (
                <FloatingElement key={i} xRange={30} yRange={30} duration={3 + i}>
                  <motion.div
                    className="absolute text-yellow-300"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      transform: `rotate(${Math.random() * 360}deg)`,
                    }}
                  >
                    <Star size={10 + Math.random() * 15} />
                  </motion.div>
                </FloatingElement>
              ))}
            </div>
          )
        case "books":
          return (
            <div key={`book-${index}`} className="absolute">
              {[...Array(3)].map((_, i) => (
                <FloatingElement key={i} xRange={20} yRange={15} duration={4 + i}>
                  <motion.div
                    className="absolute"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                      transform: `rotate(${Math.random() * 30 - 15}deg)`,
                    }}
                  >
                    <BookOpen size={15 + Math.random() * 10} className="text-blue-600/40" />
                  </motion.div>
                </FloatingElement>
              ))}
            </div>
          )
        case "clouds":
          return (
            <div key={`cloud-${index}`} className="absolute">
              {[...Array(4)].map((_, i) => (
                <FloatingElement key={i} xRange={40} yRange={20} duration={7 + i}>
                  <motion.div
                    className="absolute text-white/50"
                    style={{
                      top: `${Math.random() * 50}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                  >
                    <Cloud size={20 + Math.random() * 30} />
                  </motion.div>
                </FloatingElement>
              ))}
            </div>
          )
        case "balloons":
          return (
            <div key={`balloon-${index}`} className="absolute">
              {[...Array(5)].map((_, i) => (
                <FloatingElement key={i} xRange={15} yRange={25} duration={5 + i}>
                  <motion.div
                    className="absolute"
                    style={{
                      top: `${Math.random() * 70}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                  >
                    <div
                      className={`w-${4 + Math.floor(Math.random() * 3)} h-${5 + Math.floor(Math.random() * 4)} rounded-full bg-${["red", "blue", "green", "yellow", "purple"][i % 5]}-400/60`}
                    ></div>
                    <div className="w-0.5 h-10 bg-gray-400/60 mx-auto"></div>
                  </motion.div>
                </FloatingElement>
              ))}
            </div>
          )
        case "pencils":
          return (
            <div key={`pencil-${index}`} className="absolute">
              {[...Array(4)].map((_, i) => (
                <FloatingElement key={i} xRange={25} yRange={15} duration={6 + i}>
                  <motion.div
                    className="absolute"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                      transform: `rotate(${Math.random() * 90 - 45}deg)`,
                    }}
                  >
                    <div className="w-1 h-16 bg-yellow-500/60 relative">
                      <div className="absolute -top-3 w-1 h-3 bg-pink-500/60"></div>
                      <div className="absolute bottom-0 w-0 h-0 border-l-[2px] border-r-[2px] border-b-[6px] border-l-transparent border-r-transparent border-b-gray-600/60"></div>
                    </div>
                  </motion.div>
                </FloatingElement>
              ))}
            </div>
          )
        case "sun":
          return (
            <FloatingElement key={`sun-${index}`} xRange={10} yRange={10} duration={8}>
              <motion.div className="absolute top-10 right-10">
                <Sun size={40} className="text-yellow-400/70" />
              </motion.div>
            </FloatingElement>
          )
        default:
          return null
      }
    })
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#1a1533] to-[#2d2b4a] relative overflow-hidden py-10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100 300C100 300 300 600 700 600C1100 600 1300 300 1500 300"
            stroke="#4299E1"
            strokeWidth="4"
            fill="none"
            className="opacity-20"
          />
        </svg>

        {/* Animated background blobs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 2,
          }}
        />
      </div>

      {/* Floating bubbles for dreamy effect */}
      {[...Array(15)].map((_, i) => (
        <Bubble
          key={i}
          size={20 + Math.random() * 60}
          delay={Math.random() * 5}
          duration={10 + Math.random() * 20}
          left={Math.random() * 100}
        />
      ))}

      {/* Cartoon-style clouds */}
      <div className="absolute top-0 left-0 w-full">
        <motion.div
          className="absolute left-[10%] top-[5%] w-24 h-12 bg-white/80 rounded-full"
          animate={{ x: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute left-[10%] top-[5%] mt-4 ml-10 w-16 h-10 bg-white/80 rounded-full"
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
        />
        <motion.div
          className="absolute right-[20%] top-[10%] w-32 h-16 bg-white/80 rounded-full"
          animate={{ x: [0, -40, 0] }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute right-[20%] top-[10%] mt-6 mr-12 w-20 h-12 bg-white/80 rounded-full"
          animate={{ x: [0, -30, 0] }}
          transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-6 py-10 md:py-20 relative z-10">
        <div className="text-center mb-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-yellow-300">Discover</span> Shining Stars Nursery & Primary School
          </motion.h2>
          <motion.p
            className="text-lg text-blue-200 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Where every child's potential shines bright in Vvumba
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="relative">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.5 },
                }}
                className="space-y-8"
              >
                <div className="inline-block">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm">
                      {getIcon(showcaseItems[currentIndex].icon)}
                    </div>
                    <h1 className="text-2xl lg:text-4xl font-bold text-white relative">
                      <motion.span
                        className="relative z-10 inline-block"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        {showcaseItems[currentIndex].title}
                      </motion.span>
                    </h1>
                  </div>
                </div>

                <motion.h2
                  className="text-3xl text-yellow-300 font-semibold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {showcaseItems[currentIndex].description}
                </motion.h2>

                <motion.p
                  className="text-lg text-blue-100 max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {showcaseItems[currentIndex].subtext}
                </motion.p>

                <motion.div
                  className="pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <button className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full text-black font-medium hover:from-yellow-500 hover:to-amber-600 transition-all transform hover:scale-105 shadow-lg">
                    Learn More About Us
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div
              className={`absolute inset-0 bg-gradient-to-r ${showcaseItems[currentIndex].bgColor} rounded-full blur-3xl opacity-30`}
            ></div>
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-[#f8f7ff]/10 backdrop-blur-sm rounded-2xl border-2 border-white/20 shadow-xl"></div>
              <div className="relative h-full flex items-center justify-center p-6 md:p-12 overflow-hidden rounded-2xl">
                {/* Decorative elements specific to each slide */}
                {getDecorations(showcaseItems[currentIndex].decorations)}

                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.5 },
                      scale: { duration: 0.5 },
                    }}
                    className="w-full h-full relative"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={showcaseItems[currentIndex].image || "/placeholder.svg"}
                        alt={`${showcaseItems[currentIndex].title} preview`}
                        className="rounded-lg shadow-2xl object-cover"
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                      />

                      {/* Cartoon-style frame */}
                      <div className="absolute inset-0 border-[8px] border-dashed border-yellow-400/50 rounded-lg"></div>

                      {/* Corner decorations */}
                      <div className="absolute -top-3 -left-3 w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                        <Star size={16} />
                      </div>
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                        <Star size={16} />
                      </div>
                      <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-white font-bold">
                        <Star size={16} />
                      </div>
                      <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                        <Star size={16} />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex gap-3">
            {showcaseItems.map((_, index) => (
              <button
                key={index}
                onClick={() => changeSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-white scale-125 shadow-lg shadow-white/30"
                    : "bg-gray-400 hover:bg-gray-300 hover:scale-110"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-colors text-white shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-colors text-white shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
              initial={{ width: "0%" }}
              animate={{ width: `${(currentIndex / (showcaseItems.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
