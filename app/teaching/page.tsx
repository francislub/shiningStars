"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, GraduationCap, Calendar, ArrowRight, RefreshCw, User } from "lucide-react"

interface Staff {
  id: string
  name: string
  staffType: string
  photo: string
  createdAt: string
  creator?: {
    name: string
    email: string
  }
}

interface ApiResponse {
  staff: Staff[] // Changed from teachers to staff
  pagination: {
    total: number
    pages: number
    currentPage: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export default function TeachingPage() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const fetchTeachers = async (pageNum = 1) => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/teaching?limit=6&page=${pageNum}`)

      if (!response.ok) {
        throw new Error("Failed to fetch teaching staff")
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
    fetchTeachers()
  }, [])

  const handleRetry = () => {
    fetchTeachers(page)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading teaching staff...</p>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto p-6"
        >
          <div className="bg-red-100 rounded-full p-3 w-16 h-16 mx-auto mb-4">
            <GraduationCap className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Teaching Staff</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={handleRetry} className="bg-green-600 hover:bg-green-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Teaching Staff</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our dedicated educators committed to nurturing young minds and fostering academic excellence
          </p>
          <div className="flex items-center justify-center mt-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <GraduationCap className="h-4 w-4 mr-1" />
              {data?.pagination.total || 0} Teaching Staff
            </Badge>
          </div>
        </motion.div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {data?.staff.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-semibold text-gray-900 mb-2">{teacher.name}</CardTitle>
                      <Badge variant="outline" className="text-green-600 border-green-200 mb-2">
                        {teacher.staffType}
                      </Badge>
                    </div>
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-semibold text-lg ml-4">
                      {teacher.photo ? (
                        <img
                          src={teacher.photo || "/placeholder.svg"}
                          alt={teacher.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        teacher.name.charAt(0)
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Creator Info */}
                  {teacher.creator && (
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        Added by: {teacher.creator.name}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(teacher.createdAt).toLocaleDateString()}
                    </div>
                    <Link href={`/teaching/${teacher.id}`}>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        View Details
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {data && data.pagination.pages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center space-x-2"
          >
            <Button variant="outline" disabled={!data.pagination.hasPrev} onClick={() => fetchTeachers(page - 1)}>
              Previous
            </Button>
            <span className="px-4 py-2 text-sm text-gray-600">
              Page {data.pagination.currentPage} of {data.pagination.pages}
            </span>
            <Button variant="outline" disabled={!data.pagination.hasNext} onClick={() => fetchTeachers(page + 1)}>
              Next
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
