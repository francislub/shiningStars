"use client"

import Link from "next/link"
import { FaArrowDownLong } from "react-icons/fa6"
import { BiBookOpen, BiSolidPencil } from "react-icons/bi"
import { motion } from "framer-motion"
import Slider from "react-slick"
import HeroSlide from "./HeroSlide"
import EnhancedEventsSection from "../EnhancedEventsSection"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export const heroVid = [
  {
    type: "image",
    src: "https://fra.cloud.appwrite.io/v1/storage/buckets/683383760031705f5948/files/686e14f80023e872d058/view?project=683381d6001779054d64&mode=admin",
  },
  {
    type: "image",
    src: "https://fra.cloud.appwrite.io/v1/storage/buckets/683383760031705f5948/files/686e21bc0029500034a9/view?project=683381d6001779054d64&mode=admin",
  },
  {
    type: "image",
    src: "https://fra.cloud.appwrite.io/v1/storage/buckets/683383760031705f5948/files/686e21d10007ceaebc3d/view?project=683381d6001779054d64&mode=admin",
  },
  // { type: 'image', src: "https://fra.cloud.appwrite.io/v1/storage/buckets/683383760031705f5948/files/68440fe4002f471e72ce/view?project=683381d6001779054d64&mode=admin" },

  // { type: 'image', src: "https://fra.cloud.appwrite.io/v1/storage/buckets/683383760031705f5948/files/6841968a002b68edd8da/view?project=683381d6001779054d64&mode=admin" },
  // { type: 'image', src: "https://fra.cloud.appwrite.io/v1/storage/buckets/683383760031705f5948/files/68419901003545967bc1/view?project=683381d6001779054d64&mode=admin" },
  {
    type: "image",
    src: "https://fra.cloud.appwrite.io/v1/storage/buckets/683383760031705f5948/files/68419ab30019c2853e78/view?project=683381d6001779054d64&mode=admin",
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dytcuelfd/video/upload/v1723370373/SHINNING_STAR_ADVERT_FINAL_tmi84h.mp4",
  },
  // { type: 'image', src: "/images/shi/grac.jpeg"},
  // { type: 'image', src: "/images/shi/mdd.jpeg" },
  // { type: 'image', src: "/images/shi/cake.jpeg" }
]

// Variants for hero content
const textVariants = {
  initial: {
    x: -500,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
  scrollButton: {
    opacity: 0,
    x: 10,
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
    },
  },
  scrollButton2: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
    },
  },
}

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 6000,
}

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="hero-section w-full min-h-screen lg:h-screen relative z-10 overflow-hidden lg:mb-20 mb-1"
      >
        <div className="flex flex-col lg:flex-row h-full">
          {/* Left side - Slider (65% on large screens for better proportion) */}
          <div className="w-full lg:w-[65%] relative h-[50vh] lg:h-full">
            <div className="h-full">
              <Slider {...sliderSettings}>
                {heroVid.map((media, index) => (
                  <HeroSlide key={index} media={media} />
                ))}
              </Slider>
            </div>
          </div>

          {/* Right side - Enhanced Events Section (35% on large screens for better fit) */}
          <div className="w-full lg:w-[35%] bg-gray-50 dark:bg-gray-900 h-[50vh] lg:h-full">
            <div className="h-full overflow-y-auto">
              <EnhancedEventsSection />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-specific hero content overlay */}
      <div className="lg:hidden container px-4 py-8 w-full">
        <motion.div
          className="text-center space-y-6 mx-auto max-w-[800px] fadeInUp"
          data-wow-delay=".2s"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h2
            className="uppercase font-medium leading-relaxed text-gray-500/70 dark:text-white dark:opacity-90 text-xl sm:text-2xl"
            variants={textVariants}
          >
            Shining Stars
          </motion.h2>

          <motion.h1
            className="capitalize text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-black/70 dark:text-primary"
            variants={textVariants}
          >
            Arise and shine
          </motion.h1>

          <motion.div className="flex flex-col items-center justify-center space-y-4" variants={textVariants}>
            <motion.div
              className="flex hover:scale-105 transition-all duration-300 space-y-6 flex-col items-center"
              variants={textVariants}
            >
              <motion.div className="border rounded py-1" variants={textVariants} animate="scrollButton2">
                <FaArrowDownLong className="text-primary" />
              </motion.div>
              <Link
                href="/admission"
                target="_blank"
                rel="noopener noreferrer"
                className="flex rounded-md bg-primary dark:bg-primary/60 py-2 px-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
              >
                Apply Now
                <BiSolidPencil className="text-xl mx-2" />
              </Link>
            </motion.div>

            <motion.div
              className="flex hover:scale-105 transition-all duration-300 flex-col text-center items-center justify-center"
              variants={textVariants}
            >
              <Link
                href="/learn-more"
                className="mt-4 flex rounded-md bg-black/30 py-1 px-3 md:py-2 md:px-4 text-lg font-semibold text-black/90 duration-300 ease-in-out hover:bg-black/30 dark:bg-transparent dark:border dark:text-white"
              >
                Learn More
                <BiBookOpen className="text-xl mx-2" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

export default Hero
