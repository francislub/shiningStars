"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Calendar, MapPin, Clock, Share2, Loader2, AlertCircle } from "lucide-react"
import Image from "next/image"
import Breadcrumb from "@/components/Common/Breadcrumb"
import CommentForm from "@/components/Comments/CommentForm"
import CommentsList from "@/components/Comments/CommentsList"
import RelatedContent from "@/components/Sidebar/RelatedContent"

interface Comment {
  id: string
  author: string
  content: string
  createdAt: string
}

interface Event {
  id: string
  activity: string
  description: string
  date: string
  place: string
  photos: string[]
  createdAt: string
  comments: Comment[]
  creator?: { name: string }
}

interface BreadcrumbLink {
  href: string
  label: string
}

export default function EventDetailPage() {
  const params = useParams()
  const [event, setEvent] = useState<Event | null>(null)
  const [relatedEvents, setRelatedEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchEvent(params.id as string)
    }
  }, [params.id])

  const fetchEvent = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/events/${id}`)
      if (!response.ok) throw new Error("Event not found")

      const data = await response.json()
      setEvent(data.event)
      setRelatedEvents(data.relatedEvents || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleCommentSubmitted = () => {
    if (params.id) fetchEvent(params.id as string)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Event Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Breadcrumb
        pageName={event.activity}
        description="Event Details"
        links={[
          { href: "/events", label: "Events" },
          { href: `/events/${event.id}`, label: event.activity },
        ]}
      />

      <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            {event.photos.length > 0 && (
              <div className="relative h-64 md:h-80">
                <Image
                  src={event.photos[0] || "/placeholder.svg"}
                  alt={event.activity}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1"><Calendar className="w-4 h-4" />{event.date}</div>
                  <div className="flex items-center gap-1"><MapPin className="w-4 h-4" />{event.place}</div>
                  <div className="flex items-center gap-1"><Clock className="w-4 h-4" />{new Date(event.createdAt).toLocaleDateString()}</div>
                </div>

                <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">{event.activity}</h1>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{event.description}</p>
              </div>

              {event.creator && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Posted by <span className="font-medium">{event.creator.name}</span>
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Photo Gallery */}
          {event.photos.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Photo Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {event.photos.slice(1).map((photo, index) => (
                  <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                    <Image
                      src={photo || "/placeholder.svg"}
                      alt={`${event.activity} - Photo ${index + 2}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Comments Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <CommentsList comments={event.comments} />
            <CommentForm contentId={event.id} contentType="event" onCommentSubmitted={handleCommentSubmitted} />
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <RelatedContent items={relatedEvents} type="events" title="Related Events" />
        </div>
      </div>
    </div>
  )
}
