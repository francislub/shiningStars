"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState, useEffect } from "react"

const stats = [
  { label: "Students", value: 15000 },
  { label: "Faculty Members", value: 1000 },
  { label: "Research Papers", value: 5000 },
  { label: "Alumni", value: 100000 },
]

const StatisticsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div ref={ref} className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">University by the Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <AnimatedCounter value={stat.value} />
              <p className="text-xl mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      const start = 0
      const end = Number.parseInt(value.toString().substring(0, 3))
      const duration = 2000
      let startTimestamp = null

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / duration, 1)
        setCount(Math.floor(progress * (end - start) + start))
        if (progress < 1) {
          window.requestAnimationFrame(step)
        }
      }

      window.requestAnimationFrame(step)
    }
  }, [inView, value])

  return (
    <span ref={ref} className="text-4xl font-bold">
      {count}
      {value.toString().length > 3 && "k+"}
    </span>
  )
}

export default StatisticsSection

