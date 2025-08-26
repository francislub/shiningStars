"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react"

interface RelatedItem {
  id: string
  title?: string
  activity?: string
  description: string
  date?: string
  place?: string
  photos: string[]
  createdAt: string
}

interface RelatedContentProps {
  items: RelatedItem[]
  type: "events" | "news"
  title: string
}

export default function RelatedContent({ items, type, title }: RelatedContentProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <ArrowRight className="w-5 h-5 text-primary" />
        {title}
      </h3>

      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={`/${type}/${item.id}`}
              className="block group hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg p-3 transition-colors duration-200"
            >
              <div className="flex gap-3">
                {item.photos && item.photos.length > 0 && (
                  <div className="flex-shrink-0">
                    <Image
                      src={item.photos[0] || "/placeholder.svg"}
                      alt={item.title || item.activity || ""}
                      width={60}
                      height={60}
                      className="w-15 h-15 object-cover rounded-lg"
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-200 line-clamp-2 mb-1">
                    {item.title || item.activity}
                  </h4>

                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">{item.description}</p>

                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    {type === "events" && item.date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </div>
                    )}

                    {type === "events" && item.place && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.place}
                      </div>
                    )}

                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Link
          href={`/${type}`}
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors duration-200"
        >
          View All {title}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  )
}
