"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Clock, Share2, Loader2, AlertCircle } from "lucide-react"
import Image from "next/image"
import Breadcrumb from "@/components/Common/Breadcrumb"
import CommentForm from "@/components/Comments/CommentForm"
import CommentsList from "@/components/Comments/CommentsList"
import RelatedContent from "@/components/Sidebar/RelatedContent"

interface News {
  id: string
  title: string
  description: string
  photos: string[]
  createdAt: string
  comments: any[]
  creator?: { name: string }
}

export default function NewsDetailPage() {
  const params = useParams()
  const [news, setNews] = useState<News | null>(null)
  const [relatedNews, setRelatedNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchNews(params.id as string)
    }
  }, [params.id])

  const fetchNews = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/news/${id}`)
      if (!response.ok) throw new Error("News not found")

      const data = await response.json()
      setNews(data.news)
      setRelatedNews(data.relatedNews || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleCommentSubmitted = () => {
    // Refresh the news data to get updated comments
    if (params.id) {
      fetchNews(params.id as string)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">News Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Breadcrumb
        pageName={news.title}
        description="News Article"
        links={[
          { href: "/news", label: "News" },
          { href: `/news/${news.id}`, label: news.title },
        ]}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* News Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              {news.photos && news.photos.length > 0 && (
                <div className="relative h-64 md:h-80">
                  <Image src={news.photos[0] || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
                </div>
              )}

              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(news.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">{news.title}</h1>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{news.description}</p>
                </div>

                {news.creator && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Posted by <span className="font-medium">{news.creator.name}</span>
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Photo Gallery */}
            {news.photos && news.photos.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Photo Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {news.photos.slice(1).map((photo, index) => (
                    <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                      <Image
                        src={photo || "/placeholder.svg"}
                        alt={`${news.title} - Photo ${index + 2}`}
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
              <CommentsList comments={news.comments || []} />
              <CommentForm contentId={news.id} contentType="news" onCommentSubmitted={handleCommentSubmitted} />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <RelatedContent items={relatedNews} type="news" title="Related News" />
          </div>
        </div>
      </div>
    </div>
  )
}
