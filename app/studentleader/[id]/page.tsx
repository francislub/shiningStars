"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, ArrowLeft, Calendar, Award, MapPin, GraduationCap } from "lucide-react"

interface StudentLeader {
  id: string
  name: string
  gender: string
  title: string
  grade?: string
  residence?: string
  photo?: string
  createdAt: string
  updatedAt: string
  creator?: {
    name: string
    email: string
  }
}

export default function StudentLeaderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [leader, setLeader] = useState<StudentLeader | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLeader = async () => {
      try {
        const response = await fetch(`/api/studentleader/${params.id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch student leader details")
        }
        const data = await response.json()
        setLeader(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchLeader()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-slate-700 mx-auto mb-4" />
          <p className="text-slate-600 font-medium text-sm">Loading student leader details...</p>
        </motion.div>
      </div>
    )
  }

  if (error || !leader) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto p-8 bg-white rounded-xl border border-slate-200 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Student Leader Not Found</h2>
          <p className="text-slate-600 mb-6 text-sm">
            {error || "The requested student leader could not be found."}
          </p>
          <Button onClick={() => router.back()} className="bg-slate-900 hover:bg-slate-800 text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="mb-6 bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Student Leaders
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="max-w-2xl mx-auto bg-white border border-slate-200 shadow-md">
            <CardHeader className="text-center pb-6 border-b border-slate-100">
              {/* Larger avatar */}
              <div className="w-40 h-40 rounded-full overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-bold text-5xl mx-auto mb-5 ring-4 ring-slate-100">
                {leader.photo ? (
                  <img
                    src={leader.photo || "/placeholder.svg"}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  leader.name.charAt(0)
                )}
              </div>
              <CardTitle className="text-3xl font-bold tracking-tight text-slate-900 mb-3">{leader.name}</CardTitle>
              <Badge className="bg-orange-50 text-orange-700 border border-orange-200 text-base px-4 py-1.5">
                <Award className="h-4 w-4 mr-2" />
                {leader.title}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                  <h3 className="font-semibold text-slate-900 mb-1.5 text-sm uppercase tracking-wide text-slate-500">
                    Gender
                  </h3>
                  <p className="text-slate-800 font-medium">{leader.gender}</p>
                </div>
                {leader.grade && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <h3 className="font-semibold text-slate-500 mb-1.5 text-sm uppercase tracking-wide flex items-center">
                      <GraduationCap className="h-4 w-4 mr-1.5" />
                      Grade
                    </h3>
                    <p className="text-slate-800 font-medium">{leader.grade}</p>
                  </div>
                )}
                {leader.residence && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <h3 className="font-semibold text-slate-500 mb-1.5 text-sm uppercase tracking-wide flex items-center">
                      <MapPin className="h-4 w-4 mr-1.5" />
                      Residence
                    </h3>
                    <p className="text-slate-800 font-medium">{leader.residence}</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                  <h3 className="font-semibold text-slate-500 mb-1.5 text-sm uppercase tracking-wide flex items-center">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    Created
                  </h3>
                  <p className="text-slate-800 font-medium">{new Date(leader.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                  <h3 className="font-semibold text-slate-500 mb-1.5 text-sm uppercase tracking-wide flex items-center">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    Last Updated
                  </h3>
                  <p className="text-slate-800 font-medium">{new Date(leader.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}