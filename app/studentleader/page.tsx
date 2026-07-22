"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Award,
  Calendar,
  ArrowRight,
  RefreshCw,
  MapPin,
  Search,
  Users,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"

interface Prefect {
  id: string
  name: string
  gender: string
  title: string
  grade?: string
  residence?: string
  photo?: string
  createdAt: string
  creator?: {
    name: string
    email: string
  }
}

interface ApiResponse {
  prefects: Prefect[]
  pagination: {
    total: number
    pages: number
    currentPage: number
    hasNext: boolean
    hasPrev: boolean
  }
}

const PAGE_SIZE = 6

export default function StudentLeaderPage() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchPrefects = useCallback(async (pageNum: number, searchQuery: string) => {
    try {
      setLoading(true)
      setError(null)
      const params = new URLSearchParams({
        limit: String(PAGE_SIZE),
        page: String(pageNum),
      })
      if (searchQuery) params.append("search", searchQuery)

      const response = await fetch(`/api/studentleader?${params.toString()}`)

      if (!response.ok) {
        throw new Error("Failed to fetch student leaders")
      }

      const result = await response.json()
      setData(result)
      setPage(pageNum)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial load
  useEffect(() => {
    fetchPrefects(1, "")
  }, [fetchPrefects])

  // Debounce search input -> triggers refetch from page 1
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setSearch(searchInput)
    }, 400)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [searchInput])

  // Refetch when the debounced search term changes (skip the very first render)
  const isFirstSearchRun = useRef(true)
  useEffect(() => {
    if (isFirstSearchRun.current) {
      isFirstSearchRun.current = false
      return
    }
    fetchPrefects(1, search)
  }, [search, fetchPrefects])

  const handleRetry = () => fetchPrefects(page, search)
  const goToPage = (p: number) => fetchPrefects(p, search)
  const clearSearch = () => setSearchInput("")

  const prefects = data?.prefects ?? []
  const pagination = data?.pagination

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto p-8 bg-white rounded-xl border border-slate-200 shadow-sm"
        >
          <div className="bg-red-50 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Award className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Unable to Load Student Leaders</h2>
          <p className="text-slate-600 mb-6 text-sm">{error}</p>
          <Button onClick={handleRetry} className="bg-slate-900 hover:bg-slate-800 text-white">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-3">Student Leaders</h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Recognizing our outstanding student prefects who demonstrate leadership, responsibility, and excellence.
          </p>
          <div className="flex items-center justify-center mt-5">
            <Badge variant="secondary" className="bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1">
              <Award className="h-4 w-4 mr-1.5" />
              {loading ? "…" : pagination?.total ?? 0} Student Leaders
            </Badge>
          </div>
        </motion.div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by name, title, grade, or residence..."
              className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:border-slate-400 transition"
            />
            {searchInput && (
              <button
                onClick={clearSearch}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Top Pagination */}
        {!loading && pagination && pagination.pages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center gap-2 mb-8"
          >
            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.hasPrev}
              onClick={() => goToPage(page - 1)}
              className="border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <span className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-white rounded-md border border-slate-200 shadow-sm">
              Page {pagination.currentPage} of {pagination.pages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.hasNext}
              onClick={() => goToPage(page + 1)}
              className="border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </motion.div>
        )}

        {/* Prefects Grid */}
        <div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="h-56 border border-slate-200 bg-white/70 animate-pulse shadow-sm" />
              ))}
            </div>
          ) : prefects.length === 0 ? (
            <Card className="border border-slate-200 bg-white shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <Users className="h-12 w-12 text-slate-300 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No leaders found</h3>
                <p className="text-slate-600 max-w-sm text-sm">
                  {search
                    ? `Nothing matches "${search}". Try a different name, title, grade, or residence.`
                    : "There are no student leaders to show yet."}
                </p>
                {search && (
                  <Button variant="outline" className="mt-4 border-slate-200 text-slate-700" onClick={clearSearch}>
                    Clear search
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {prefects.map((prefect, index) => (
                  <motion.div
                    key={prefect.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="h-full hover:shadow-md transition-shadow duration-300 border border-slate-200 bg-white">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-xl font-semibold text-slate-900 mb-2 truncate">
                              {prefect.name}
                            </CardTitle>
                            <Badge variant="outline" className="text-orange-700 border-orange-200 bg-orange-50 mb-2">
                              {prefect.title}
                            </Badge>
                            <div className="flex items-center gap-2 text-sm text-slate-600 flex-wrap">
                              <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                                {prefect.gender}
                              </Badge>
                              {prefect.grade && (
                                <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                                  {prefect.grade}
                                </Badge>
                              )}
                            </div>
                          </div>
                          {/* Larger avatar */}
                          <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-semibold text-2xl shrink-0 ring-2 ring-slate-100">
                            {prefect.photo ? (
                              <img
                                src={prefect.photo || "/placeholder.svg"}
                                alt={prefect.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              prefect.name.charAt(0)
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {prefect.residence && (
                          <div className="flex items-center text-sm text-slate-600 mb-4">
                            <MapPin className="h-4 w-4 mr-2 text-slate-400" />
                            {prefect.residence}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-slate-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(prefect.createdAt).toLocaleDateString()}
                          </div>
                          <Link href={`/studentleader/${prefect.id}`}>
                            {/* Dark text on button */}
                            <Button
                              size="sm"
                              className="bg-orange-100 hover:bg-orange-200 text-slate-900 font-semibold border border-orange-200 shadow-none"
                            >
                              View Details
                              <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Bottom Pagination */}
          {!loading && pagination && pagination.pages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <Button
                variant="outline"
                size="sm"
                disabled={!pagination.hasPrev}
                onClick={() => goToPage(page - 1)}
                className="border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <span className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-white rounded-md border border-slate-200 shadow-sm">
                Page {pagination.currentPage} of {pagination.pages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={!pagination.hasNext}
                onClick={() => goToPage(page + 1)}
                className="border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}