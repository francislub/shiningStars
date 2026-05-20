"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaSearch, FaFilter, FaUser, FaBriefcase, FaEnvelope, FaPhone,
  FaCalendarAlt, FaChevronRight, FaChevronLeft, FaChevronDown,
  FaSpinner, FaInbox, FaEye, FaTimes, FaCheckCircle,
} from "react-icons/fa"

// ── Types ─────────────────────────────────────────────────────────────────────

interface Application {
  id: string
  fullName: string
  email: string
  phone: string
  status: string
  createdAt: string
  job: { id: string; title: string; department: string }
  gender?: string
  nationality?: string
}

interface Meta {
  total: number
  page: number
  pages: number
  limit: number
}

// ── Constants ─────────────────────────────────────────────────────────────────

const STATUS_OPTIONS = [
  { value: "",                   label: "All Statuses" },
  { value: "SUBMITTED",          label: "Submitted" },
  { value: "UNDER_REVIEW",       label: "Under Review" },
  { value: "SHORTLISTED",        label: "Shortlisted" },
  { value: "INTERVIEW_SCHEDULED",label: "Interview Scheduled" },
  { value: "INTERVIEWED",        label: "Interviewed" },
  { value: "OFFERED",            label: "Offered" },
  { value: "HIRED",              label: "Hired" },
  { value: "REJECTED",           label: "Rejected" },
  { value: "WITHDRAWN",          label: "Withdrawn" },
]

const STATUS_STYLES: Record<string, string> = {
  SUBMITTED:           "bg-slate-100 text-slate-600",
  UNDER_REVIEW:        "bg-amber-50 text-amber-700 border border-amber-200",
  SHORTLISTED:         "bg-emerald-50 text-emerald-700 border border-emerald-200",
  INTERVIEW_SCHEDULED: "bg-blue-50 text-blue-700 border border-blue-200",
  INTERVIEWED:         "bg-violet-50 text-violet-700 border border-violet-200",
  OFFERED:             "bg-cyan-50 text-cyan-700 border border-cyan-200",
  HIRED:               "bg-green-100 text-green-800 border border-green-200",
  REJECTED:            "bg-red-50 text-red-600 border border-red-200",
  WITHDRAWN:           "bg-gray-100 text-gray-500",
}

function StatusBadge({ status }: { status: string }) {
  const cls = STATUS_STYLES[status] ?? "bg-gray-100 text-gray-500"
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wide ${cls}`}>
      {status.replace(/_/g, " ")}
    </span>
  )
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-UG", { day: "numeric", month: "short", year: "numeric" })
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ApplicationsPage() {
  const [apps, setApps]       = useState<Application[]>([])
  const [meta, setMeta]       = useState<Meta>({ total: 0, page: 1, pages: 1, limit: 20 })
  const [loading, setLoading] = useState(true)

  const [search, setSearch]     = useState("")
  const [status, setStatus]     = useState("")
  const [page, setPage]         = useState(1)
  const [debouncedSearch, setDebouncedSearch] = useState("")

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350)
    return () => clearTimeout(t)
  }, [search])

  const fetchApps = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), limit: "20" })
      if (status)          params.set("status", status)
      if (debouncedSearch) params.set("search", debouncedSearch)
      const res  = await fetch(`/api/admin/applications?${params}`)
      const json = await res.json()
      if (json.success) {
        setApps(json.data)
        setMeta(json.meta)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [page, status, debouncedSearch])

  useEffect(() => { fetchApps() }, [fetchApps])
  useEffect(() => { setPage(1) }, [status, debouncedSearch])

  return (
    <div className="min-h-screen bg-[#f7f8fc]">

      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Job Applications</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {meta.total} total application{meta.total !== 1 ? "s" : ""}
            </p>
          </div>
          {/* Quick stats */}
          <div className="flex gap-3 text-xs font-bold">
            <span className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-100">
              {apps.filter((a) => a.status === "SUBMITTED").length} New
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-100">
              {apps.filter((a) => a.status === "INTERVIEW_SCHEDULED").length} Interviews
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-green-50 text-green-700 border border-green-100">
              {apps.filter((a) => a.status === "HIRED").length} Hired
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* ── Filters ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={13} />
            <input
              type="text"
              placeholder="Search by name, email or phone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">
                <FaTimes size={12} />
              </button>
            )}
          </div>
          {/* Status filter */}
          <div className="relative">
            <FaFilter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" size={11} />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="appearance-none pl-9 pr-8 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all cursor-pointer min-w-[180px]"
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" size={10} />
          </div>
        </div>

        {/* ── Table / Cards ────────────────────────────────────────────────── */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <FaSpinner className="text-blue-400 animate-spin" size={24} />
          </div>
        ) : apps.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <FaInbox size={36} className="mx-auto mb-3 opacity-30" />
            <p className="text-base font-semibold text-gray-400">No applications found</p>
            <p className="text-sm text-gray-300 mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden lg:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/70">
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-400 uppercase tracking-widest">Applicant</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-400 uppercase tracking-widest">Job Position</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-400 uppercase tracking-widest">Contact</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-400 uppercase tracking-widest">Applied</th>
                    <th className="px-5 py-3.5" />
                  </tr>
                </thead>
                <tbody>
                  {apps.map((app, i) => (
                    <motion.tr
                      key={app.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors group"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {app.fullName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{app.fullName}</p>
                            {app.nationality && <p className="text-xs text-gray-400">{app.nationality}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-700">{app.job.title}</p>
                        <p className="text-xs text-gray-400">{app.job.department}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-gray-600 text-xs flex items-center gap-1.5"><FaEnvelope size={10} className="text-gray-300" />{app.email}</p>
                        <p className="text-gray-400 text-xs flex items-center gap-1.5 mt-0.5"><FaPhone size={10} className="text-gray-300" />{app.phone}</p>
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={app.status} />
                      </td>
                      <td className="px-5 py-4 text-xs text-gray-400">
                        <div className="flex items-center gap-1.5"><FaCalendarAlt size={10} />{fmtDate(app.createdAt)}</div>
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/careers/applications/${app.id}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <FaEye size={10} /> View
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="lg:hidden space-y-3">
              {apps.map((app, i) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={`/admin/careers/applications/${app.id}`}
                    className="block bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {app.fullName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm">{app.fullName}</p>
                          <p className="text-xs text-gray-400">{app.job.title}</p>
                        </div>
                      </div>
                      <StatusBadge status={app.status} />
                    </div>
                    <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                      <span>{app.email}</span>
                      <span className="flex items-center gap-1"><FaCalendarAlt size={9} />{fmtDate(app.createdAt)}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* ── Pagination ──────────────────────────────────────────────── */}
            {meta.pages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <p className="text-xs text-gray-400">
                  Showing {(page - 1) * meta.limit + 1}–{Math.min(page * meta.limit, meta.total)} of {meta.total}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <FaChevronLeft size={11} />
                  </button>
                  {Array.from({ length: Math.min(meta.pages, 5) }, (_, i) => {
                    const p = Math.max(1, Math.min(meta.pages - 4, page - 2)) + i
                    return (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-colors ${
                          p === page
                            ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                            : "border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  })}
                  <button
                    onClick={() => setPage((p) => Math.min(meta.pages, p + 1))}
                    disabled={page === meta.pages}
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <FaChevronRight size={11} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}