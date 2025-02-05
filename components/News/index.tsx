import { useEffect, useState } from "react"
import SectionTitle from "../Common/SectionTitle"
import SingleNews from "./SingleNews"
import Link from "next/link"

const News = () => {
  const [news, setNews] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://shining-stars-dashboard.onrender.com/api/v1/news", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Network response was not ok")
        }

        const data = await response.json()
        const reversedData = data.slice(0).reverse()
        setNews(reversedData.slice(0, 3)) // Only take the 3 most recent news items
      } catch (err) {
        setError(err.message)
      }
    }

    fetchPosts()
  }, [])

  return (
    <section id="blog" className="bg-primary/5 py-16 md:py-20 lg:py-28 -mt-20">
      <div className="container">
        <SectionTitle title="Latest News" paragraph="Stay up-to-date with the latest news at our school!" center />

        {error && <p className="text-red-500 text-center mb-8">Error: {error}</p>}

        <div className="space-y-8 mb-8">
          {news.map((post) => (
            <div key={post.id} className="w-full">
              <SingleNews post={post} />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/all-news" passHref>
            <div className="inline-block bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300">
              View More
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default News

