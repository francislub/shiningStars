"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaBriefcase, FaMapMarkerAlt, FaUsers, FaGraduationCap,
  FaCalendarAlt, FaSearch, FaFilter, FaTimes, FaArrowRight,
  FaMoneyBillWave, FaClock, FaCheckCircle,
} from "react-icons/fa"
import { HiSparkles } from "react-icons/hi"
import { MdOutlineSchool, MdAutoGraph, MdGroups2 } from "react-icons/md"
import { IoMailOutline } from "react-icons/io5"

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

const PILLARS = [
  {
    icon: MdOutlineSchool,
    title: "Advanced Curriculum",
    desc: "Deliver cutting-edge learning frameworks designed for 21st-century learners.",
    color: "from-sky-500/20 to-sky-500/5",
    accent: "bg-sky-500",
    textAccent: "text-sky-600",
  },
  {
    icon: MdAutoGraph,
    title: "Professional Growth",
    desc: "Structured mentorship, CPD programmes, and clear career progression pathways.",
    color: "from-violet-500/20 to-violet-500/5",
    accent: "bg-violet-500",
    textAccent: "text-violet-600",
  },
  {
    icon: MdGroups2,
    title: "Collaborative Culture",
    desc: "Lead alongside visionary colleagues in a school that values every voice.",
    color: "from-emerald-500/20 to-emerald-500/5",
    accent: "bg-emerald-500",
    textAccent: "text-emerald-600",
  },
]

// ─── Newsletter Section ───────────────────────────────────────────────────────

function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubscribe = async () => {
    if (!email.trim() || !email.includes("@")) {
      setStatus("error")
      setErrorMsg("Please enter a valid email address.")
      return
    }
    setStatus("loading")
    // Replace this with your actual newsletter API call
    try {
      await new Promise((r) => setTimeout(r, 1200)) // Simulate API
      setStatus("success")
      setEmail("")
    } catch {
      setStatus("error")
      setErrorMsg("Something went wrong. Please try again.")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-blue-200/60 bg-gradient-to-br from-[#0f2554] via-[#1a3a6e] to-[#1e4db7] p-8 md:p-10 text-white shadow-2xl"
    >
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-indigo-400/10 blur-2xl" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative flex flex-col md:flex-row md:items-center gap-8">
        {/* Left copy */}
        <div className="flex-1">
          
        </div>

        
      </div>
    </motion.div>
  )
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

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0c1f4a] via-[#1a3a6e] to-[#1e4db7] text-white">

        {/* Decorative background layers */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-blue-400/10 blur-3xl" />
          <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-indigo-600/20 blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-64 h-64 rounded-full bg-sky-400/10 blur-2xl" />
          {/* Subtle grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative container mx-auto px-4 pt-16 pb-20 max-w-6xl">

          {/* ── Mission statement ──────────────────────────────────────── */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-14">

            {/* Left: headline & statement */}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-200 text-xs font-bold px-3 py-1.5 rounded-full mb-5 tracking-widest uppercase">
                <HiSparkles size={12} /> Are you ready to
              </div>

              <h1 className="text-4xl sm:text-5xl font-black leading-[1.1] mb-6">
                Redefine{" "}
                <span className="relative inline-block">
                  <span className="text-blue-300">Education?</span>
                  <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-blue-400/60 rounded-full" />
                </span>
                {/* <br />with Us. */}
              </h1>

              <p className="text-blue-100/80 text-base leading-relaxed mb-6 max-w-[480px]">
                <strong className="text-white font-semibold">Shining Stars Day & Boarding Nursery and Primary School — Vvumba</strong> is
                seeking passionate educators who don't just teach — they transform. If you believe a classroom
                can be a place of wonder, innovation, and lifelong impact, you belong here.
              </p>

              <p className="text-blue-200/70 text-sm leading-relaxed max-w-[460px]">
                We invest in our people with structured professional development, an advanced curriculum, and
                collaborative leadership that gives you the resources, autonomy, and community to build an
                extraordinary career in education.
              </p>
            </motion.div>

            {/* Right: 3 pillars */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-4"
            >
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.1, duration: 0.45 }}
                  className={`flex items-start gap-4 bg-gradient-to-br ${p.color} border border-white/10 rounded-2xl p-5 backdrop-blur-sm`}
                >
                  <div className={`w-10 h-10 rounded-xl ${p.accent} bg-opacity-20 flex items-center justify-center shrink-0`}>
                    <p.icon className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">{p.title}</h4>
                    <p className="text-blue-200/70 text-xs leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Search bar ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex gap-2"
          >
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
          </motion.div>
        </div>
      </section>

      {/* ── Filter bar ────────────────────────────────────────────────────── */}
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

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-10 max-w-6xl space-y-10">

        {/* Results header */}
        <div className="flex items-center justify-between">
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
          <div className="bg-red-50 border border-red-100 rounded-2xl p-5 text-center">
            <p className="text-sm text-red-600 font-medium">{error}</p>
            <button onClick={fetchJobs} className="mt-2 text-xs text-red-500 underline">Try again</button>
          </div>
        )}

        {/* Loading skeletons */}
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
            <p className="text-gray-400 text-sm mb-5">Try adjusting your search or filters.</p>
            <button
              onClick={() => { setSearch(""); setCategory(""); setEmploymentType("") }}
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* ── Newsletter subscription ──────────────────────────────────── */}
        <NewsletterSection />

      </div>
    </div>
  )
}