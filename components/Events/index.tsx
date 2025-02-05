"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import SingleEvent from "./SingleEvent"
import AdvancedFeatures from "./AdvancedFeatures"
import Link from "next/link"
import type { Event } from "@/types/types"
import SectionTitle from "../Common/SectionTitle"

const Events = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://shining-stars-dashboard.onrender.com/api/v1/events")
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data = await response.json()
        const sortedEvents = data.sort((a: Event, b: Event) => new Date(b.date).getTime() - new Date(a.date).getTime())
        setEvents(sortedEvents.slice(0, 2))
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      }
    }

    fetchEvents()
  }, [])

  return (
    <section id="events" className="bg-gradient-to-b from-primary/5 to-white py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle title="Upcoming Events" paragraph="Stay connected with our vibrant school community!" center />

        {error && <p className="text-red-500 text-center mb-8">Error: {error}</p>}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="w-full"
            >
              <SingleEvent post={event} />
            </motion.div>
          ))}
          <AdvancedFeatures />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link href="/events" passHref>
            <motion.a
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-primary rounded-full hover:bg-primary-dark focus:bg-primary-dark"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Events
              <svg className="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.a>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Events

