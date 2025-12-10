"use client"
import Slider from "react-slick"
import HeroSlide from "./HeroSlide"
import EnhancedEventsSection from "../EnhancedEventsSection"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export const heroVid = [
  {
    type: "image",
    src: "https://fra.cloud.appwrite.io/v1/storage/buckets/683383760031705f5948/files/6938e83100014b42ab7e/view?project=683381d6001779054d64&mode=admin",
  },
  {
    type: "image",
    src: "https://fra.cloud.appwrite.io/v1/storage/buckets/683383760031705f5948/files/692d396000337de1b9b9/view?project=683381d6001779054d64&mode=admin",
  },
  {
    type: "image",
    src: "https://fra.cloud.appwrite.io/v1/storage/buckets/683383760031705f5948/files/692d39a5002693b442fc/view?project=683381d6001779054d64&mode=admin",
  },
  {
    type: "image",
    src: "https://fra.cloud.appwrite.io/v1/storage/buckets/683383760031705f5948/files/68e4c3a6003c7f1a8ed6/view?project=683381d6001779054d64&mode=admin",
  },
  {
    type: "image",
    src: "https://fra.cloud.appwrite.io/v1/storage/buckets/683383760031705f5948/files/68e4c424000407ce3d71/view?project=683381d6001779054d64&mode=admin",
  },


  {
    type: "image",
    src: "https://fra.cloud.appwrite.io/v1/storage/buckets/683383760031705f5948/files/68e4d20c0012204ada21/view?project=683381d6001779054d64&mode=admin",
  },

  
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
    </>
  )
}

export default Hero
