"use client"
import Slider from "react-slick"
import HeroSlide from "./HeroSlide"
import EnhancedEventsSection from "./EnhancedEventsSection"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export const heroVid = [
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

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 6000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        speed: 500,
        autoplaySpeed: 5000,
      },
    },
    {
      breakpoint: 768,
      settings: {
        speed: 400,
        autoplaySpeed: 4000,
        dots: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        speed: 350,
        autoplaySpeed: 3500,
        dots: true,
      },
    },
  ],
}

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="hero-section w-full min-h-screen lg:h-screen relative z-10 overflow-hidden lg:mb-20 mb-0"
      >
        {/* Mobile Layout: Vertical Stack */}
        <div className="flex flex-col lg:flex-row h-full">
          {/* Slider Section - Responsive heights */}
          <div className="w-full lg:w-[65%] relative h-[45vh] sm:h-[50vh] md:h-[55vh] lg:h-full">
            <div className="h-full w-full">
              <Slider {...sliderSettings}>
                {heroVid.map((media, index) => (
                  <HeroSlide key={index} media={media} />
                ))}
              </Slider>
            </div>
          </div>

          {/* Events Section - Advanced Responsive Container */}
          <div className="w-full lg:w-[35%] bg-gradient-to-b lg:bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 h-auto lg:h-full min-h-[50vh] md:min-h-[60vh] lg:min-h-auto">
            {/* Mobile: Add bottom padding for comfortable viewing */}
            <div className="h-full w-full overflow-y-auto lg:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
              <div className="px-3 sm:px-4 md:px-5 lg:px-6 py-4 sm:py-5 md:py-6 lg:py-8 pb-12 lg:pb-8">
                <EnhancedEventsSection />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
