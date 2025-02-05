"use client"

import Image from "next/image"
import Link from "next/link"
import { FaArrowRight } from "react-icons/fa"
export const img = "/images/shin/hm.png";

export default function Welcome() {
  return (
    <section className="min-h-screen relative bg-gradient-to-br from-blue-950 to-purple-900 py-16 mt-[60px] lg:mt-[50px]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative">
            <div className="relative w-full aspect-square max-w-[400px] mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-blue-400/30 animate-pulse" />
              <div className="absolute inset-2 rounded-full border-2 border-blue-300/20" />
              <Image
                src={img}
                alt="Shining Stars Education"
                width={600}
                height={250}
                className="rounded-full w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="text-white space-y-6">
            <div className="space-y-2">
              <h2 className="text-blue-500 text-xl font-medium">You Are Welcome To</h2>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Shining Stars</h1>
            </div>

            <div className="space-y-4 text-black">
              <p className="text-lg leading-relaxed">
                At Shining Stars, we understand the importance of quality assurance. We have developed comprehensive
                self-regulating and self-maintaining procedures to ensure the highest standards of excellence in
                academic delivery and performance.
              </p>
              <p className="text-lg leading-relaxed">
                Join us at Shining Stars, where education is embraced as a catalyst for empowerment and change.
                Experience an inclusive and enriching learning environment where equal opportunities, academic
                excellence, and a commitment to the success of the students define our core values.
              </p>
            </div>

            <div className="flex gap-4 pt-6">
              <Link
                href="/our-work"
                className="inline-flex items-center justify-center px-6 py-3 bg-violet-600 hover:bg-lime-600 
                transition-colors rounded-full text-black font-medium"
              >
                Our Work
              </Link>
              <Link
                href="/whyshin"
                className="bg-blue-600 text-white px-6 py-1 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors duration-300"
              
              >
                Explore More
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
    </section>
  )
}

