"use client"
import { useEffect, useState } from "react"
import Breadcrumb from "@/components/Common/Breadcrumb"
import Contact from "@/components/Contact"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react"

interface Event {
  id: string
  activity: string
  description: string
  date: string
  place: string
  photos: string[]
  createdAt: string
  comments: any[]
  creator?: { name: string }
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 9

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/events")

        if (!response.ok) {
          throw new Error("Failed to fetch events")
        }

        const data = await response.json()
        setEvents(data)
      } catch (err: any) {
        setError(err.message)
        console.error("Error fetching events:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent)
  const totalPages = Math.ceil(events.length / eventsPerPage)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  if (loading) {
    return (
      <>
        <Breadcrumb
          pageName="Shining Stars Events"
          description="Welcome to Shining Stars events! Here, you'll find exciting activities and happenings from our school community."
        />
        <section className="pt-[120px] pb-[120px]">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Breadcrumb pageName="Shining Stars Events" description="Welcome to Shining Stars events!" />
        <section className="pt-[120px] pb-[120px]">
          <div className="container">
            <Card className="text-center p-8">
              <CardContent>
                <p className="text-red-600 mb-4">Error loading events: {error}</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <Breadcrumb
        pageName="Shining Stars Events"
        description="Welcome to Shining Stars events! Here, you'll find exciting activities and happenings from our school community."
      />

      <section className="pt-[120px] pb-[120px]">
        <div className="container">
          {events.length === 0 ? (
            <Card className="text-center p-8">
              <CardContent>
                <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Events Found</h3>
                <p className="text-gray-600">There are currently no events to display. Check back later for updates!</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentEvents.map((event) => (
                  <Card key={event.id} className="group hover:shadow-lg transition-shadow duration-300">
                    <div className="relative overflow-hidden rounded-t-lg">
                      {event.photos.length > 0 ? (
                        <img
                          src={event.photos[0] || "/placeholder.svg"}
                          alt={event.activity}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                          <Calendar className="h-16 w-16 text-primary" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                        {event.activity}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <MapPin className="h-4 w-4" />
                        <span>{event.place}</span>
                      </div>
                      <p className="text-gray-700 mb-4 line-clamp-3">
                        {event.description.replace(/<[^>]*>/g, "").substring(0, 150)}...
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {event.comments.length} comment{event.comments.length !== 1 ? "s" : ""}
                        </span>
                        <Button asChild size="sm">
                          <a href={`/events/${event.id}`}>Read More</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center pt-8 space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>

                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <Button
                          key={pageNumber}
                          variant={currentPage === pageNumber ? "default" : "outline"}
                          size="sm"
                          onClick={() => paginate(pageNumber)}
                        >
                          {pageNumber}
                        </Button>
                      )
                    } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                      return (
                        <span key={pageNumber} className="px-2">
                          ...
                        </span>
                      )
                    }
                    return null
                  })}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <Contact />
    </>
  )
}
