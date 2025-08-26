"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, ArrowLeft, User, Calendar, GraduationCap } from "lucide-react"

interface Staff {
  id: string
  name: string
  staffType: string
  photo: string
  createdAt: string
  updatedAt: string
  creator?: {
    name: string
    email: string
  }
}

export default function TeachingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [staff, setStaff] = useState<Staff | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch(`/api/teaching/${params.id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch staff details")
        }
        const data = await response.json()
        setStaff(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchStaff()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading staff details...</p>
        </motion.div>
      </div>
    )
  }

  if (error || !staff) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Staff Not Found</h2>
          <p className="text-gray-600 mb-4">{error || "The requested staff member could not be found."}</p>
          <Button onClick={() => router.back()} className="bg-green-600 hover:bg-green-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Button onClick={() => router.back()} variant="outline" className="mb-6 bg-white/80 backdrop-blur-sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Teaching Staff
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center pb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-4xl mx-auto mb-4">
                {staff.photo ? (
                  <img
                    src={staff.photo || "/placeholder.svg"}
                    alt={staff.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  staff.name.charAt(0)
                )}
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2">{staff.name}</CardTitle>
              <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
                <GraduationCap className="h-5 w-5 mr-2" />
                {staff.staffType}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              {staff.creator && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Added By
                  </h3>
                  <p className="text-gray-700">{staff.creator.name}</p>
                  <p className="text-gray-600 text-sm">{staff.creator.email}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Created
                  </h3>
                  <p className="text-gray-700">{new Date(staff.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Last Updated
                  </h3>
                  <p className="text-gray-700">{new Date(staff.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
