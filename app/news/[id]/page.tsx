import { getNewsById, getNews } from "@/lib/api"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Clock, User, Newspaper } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import CommentsList from "@/components/Comments/CommentsList"
import CommentForm from "@/components/Comments/CommentForm"
import RelatedContent from "@/components/Sidebar/RelatedContent"

type Props = {
  params: {
    id: string
  }
}

export default async function NewsPage({ params }: Props) {
  const { id } = params
  const news = await getNewsById(id)

  if (!news) {
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
                  {news.photos.length > 0 ? (
                    <Image
                      src={news.photos[0] || "/placeholder.svg"}
                      alt={news.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                      <Newspaper className="h-24 w-24 text-primary" />
                    </div>
                  )}
                </div>

                <div className="p-6 md:p-8">
                  {/* Title */}
                  <h1 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">{news.title}</h1>

                  {/* Article Meta */}
                  <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      <span>{new Date(news.createdAt).toLocaleDateString()}</span>
                    </div>
                    {news.creator && (
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        <span>By {news.creator.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Additional Images */}
                  {news.photos.length > 1 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4">Article Gallery</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {news.photos.slice(1).map((photo, index) => (
                          <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                            <Image
                              src={photo || "/placeholder.svg"}
                              alt={`${news.title} - Image ${index + 2}`}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="prose max-w-none">
                    <div className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: news.description }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <CommentsList comments={news.comments} />
            <CommentForm itemId={news.id} itemType="news" />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <RelatedContent currentId={news.id} type="news" />

            {/* Article Info Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Article Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Published</p>
                      <p className="text-sm text-gray-600">
                        {new Date(news.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  {news.creator && (
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Author</p>
                        <p className="text-sm text-gray-600">{news.creator.name}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <Newspaper className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Comments</p>
                      <p className="text-sm text-gray-600">
                        {news.comments.length} comment{news.comments.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
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
  const news = await getNews()
  return news.map((article) => ({
    id: article.id,
  }))
}
