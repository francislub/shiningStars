"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"

import academic from "@/public/images/shi/name.jpeg"
import sports from "@/public/images/shi/mddx.jpeg"
import accommodation from "@/public/images/shi/build.jpeg"
import health from "@/public/images/shin/stu.jpg"
import religion from "@/public/images/shin/stu.jpg"
import feeding from "@/public/images/shin/stuf.jpg"
import FloatingNav from "./FloatingNav"
import Timeline from "./Timeline"
import TestimonialCarousel from "./TestimonialCarousel"
import StatisticsSection from "./StatisticsSection"
import CallToAction from "./CallToAction"

const features = [
  {
    title: "Academics",
    description:
      "We offer a number of professional courses across our faculties. The Department of Computing and Technology offers certifications from CISCO like CCNA, CCNP, and from Microsoft, the department provides MCSE, MCSA. The School of Business prepares students for CPA and other accounting professional courses. Our Nursing students are assessed by the Uganda Nurses And Midwifery Examination Board (UNMEB).",
    image: academic,
    link: "/academics",
  },
  {
    title: "Sports",
    description:
      "The School treasures the quality of its products, and for that reason, we hire quality and experienced lecturers to train and produce the best for our students. Our lecturers are associated with industry enterprises which helps them get the market experience that they instil in our students. Research is a core role for our lecturers to keep producing relevant knowledge for the market.",
    image: sports,
    link: "/studentlife",
  },
  {
    title: "Accommodation",
    description:
      "Our blended learning programs combine traditional classroom instruction with interactive online components, empowering students to engage with course materials, collaborate with peers. Our E-Learning system is available all the time to cater for those that may be in different time zones. Our support team will take you step by step on how to get the best from the platform. Pay a visit to our E-Learning Platform.",
    image: accommodation,
    link: "/accommodation",
  },
  {
    title: "Health",
    description:
      "We believe in creating relationships that last with our clients. The institution has academic families where each student is assigned to a mentor. This increases the bond between our students and lecturers. Since students are let free to interact with the lecturers, this gives them a chance to be well prepared for the market challenges ahead of them. This enriches their (Students) career readiness as well.",
    image: health,
    link: "/health",
  },
  {
    title: "Religion",
    description:
      "We understand the importance of holistic development and the role of spirituality in our students' lives. We provide a nurturing environment that fosters personal growth and offers opportunities for spiritual enrichment. Our School offers worship services and spaces that cater to diverse religious and spiritual needs. Students can engage in prayer, meditation, and other spiritual activities to promote a sense of community, mindfulness, and well-being.",
    image: religion,
    link: "/religion",
  },
  {
    title: "Feeding",
    description:
      "We believe in equipping our students with the necessary skills and credentials to excel in their chosen professions. As part of our commitment to professional development, we offer a range of professional certification programs. These certifications are designed to enhance students' expertise, improve their marketability, and demonstrate their proficiency in specific areas of study.",
    image: feeding,
    link: "/feeding",
  },
]

const AboutSectionSeven = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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
      <section ref={ref} className="py-16 md:py-20 lg:py-28 overflow-hidden">
        <motion.div
          className="fixed inset-0 z-[-1]"
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
            {features.map((feature, index) => (
              <FeatureSection key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>

        <Timeline />
        <TestimonialCarousel />
        <StatisticsSection />
        <CallToAction />
      </section>
    </>
  )
}

const FeatureSection = ({ feature, index }) => {
  const isEven = index % 2 === 0

  return (
    <motion.div
      className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-10`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div className="lg:w-1/2" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
        <Image
          src={feature.image || "/placeholder.svg"}
          alt={feature.title}
          width={500}
          height={300}
          className="rounded-lg shadow-2xl"
        />
      </motion.div>
      <div className="lg:w-1/2 space-y-6">
        <h3 className="text-3xl font-bold text-gray-800">{feature.title}</h3>
        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
        <Link href={feature.link}>
          <motion.button
            className="bg-blue-600 text-white py-3 px-6 rounded-full font-semibold shadow-lg"
            whileHover={{ scale: 1.05, backgroundColor: "#2563EB" }}
            whileTap={{ scale: 0.95 }}
          >
            Explore more
          </motion.button>
        </Link>
      </div>
    </motion.div>
  )
}

export default AboutSectionSeven

