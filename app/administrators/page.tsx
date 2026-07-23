"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Playfair_Display, Inter } from "next/font/google"
import { motion } from "framer-motion"
import { Loader2, ArrowRight, RefreshCw, AlertCircle } from "lucide-react"

const serif = Playfair_Display({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-serif" })
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" })

interface Administrator {
  id: string
  title: string
  name: string
  message: string
  description: string
  photos: string[]
  createdAt: string
  creator?: {
    name: string
    email: string
  }
}

interface ApiResponse {
  administrators: Administrator[]
  pagination: {
    total: number
    pages: number
    currentPage: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Plain-text preview only — strips rich-text HTML so raw tags never render in the card grid.
// The detail page renders the real HTML instead.
function stripHtml(html: string) {
  if (!html) return ""
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim()
}

export default function AdministratorsPage() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const fetchAdministrators = async (pageNum = 1) => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/administrators?limit=6&page=${pageNum}`)

      if (!response.ok) {
        throw new Error("Failed to fetch administrators")
      }

      const result = await response.json()
      setData(result)
      setPage(pageNum)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdministrators()
  }, [])

  const handleRetry = () => fetchAdministrators(page)

  if (loading) {
    return (
      <div className={`${serif.variable} ${sans.variable} min-h-screen bg-[#F8F6F1] flex items-center justify-center font-sans`}>
        <div className="text-center">
          <Loader2 className="h-9 w-9 animate-spin text-[#A9822F] mx-auto mb-4" strokeWidth={1.5} />
          <p className="text-[#4B5563] text-sm tracking-wide">Loading directory…</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`${serif.variable} ${sans.variable} min-h-screen bg-[#F8F6F1] flex items-center justify-center font-sans px-6`}>
        <div className="text-center max-w-sm mx-auto">
          <div className="w-14 h-14 rounded-full border border-[#E4DFD3] bg-white flex items-center justify-center mx-auto mb-5">
            <AlertCircle className="h-6 w-6 text-[#16233D]" strokeWidth={1.5} />
          </div>
          <h2 className="font-serif text-xl text-[#16233D] mb-2">Directory unavailable</h2>
          <p className="text-[#4B5563] text-sm mb-6 leading-relaxed">{error}</p>
          <button
            onClick={handleRetry}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#16233D] border border-[#16233D] px-5 py-2.5 rounded-sm hover:bg-[#16233D] hover:text-white transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.5} />
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${serif.variable} ${sans.variable} min-h-screen bg-[#F8F6F1] font-sans`}>
      {/* Header band */}
      <div className="bg-[#16233D] border-b-2 border-[#A9822F]">
        <div className="container mx-auto px-6 py-16 md:py-20 text-center">
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#A9822F] font-medium">
            Leadership Directory
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-white mt-3 mb-4">School Administration</h1>
          <p className="text-white/70 max-w-xl mx-auto leading-relaxed text-[15px]">
            The people guiding our school's mission, standards, and daily care of every student.
          </p>
          {data?.pagination.total ? (
            <p className="text-white/50 text-xs tracking-wide mt-6 uppercase">
              {data.pagination.total} {data.pagination.total === 1 ? "Administrator" : "Administrators"}
            </p>
          ) : null}
        </div>
      </div>

      <div className="container mx-auto px-6 py-14 md:py-20">
        {/* Directory grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.administrators.map((admin, index) => (
            <motion.div
              key={admin.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
            >
              <Link href={`/administrators/${admin.id}`} className="group block">
                <article className="bg-white border border-[#E4DFD3] rounded-sm overflow-hidden transition-shadow hover:shadow-[0_8px_30px_rgba(22,35,61,0.08)]">
                  {/* Portrait — object-contain so the full photo always shows, never cropped in half */}
                  <div className="relative h-48 md:h-52 w-full overflow-hidden bg-[#EFEBE2] shrink-0 flex items-center justify-center border-b border-[#E4DFD3]">
                    {admin.photos.length > 0 ? (
                      <img
                        src={admin.photos[0] || "/placeholder.svg"}
                        alt={admin.name}
                        className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#16233D]">
                        <span className="font-serif text-4xl text-[#A9822F]">{admin.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#A9822F] font-semibold">
                      {admin.title}
                    </span>
                    <h2 className="font-serif text-2xl text-[#16233D] mt-1.5 mb-3 leading-tight">{admin.name}</h2>
                    <p className="text-[#4B5563] text-sm leading-relaxed line-clamp-3 mb-5">
                      {stripHtml(admin.description)}
                    </p>
                    <div className="flex items-center justify-between border-t border-[#E4DFD3] pt-4">
                      <span className="text-xs text-[#9CA3AF]">
                        Since {new Date(admin.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short" })}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-[#16233D] group-hover:text-[#A9822F] transition-colors">
                        View profile
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {data?.administrators.length === 0 && (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-[#16233D] mb-2">No administrators listed yet</p>
            <p className="text-[#4B5563] text-sm">Check back soon — this directory is updated regularly.</p>
          </div>
        )}

        {/* Pagination */}
        {data && data.pagination.pages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-16">
            <button
              disabled={!data.pagination.hasPrev}
              onClick={() => fetchAdministrators(page - 1)}
              className="text-sm font-medium text-[#16233D] disabled:text-[#C4C4C4] disabled:cursor-not-allowed hover:text-[#A9822F] transition-colors"
            >
              ← Previous
            </button>
            <span className="text-xs tracking-widest uppercase text-[#9CA3AF]">
              {data.pagination.currentPage} / {data.pagination.pages}
            </span>
            <button
              disabled={!data.pagination.hasNext}
              onClick={() => fetchAdministrators(page + 1)}
              className="text-sm font-medium text-[#16233D] disabled:text-[#C4C4C4] disabled:cursor-not-allowed hover:text-[#A9822F] transition-colors"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}