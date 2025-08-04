"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Clock } from "lucide-react"

interface RelatedItem {
  id: string
  title?: string
  activity?: string
  description: string
  photos: string[]
  date?: string
  place?: string
  createdAt: string
}

interface RelatedContentProps {
  currentId: string
  type: "events" | "news"
  limit?: number
}

export default function RelatedContent({ currentId, type, limit = 5 }: RelatedContentProps) {
  const [items, setItems] = useState<RelatedItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedContent = async () => {
      try {
        const response = await fetch(`/api/${type}`)
        if (response.ok) {
          const data = await response.json()
          // Filter out current item and limit results
          const filtered = data.filter((item: RelatedItem) => item.id !== currentId).slice(0, limit)
          setItems(filtered)
        }
      } catch (error) {
        console.error("Error fetching related content:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedContent()
  }, [currentId, type, limit])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Related {type === "events" ? "Events" : "News"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Related {type === "events" ? "Events" : "News"}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-4">No related content found.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Related {type === "events" ? "Events" : "News"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/${type}/${item.id}`}
            className="block group hover:bg-gray-50 p-3 rounded-lg transition-colors"
          >
            <div className="flex gap-3">
              {item.photos.length > 0 && (
                <div className="flex-shrink-0">
                  <Image
                    src={item.photos[0] || "/placeholder.svg"}
                    alt={item.title || item.activity || ""}
                    width={80}
                    height={60}
                    className="rounded object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm group-hover:text-primary line-clamp-2">
                  {type === "events" ? item.activity : item.title}
                </h4>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {item.description.replace(/<[^>]*>/g, "").substring(0, 100)}...
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  {type === "events" ? (
                    <>
                      <Calendar className="h-3 w-3" />
                      <span>{item.date}</span>
                      {item.place && (
                        <>
                          <MapPin className="h-3 w-3 ml-2" />
                          <span>{item.place}</span>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <Clock className="h-3 w-3" />
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
        <Link
          href={`/${type}`}
          className="block text-center text-primary hover:text-primary/80 text-sm font-medium py-2"
        >
          View All {type === "events" ? "Events" : "News"} →
        </Link>
      </CardContent>
    </Card>
  )
}
