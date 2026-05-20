"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaBriefcase, FaMapMarkerAlt, FaUsers, FaGraduationCap,
  FaCalendarAlt, FaSearch, FaFilter, FaTimes, FaArrowRight,
  FaMoneyBillWave, FaClock, FaTag,
} from "react-icons/fa"
import { HiSparkles } from "react-icons/hi"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Job {
  id: string
  title: string
  department: string
  category: string
  employmentType: string
  location: string
  vacancies: number
  salaryMin: number | null
  salaryMax: number | null
  minimumQualification: string
  experienceRequired: string | null
  applicationDeadline: string
  status: string
  createdAt: string
  _count?: { applications: number }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-UG", {
      day: "numeric", month: "short", year: "numeric",
    })
  } catch { return "—" }
}

function fmtSalary(min: number | null, max: number | null): string | null {
  if (!min && !max) return null
  const f = (n: number) => "UGX " + n.toLocaleString("en-UG", { maximumFractionDigits: 0 })
  if (min && max) return `${f(min)} – ${f(max)}`
  if (min) return `From ${f(min)}`
  return `Up to ${f(max!)}`
}

function label(str: string) {
  return str.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

function daysUntil(iso: string) {
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000)
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  "TEACHING", "ADMINISTRATION", "SUPPORT_STAFF", "MANAGEMENT",
  "IT", "FINANCE", "SECURITY", "CLEANING", "OTHER",
]

const EMPLOYMENT_TYPES = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"]

const CAT_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  TEACHING:       { bg: "bg-sky-100",     text: "text-sky-700",     dot: "bg-sky-400" },
  ADMINISTRATION: { bg: "bg-violet-100",  text: "text-violet-700",  dot: "bg-violet-400" },
  SUPPORT_STAFF:  { bg: "bg-teal-100",    text: "text-teal-700",    dot: "bg-teal-400" },
  MANAGEMENT:     { bg: "bg-indigo-100",  text: "text-indigo-700",  dot: "bg-indigo-400" },
  IT:             { bg: "bg-cyan-100",    text: "text-cyan-700",    dot: "bg-cyan-400" },
  FINANCE:        { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-400" },
  SECURITY:       { bg: "bg-slate-100",   text: "text-slate-700",   dot: "bg-slate-400" },
  CLEANING:       { bg: "bg-lime-100",    text: "text-lime-700",    dot: "bg-lime-400" },
  OTHER:          { bg: "bg-orange-100",  text: "text-orange-700",  dot: "bg-orange-400" },
}

// ─── Job Card ─────────────────────────────────────────────────────────────────

