"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import type { Event } from "@/types/types"
import SingleEvent from "./SingleEvent"

const AllEvents = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://shining-stars-dashboard-hr8p.onrender.com/api/v1/events")
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data = await response.json()
        const sortedEvents = data.sort((a: Event, b: Event) => new Date(b.date).getTime() - new Date(a.date).getTime())
        setEvents(sortedEvents)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      }
    }

    fetchEvents()
  }, [])

  return (
    <section className="bg-gradient-to-b from-primary/5 to-white py-16 md:py-20 lg:py-28">
      <div className="container">
        <h1 className="text-4xl font-bold text-center mb-12">All Events</h1>

        {error && <p className="text-red-500 text-center mb-8">Error: {error}</p>}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SingleEvent post={event} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AllEvents

