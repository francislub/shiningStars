"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, MapPin, ArrowRight, Loader2 } from "lucide-react"

interface Event {
  id: string
  activity: string
  description: string
  date: string
  place: string
  photos?: string[] // Updated to use photos array as requested
  createdAt: string
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      setError(null)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

      const response = await fetch("/api/events?limit=3", {
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        setEvents(data.events || [])
      } else {
        setError(data.error || "Failed to fetch events")
      }
    } catch (err) {
      if (err.name === "AbortError") {
        setError("Request timed out. Please try again.")
      } else {
        setError("Failed to load events. Please check your connection.")
      }
      console.error("Error fetching events:", err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return {
        day: "",
        month: "",
        year: new Date().getFullYear(),
        full: "Date not available",
      }
    }

    return {
      day: date.getDate().toString().padStart(2, "0"),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      year: date.getFullYear(),
      full: date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Recently posted"
    }

    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just posted"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  const getEventImage = (event: Event) => {
    // Check if photos array exists and has at least one photo
    if (event.photos && event.photos.length > 0 && event.photos[0]?.trim() !== "") {
      return event.photos[0]
    }
    // Use a reliable placeholder service or default image
    return `https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop&crop=center&auto=format&q=60`
  }

  if (loading) {
    return (
      <section className="py-16 md:py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Upcoming Events</h2>
            <p className="text-lg text-body-color">Stay updated with our latest school activities and events</p>
          </div>
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-body-color">Loading events...</span>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 md:py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">Upcoming Events</h2>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <p className="text-red-600 dark:text-red-400">{error}</p>
              <button
                onClick={fetchEvents}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gray-1 dark:bg-gray-dark">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Calendar className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">Upcoming Events</h2>
          <p className="text-lg text-body-color max-w-2xl mx-auto">
            Join us for exciting activities and memorable experiences at Shining Stars School
          </p>
        </motion.div>

        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No Events Scheduled</h3>
            <p className="text-body-color">Check back soon for upcoming school events and activities!</p>
          </motion.div>
        ) : (
          <>
            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {events.map((event, index) => {
                const eventDate = formatDate(event.date)
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Link href={`/events/${event.id}`}>
                      <div className="bg-white dark:bg-gray-dark rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                        {/* Event Image */}
                        <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
                          <Image
                            src={getEventImage(event) || "/placeholder.svg"}
                            alt={event.activity || "School Event"}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = `https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop&crop=center&auto=format&q=60`
                            }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={index < 2}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                          {/* Date Badge */}
                          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 text-center shadow-lg">
                            <div className="text-2xl font-bold text-primary">{eventDate.day}</div>
                            <div className="text-xs font-semibold text-gray-600 uppercase">{eventDate.month}</div>
                          </div>

                          {/* Time Badge */}
                          <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm rounded-full px-3 py-1">
                            <span className="text-xs font-medium text-white">{getTimeAgo(event.createdAt)}</span>
                          </div>
                        </div>

                        {/* Event Content */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-black dark:text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {event.activity}
                          </h3>

                          <p className="text-body-color text-sm mb-4 line-clamp-3">{event.description}</p>

                          {/* Event Meta */}
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-body-color">
                              <Calendar className="w-4 h-4 mr-2 text-primary" />
                              <span>{eventDate.full}</span>
                            </div>
                            {event.place && (
                              <div className="flex items-center text-sm text-body-color">
                                <MapPin className="w-4 h-4 mr-2 text-primary" />
                                <span className="line-clamp-1">{event.place}</span>
                              </div>
                            )}
                          </div>

                          {/* Read More Button */}
                          <div className="flex items-center justify-between">
                            <span className="text-primary font-semibold text-sm group-hover:underline">Learn More</span>
                            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* View All Events Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <Link
                href="/events"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <Calendar className="w-5 h-5 mr-2" />
                View All Events
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}

export default Events