function JobCard({ job, index }: { job: Job; index: number }) {
  const days = daysUntil(job.applicationDeadline)
  const urgent = days <= 7 && days >= 0
  const closed = days < 0
  const salary = fmtSalary(job.salaryMin, job.salaryMax)
  const cat = CAT_COLORS[job.category] || { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-400" }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 overflow-hidden"
    >
      <div className="p-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${cat.bg} ${cat.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
                {label(job.category)}
              </span>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                {label(job.employmentType)}
              </span>
              {urgent && !closed && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  {days === 0 ? "Closes Today" : `${days}d left`}
                </span>
              )}
              {closed && (
                <span className="text-[11px] font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                  Closed
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-blue-700 transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">{job.department}</p>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1.5">
            <FaMapMarkerAlt size={10} className="text-gray-400" />
            {job.location}
          </span>
          <span className="flex items-center gap-1.5">
            <FaUsers size={10} className="text-gray-400" />
            {job.vacancies} vacanc{job.vacancies === 1 ? "y" : "ies"}
          </span>
          <span className="flex items-center gap-1.5">
            <FaGraduationCap size={10} className="text-gray-400" />
            {job.minimumQualification}
          </span>
          {job.experienceRequired && (
            <span className="flex items-center gap-1.5">
              <FaClock size={10} className="text-gray-400" />
              {job.experienceRequired}
            </span>
          )}
        </div>

        {/* Salary */}
        {salary && (
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
              <FaMoneyBillWave size={10} />
              {salary} / month
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <span className="text-xs text-gray-400 flex items-center gap-1.5">
            <FaCalendarAlt size={10} />
            Deadline: {fmtDate(job.applicationDeadline)}
          </span>
          <Link
            href={`/jobs/${job.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            View Details <FaArrowRight size={9} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function JobsListingPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [employmentType, setEmploymentType] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const fetchJobs = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (search)         params.set("search", search)
      if (category)       params.set("category", category)
      if (employmentType) params.set("employmentType", employmentType)

      const res = await fetch(`/api/careers/jobs/public?${params.toString()}`)
      const json = await res.json()
      if (!json.success) throw new Error(json.error || "Failed to load jobs")
      setJobs(json.data)
      setTotal(json.total)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [search, category, employmentType])

  useEffect(() => {
    const t = setTimeout(fetchJobs, 300)
    return () => clearTimeout(t)
  }, [fetchJobs])

  const activeFilters = [category, employmentType].filter(Boolean).length

  return (
    <div className="min-h-screen bg-[#f8faff]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a3a6e] via-[#1e4db7] to-[#2d62d4] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 pt-14 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-200 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <HiSparkles size={12} /> Career Opportunities
            </div>
            <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-3">
              Find Your <span className="text-blue-300">Next Role</span>
            </h1>
            <p className="text-blue-200 text-lg mb-8">
              Explore open positions and join our team.
            </p>

            {/* Search bar */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title, department, or location…"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white text-gray-800 text-sm font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400/40"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <FaTimes size={12} />
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm shadow-lg transition-colors ${
                  showFilters ? "bg-white text-blue-700" : "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                }`}
              >
                <FaFilter size={12} />
                Filters
                {activeFilters > 0 && (
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {activeFilters}
                  </span>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter bar */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white border-b border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[180px]">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{label(c)}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1 min-w-[180px]">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Employment Type</label>
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400"
                >
                  <option value="">All Types</option>
                  {EMPLOYMENT_TYPES.map((t) => (
                    <option key={t} value={t}>{label(t)}</option>
                  ))}
                </select>
              </div>
              {(category || employmentType) && (
                <button
                  onClick={() => { setCategory(""); setEmploymentType("") }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-700 mt-5"
                >
                  <FaTimes size={10} /> Clear filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Results header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {loading ? "Loading…" : `${total} Position${total !== 1 ? "s" : ""} Available`}
            </h2>
            {(search || category || employmentType) && !loading && (
              <p className="text-xs text-gray-400 mt-0.5">Filtered results</p>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-5 text-center mb-6">
            <p className="text-sm text-red-600 font-medium">{error}</p>
            <button onClick={fetchJobs} className="mt-2 text-xs text-red-500 underline">Try again</button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
                <div className="flex gap-2 mb-3">
                  <div className="h-5 w-20 bg-gray-100 rounded-full" />
                  <div className="h-5 w-16 bg-gray-100 rounded-full" />
                </div>
                <div className="h-5 w-3/4 bg-gray-100 rounded-lg mb-2" />
                <div className="h-4 w-1/2 bg-gray-100 rounded-lg mb-4" />
                <div className="flex gap-3 mb-4">
                  <div className="h-3 w-20 bg-gray-100 rounded" />
                  <div className="h-3 w-16 bg-gray-100 rounded" />
                </div>
                <div className="pt-3 border-t border-gray-50 flex justify-between">
                  <div className="h-3 w-24 bg-gray-100 rounded" />
                  <div className="h-6 w-20 bg-gray-100 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Jobs grid */}
        {!loading && !error && jobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {jobs.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && jobs.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaBriefcase className="text-gray-300" size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-700 mb-2">No positions found</h3>
            <p className="text-gray-400 text-sm mb-5">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={() => { setSearch(""); setCategory(""); setEmploymentType("") }}
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}