"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Alumni",
    quote:
      "My time at this School was transformative. The professors and resources available helped shape my career.",
    image: "/images/testimonial1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Current Student",
    quote:
      "I'm constantly amazed by the opportunities for growth and learning here. It's more than just an education; it's an experience.",
    image: "/images/testimonial2.jpg",
  },
  {
    id: 3,
    name: "Robert Johnson",
    role: "Faculty Member",
    quote:
      "Teaching here is a privilege. The enthusiasm of our students and the support for research make this a truly special place.",
    image: "/images/testimonial3.jpg",
  },
]

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="bg-blue-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Community Says</h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center justify-center"
            >
              <Image
                src={testimonials[currentIndex].image || "/placeholder.svg"}
                alt={testimonials[currentIndex].name}
                width={200}
                height={200}
                className="rounded-full mb-4 md:mb-0 md:mr-8"
              />
              <div className="text-center md:text-left">
                <p className="text-xl italic mb-4">{testimonials[currentIndex].quote}</p>
                <p className="font-bold">{testimonials[currentIndex].name}</p>
                <p className="text-gray-600">{testimonials[currentIndex].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
          >
            &lt;
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCarousel

