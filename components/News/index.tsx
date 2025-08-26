"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Newspaper, Clock, User, ArrowRight, Loader2, Tag } from "lucide-react"

interface NewsItem {
  id: string
  title: string
  description: string
  photos?: string[]
  createdAt: string
  category?: string
}

const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/news?limit=3")
      const data = await response.json()

      if (data.success) {
        setNews(data.news)
      } else {
        setError(data.error || "Failed to fetch news")
      }
    } catch (err) {
      setError("Failed to load news")
      console.error("Error fetching news:", err)
    } finally {
      setLoading(false)
    }
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just published"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  const getReadingTime = (description: string) => {
    const wordsPerMinute = 200
    const wordCount = description.split(" ").length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readingTime} min read`
  }

  if (loading) {
    return (
      <section className="py-16 md:py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Latest News</h2>
            <p className="text-lg text-body-color">Stay informed with the latest updates from our school</p>
          </div>
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-body-color">Loading news...</span>
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
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Latest News</h2>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <p className="text-red-600 dark:text-red-400">{error}</p>
              <button
                onClick={fetchNews}
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
    <section className="py-16 md:py-20 lg:py-28">
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
            <Newspaper className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">Latest News & Updates</h2>
          <p className="text-lg text-body-color max-w-2xl mx-auto">
            Stay informed with the latest happenings and achievements at Shining Stars School
          </p>
        </motion.div>

        {news.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No News Available</h3>
            <p className="text-body-color">Check back soon for the latest school news and updates!</p>
          </motion.div>
        ) : (
          <>
            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {news.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link href={`/news/${item.id}`}>
                    <article className="bg-white dark:bg-gray-dark rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
                      {/* News Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={
                            item.photos[0] ||
                            `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(item.title) || "/placeholder.svg"}`
                          }
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Category Badge */}
                        {item.category && (
                          <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm rounded-full px-3 py-1">
                            <span className="text-xs font-medium text-white flex items-center">
                              <Tag className="w-3 h-3 mr-1" />
                              {item.category}
                            </span>
                          </div>
                        )}

                        {/* Time Badge */}
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1">
                          <span className="text-xs font-medium text-gray-700">{getTimeAgo(item.createdAt)}</span>
                        </div>
                      </div>

                      {/* News Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-black dark:text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </h3>

                        <p className="text-body-color text-sm mb-4 line-clamp-3 flex-1">{item.description}</p>

                        {/* News Meta */}
                        <div className="flex items-center justify-between text-xs text-body-color mb-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{getReadingTime(item.description)}</span>
                          </div>
                          <div className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            <span>Shining Stars</span>
                          </div>
                        </div>

                        {/* Read More Button */}
                        <div className="flex items-center justify-between">
                          <span className="text-primary font-semibold text-sm group-hover:underline">
                            Read Full Story
                          </span>
                          <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* View All News Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <Link
                href="/news"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <Newspaper className="w-5 h-5 mr-2" />
                View All News
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}

export default News
