import { getEventById, getEvents } from "@/lib/api"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Calendar, MapPin, User, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import CommentsList from "@/components/Comments/CommentsList"
import CommentForm from "@/components/Comments/CommentForm"
import RelatedContent from "@/components/Sidebar/RelatedContent"

type Props = {
  params: {
    id: string
  }
}

export default async function EventPage({ params }: Props) {
  const { id } = params
  const event = await getEventById(id)

  if (!event) {
    return notFound()
  }

  return (
    <div className="pt-[120px] pb-[120px]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                {/* Hero Image */}
                <div className="relative h-64 md:h-80 overflow-hidden rounded-t-lg">
                  {event.photos.length > 0 ? (
                    <Image
                      src={event.photos[0] || "/placeholder.svg"}
                      alt={event.activity}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                      <Calendar className="h-24 w-24 text-primary" />
                    </div>
                  )}
                </div>

                <div className="p-6 md:p-8">
                  {/* Title */}
                  <h1 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">{event.activity}</h1>

                  {/* Event Meta */}
                  <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      <span>{event.place}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      <span>{new Date(event.createdAt).toLocaleDateString()}</span>
                    </div>
                    {event.creator && (
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        <span>By {event.creator.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Additional Images */}
                  {event.photos.length > 1 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4">Event Gallery</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {event.photos.slice(1).map((photo, index) => (
                          <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                            <Image
                              src={photo || "/placeholder.svg"}
                              alt={`${event.activity} - Image ${index + 2}`}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <div className="prose max-w-none">
                    <div className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: event.description }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <CommentsList comments={event.comments} />
            <CommentForm itemId={event.id} itemType="events" />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <RelatedContent currentId={event.id} type="events" />

            {/* Event Details Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Event Details</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-sm text-gray-600">{event.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-gray-600">{event.place}</p>
                    </div>
                  </div>
                  {event.creator && (
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Organizer</p>
                        <p className="text-sm text-gray-600">{event.creator.name}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const events = await getEvents()
  return events.map((event) => ({
    id: event.id,
  }))
}
