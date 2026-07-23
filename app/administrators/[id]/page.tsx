"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Playfair_Display, Inter } from "next/font/google"
import { motion } from "framer-motion"
import { Loader2, ArrowLeft, Calendar, User, Mail, AlertCircle } from "lucide-react"

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

export default function AdministratorDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [administrator, setAdministrator] = useState<Administrator | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAdministrator = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`/api/administrators/${params.id}`)

        if (!response.ok) {
          throw new Error("Administrator not found")
        }

        const data = await response.json()
        setAdministrator(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchAdministrator()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className={`${serif.variable} ${sans.variable} min-h-screen bg-[#F8F6F1] flex items-center justify-center font-sans`}>
        <div className="text-center">
          <Loader2 className="h-9 w-9 animate-spin text-[#A9822F] mx-auto mb-4" strokeWidth={1.5} />
          <p className="text-[#4B5563] text-sm tracking-wide">Loading profile…</p>
        </div>
      </div>
    )
  }

  if (error || !administrator) {
    return (
      <div className={`${serif.variable} ${sans.variable} min-h-screen bg-[#F8F6F1] flex items-center justify-center font-sans px-6`}>
        <div className="text-center max-w-sm mx-auto">
          <div className="w-14 h-14 rounded-full border border-[#E4DFD3] bg-white flex items-center justify-center mx-auto mb-5">
            <AlertCircle className="h-6 w-6 text-[#16233D]" strokeWidth={1.5} />
          </div>
          <h2 className="font-serif text-xl text-[#16233D] mb-2">Profile not found</h2>
          <p className="text-[#4B5563] text-sm mb-6 leading-relaxed">{error}</p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#16233D] border border-[#16233D] px-5 py-2.5 rounded-sm hover:bg-[#16233D] hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
            Back to directory
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${serif.variable} ${sans.variable} min-h-screen bg-[#F8F6F1] font-sans`}>
      <div className="container mx-auto px-6 py-10 md:py-14 max-w-6xl">
        {/* Back link */}
        <motion.button
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm text-[#4B5563] hover:text-[#16233D] transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          Back to directory
        </motion.button>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16"
        >
          {/* Large portrait */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden bg-[#16233D] border border-[#E4DFD3] lg:sticky lg:top-10">
              {administrator.photos.length > 0 ? (
                <img
                  src={administrator.photos[0] || "/placeholder.svg"}
                  alt={administrator.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-serif text-8xl text-[#A9822F]">{administrator.name.charAt(0)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Identity block */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#A9822F] font-semibold">
              Administrator
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-[#16233D] mt-3 mb-4 leading-tight">
              {administrator.name}
            </h1>
            <div className="inline-flex w-fit items-center border border-[#16233D] text-[#16233D] text-sm px-3 py-1.5 rounded-sm mb-6">
              {administrator.title}
            </div>
            <div className="flex items-center text-sm text-[#9CA3AF] gap-2">
              <Calendar className="h-4 w-4" strokeWidth={1.5} />
              Joined {new Date(administrator.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </motion.div>

        {/* Statement (signature treatment for the "message" content) */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-16 max-w-3xl"
        >
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#A9822F] font-semibold block mb-4">
            A Message From the Office
          </span>
          <div className="relative border-l-2 border-[#A9822F] pl-8 md:pl-10">
            <span className="font-serif text-7xl text-[#A9822F]/25 absolute -top-6 left-3 select-none leading-none">
              "
            </span>
            <div
              className="relative text-[#16233D] text-lg md:text-xl leading-relaxed font-serif [&_p]:mb-4 last:[&_p]:mb-0"
              dangerouslySetInnerHTML={{ __html: administrator.message }}
            />
          </div>
        </motion.section>

        {/* About */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-16 max-w-3xl"
        >
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#A9822F] font-semibold block mb-4">
            About
          </span>
          <div
            className="text-[#4B5563] text-[15px] leading-relaxed [&_p]:mb-4 last:[&_p]:mb-0"
            dangerouslySetInnerHTML={{ __html: administrator.description }}
          />
        </motion.section>

        {/* Photo gallery — larger images */}
        {administrator.photos.length > 1 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-16"
          >
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#A9822F] font-semibold block mb-4">
              Gallery
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {administrator.photos.slice(1).map((photo, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/5] rounded-sm overflow-hidden border border-[#E4DFD3] bg-[#EFEBE2]"
                >
                  <img
                    src={photo || `/placeholder.svg?height=500&width=400&query=administrator photo ${index + 2}`}
                    alt={`${administrator.name} photo ${index + 2}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Creator footnote */}
        {administrator.creator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="border-t border-[#E4DFD3] pt-8 flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-white border border-[#E4DFD3] flex items-center justify-center">
              <User className="h-4 w-4 text-[#4B5563]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm text-[#16233D] font-medium">Listed by {administrator.creator.name}</p>
              <p className="text-xs text-[#9CA3AF] flex items-center gap-1 mt-0.5">
                <Mail className="h-3 w-3" strokeWidth={1.5} />
                {administrator.creator.email}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}