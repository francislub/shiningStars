"use client"
import Slider from "react-slick"
import HeroSlide from "./HeroSlide"
import EnhancedEventsSection from "../EnhancedEventsSection"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export const heroVid = [
  {
    type: "image",
    src: "https://wm2u9pzloi.ufs.sh/f/SmuIuYJcPsT42yCPiWZrR4HouPzqLt1WkKsFre7wAZS8fQDd",
  },
  {
    type: "image",
    src: "https://wm2u9pzloi.ufs.sh/f/SmuIuYJcPsT4jGbKZ8dYSIZDmO9Qn7zKwxHqicp0lkJagXF8",
  },
  
  {
    type: "image",
    src: "https://fra.cloud.appwrite.io/v1/storage/buckets/683383760031705f5948/files/69d61ab0001f738985f1/view?project=683381d6001779054d64&mode=admin",
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

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 6000,
  pauseOnHover: false,
  arrows: false,
  dotsClass: "slick-dots !bottom-3",
}

const Hero = () => {
  return (
    <section
      id="home"
      className="w-full bg-gray-950 overflow-hidden"
    >
      {/*
        Mobile/tablet  → stacked: slider top, events below
        lg+            → side by side: slider left 62%, events right 38%
      */}
      <div className="flex flex-col lg:flex-row lg:h-screen lg:max-h-[900px]">

        {/* ── SLIDER ── */}
        <div
          className="
            relative w-full
            lg:w-[62%] lg:h-full
            /* Mobile: fixed aspect ratio so image is never squashed */
            aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9]
            lg:aspect-auto
          "
        >
          {/* Slick needs 100% height on all wrappers */}
          <style>{`
            #home .slick-slider,
            #home .slick-list,
            #home .slick-track,
            #home .slick-slide,
            #home .slick-slide > div {
              height: 100% !important;
            }
            #home .slick-dots li button:before {
              color: rgba(255,255,255,0.5);
              font-size: 8px;
            }
            #home .slick-dots li.slick-active button:before {
              color: #60a5fa;
            }
          `}</style>

          <Slider {...sliderSettings} className="h-full w-full">
            {heroVid.map((media, index) => (
              <HeroSlide key={index} media={media} />
            ))}
          </Slider>

          {/* Right fade into events panel on lg */}
          <div className="hidden lg:block absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none" />
        </div>

        {/* ── EVENTS PANEL ── */}
        <div className="
          w-full lg:w-[38%]
          bg-gray-950
          border-t border-white/10 lg:border-t-0 lg:border-l lg:border-white/10
          lg:h-full lg:overflow-y-auto
          scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent
        ">
          {/* Top accent stripe — mobile only */}
          <div className="h-[2px] w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 lg:hidden" />

          <div className="px-4 sm:px-6 lg:px-6 py-6 lg:py-8 pb-12 lg:pb-10">
            <EnhancedEventsSection />
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero