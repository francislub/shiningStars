"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"

import accommodation from "@/public/images/shi/build.jpeg"
import acca from "@/public/images/new/acca.jpg"
import sports from "@/public/images/new/sports.jpg"
import health from "@/public/images/shin/stu.jpg"
import religion from "@/public/images/shin/stu.jpg"
import feeding from "@/public/images/new/tou.jpg"
import FloatingNav from "./FloatingNav"
import StatisticsSection from "./StatisticsSection"
import CallToAction from "./CallToAction"

const features = [
  {
    title: "Academics",
    description:
      "At Shining Stars Nursery and Primary School Vvumba, we provide a strong academic foundation that nurtures curiosity and a love for learning. Our dedicated teachers use interactive and age-appropriate teaching methods to help pupils master reading, writing, mathematics, and science. We focus on holistic development to ensure every child reaches their full potential.",
    image: acca,
    link: "/academics",
  },
  {
    title: "Sports",
    description:
      "We believe that physical education is vital to a child's overall growth. Our school offers structured sports and games that develop teamwork, discipline, and physical well-being. Pupils participate in inter-school competitions and enjoy regular physical activities that build confidence and improve health.",
    image: sports,
    link: "/studentlife",
  },
  {
    title: "Accommodation",
    description:
      "Shining Stars Vvumba offers boarding facilities for pupils who live far from school. Our dormitories are safe, clean, and well-supervised by caring staff members. Boarding pupils follow a well-structured routine that includes study time, meals, recreation, and spiritual guidance to create a homely and disciplined environment.",
    image: accommodation,
    link: "/accommodation",
  },
  {
    title: "Health",
    description:
      "The health and safety of our pupils are a top priority. We have a first-aid facility and work closely with nearby health centers to handle any medical needs. Routine health checks are conducted to ensure the well-being of every child, and we teach basic hygiene practices as part of our daily routine.",
    image: health,
    link: "/health",
  },
  {
    title: "Religion",
    description:
      "As a Christian-founded school, we instill spiritual values in our pupils through daily devotions, Bible study, and Sunday worship. We nurture moral character, respect, and love for God and others, helping children grow spiritually and ethically in a supportive Christian environment.",
    image: religion,
    link: "/religion",
  },
  {
    title: "Feeding",
    description:
      "We provide nutritious meals to all pupils during school hours. Our feeding program is designed to support healthy growth and concentration in class. Meals are prepared hygienically, and special attention is given to balanced diets suitable for young children.",
    image: feeding,
    link: "/feeding",
  },
]

const AdvancedAboutSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])

  return (
    <>
      <FloatingNav isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      <section ref={ref} className="py-16 md:py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-white to-gray-100">
        <motion.div
          className="fixed inset-0 z-[-1] opacity-10"
          style={{
            backgroundImage: "url('/images/background-pattern.svg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            y: backgroundY,
          }}
        />

        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Excellence in research, teaching, and medical care
          </motion.h2>

          <div className="space-y-32">
            <FeatureSelector features={features} activeFeature={activeFeature} setActiveFeature={setActiveFeature} />
            <AnimatePresence mode="wait">
              <FeatureSection key={activeFeature} feature={features[activeFeature]} />
            </AnimatePresence>
          </div>
        </div>
        <StatisticsSection />
        <CallToAction />
      </section>
    </>
  )
}

const FeatureSelector = ({ features, activeFeature, setActiveFeature }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {features.map((feature, index) => (
        <motion.button
          key={index}
          className={`px-6 py-3 rounded-full text-sm font-semibold transition-colors ${
            activeFeature === index ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveFeature(index)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {feature.title}
        </motion.button>
      ))}
    </div>
  )
}

const FeatureSection = ({ feature }) => {
  return (
    <motion.div
      className="flex flex-col lg:flex-row items-center gap-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="lg:w-1/2" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
        <Image
          src={typeof feature.image === "string" ? feature.image : feature.image}
          alt={feature.title}
          width={500}
          height={300}
          className="rounded-lg shadow-2xl object-cover w-full h-[300px]"
          unoptimized={typeof feature.image === "string"}
        />
      </motion.div>
      <div className="lg:w-1/2 space-y-6">
        <motion.h3
          className="text-3xl font-bold text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {feature.title}
        </motion.h3>
        <motion.p
          className="text-gray-600 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {feature.description}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Link href={feature.link}>
            <motion.button
              className="group bg-blue-600 text-white py-3 px-6 rounded-full font-semibold shadow-lg flex items-center gap-2"
              whileHover={{ scale: 1.05, backgroundColor: "#2563EB" }}
              whileTap={{ scale: 0.95 }}
            >
              Explore more
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default AdvancedAboutSection
