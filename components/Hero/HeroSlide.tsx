"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface HeroSlideProps {
  media: {
    type: string
    src: string
  }
}

const HeroSlide = ({ media }: HeroSlideProps) => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-950">
      {/* ── Main Image — fully contained, never cropped ── */}
      <motion.div
        initial={{ scale: 1.04, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10"
      >
        {media.type === "image" && (
          <div className="relative w-full h-full">
            {/* Decorative frame ring */}
            <div className="absolute -inset-[3px] rounded-2xl bg-gradient-to-br from-blue-500/40 via-indigo-500/20 to-purple-600/40 z-10 pointer-events-none" />

            {/* Glow behind image */}
            <div className="absolute inset-0 rounded-2xl blur-2xl bg-blue-600/20 scale-95 z-0" />

            {/* Image wrapper */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden z-[1] shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
              <img
                src={media.src}
                alt="School activity"
                className="w-full h-full object-contain bg-gray-950"
                style={{ display: "block" }}
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* ── Bottom gradient overlay for dots legibility ── */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-950/80 to-transparent z-20 pointer-events-none" />

      {/* ── Corner accent dots ── */}
      <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-blue-400/60 z-30" />
      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-indigo-400/60 z-30" />
      <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-purple-400/60 z-30" />
      <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-blue-400/60 z-30" />

      {/* ── Subtle scanline texture ── */}
      <div
        className="absolute inset-0 z-20 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)",
        }}
      />
    </div>
  )
}

export default HeroSlide