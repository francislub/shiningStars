"use client"

import { motion } from "framer-motion"

const timelineEvents = [
  {
    year: 1950,
    title: "School Founded",
    description: "Our institution was established with a vision to provide quality education.",
  },
  {
    year: 1975,
    title: "First Research Center",
    description: "We opened our first dedicated research center, focusing on technological advancements.",
  },
  {
    year: 2000,
    title: "International Expansion",
    description: "Our School began welcoming students from around the globe, fostering a diverse community.",
  },
  {
    year: 2020,
    title: "Digital Transformation",
    description: "We embraced online learning, expanding our reach and adapting to modern educational needs.",
  },
]

const Timeline = () => {
  return (
    <div className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Journey Through Time</h2>
        <div className="relative">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.year}
              className="mb-8 flex justify-between items-center w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto font-semibold text-lg text-white">{event.year}</h1>
              </div>
              <div className="order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
                <h3 className="mb-3 font-bold text-gray-800 text-xl">{event.title}</h3>
                <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Timeline

