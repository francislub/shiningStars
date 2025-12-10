"use client"

import Image from "next/image"
import React from "react"
import HeroOverlay from "../HeroOverlay/HeroOverlay"

const HeroSlide = ({ media }) => {
  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-full z-10">

      {media.type === "video" ? (
        <div className="w-full h-full">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={media.src} type="video/mp4" />
          </video>

          <HeroOverlay
            title="Arise and shine"
            title2=""
            title3="SHINING STARS NURSERY AND PRIMARY SCHOOL - VVUMBA"
            subtitle="A Center for Guaranteed excellence"
            subtitle2=""
            subtitle3=""
            buttonText="Apply Now"
            buttonLink="/admission"
          />
        </div>

      ) : (
        <>
          <Image
            src={media.src}
            alt="Shining Stars"
            fill
            priority
            className="object-cover object-center"
          />

          {/* dark filter */}
          <div className="absolute inset-0 bg-black/40" />
        </>
      )}

    </div>
  )
}

export default HeroSlide
