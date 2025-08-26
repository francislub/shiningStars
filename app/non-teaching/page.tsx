"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Users, Calendar, ArrowRight, RefreshCw } from "lucide-react"

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
  staff: Staff[]
  pagination: {
    total: number
    pages: number
    currentPage: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export default function NonTeachingPage() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const fetchStaff = async (pageNum = 1) => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/non-teaching?limit=6&page=${pageNum}`)

      if (!response.ok) {
        throw new Error("Failed to fetch non-teaching staff")
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
    fetchStaff()
  }, [])

  const handleRetry = () => {
    fetchStaff(page)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading non-teaching staff...</p>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto p-6"
        >
          <div className="bg-red-100 rounded-full p-3 w-16 h-16 mx-auto mb-4">
            <Users className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Staff</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={handleRetry} className="bg-purple-600 hover:bg-purple-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Non-Teaching Staff</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our essential support team members who keep our school running smoothly
          </p>
          <div className="flex items-center justify-center mt-4">
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              <Users className="h-4 w-4 mr-1" />
              {data?.pagination.total || 0} Staff Members
            </Badge>
          </div>
        </motion.div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {data?.staff.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-semibold text-gray-900 mb-2">{member.name}</CardTitle>
                      <Badge variant="outline" className="text-purple-600 border-purple-200">
                        {member.staffType}
                      </Badge>
                    </div>
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center text-white font-semibold text-lg ml-4">
                      {member.photo ? (
                        <img
                          src={member.photo || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        member.name.charAt(0)
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(member.createdAt).toLocaleDateString()}
                    </div>
                    <Link href={`/non-teaching/${member.id}`}>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
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
            <Button variant="outline" disabled={!data.pagination.hasPrev} onClick={() => fetchStaff(page - 1)}>
              Previous
            </Button>
            <span className="px-4 py-2 text-sm text-gray-600">
              Page {data.pagination.currentPage} of {data.pagination.pages}
            </span>
            <Button variant="outline" disabled={!data.pagination.hasNext} onClick={() => fetchStaff(page + 1)}>
              Next
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
