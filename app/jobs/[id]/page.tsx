"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaBriefcase, FaMapMarkerAlt, FaUsers, FaGraduationCap,
  FaMoneyBillWave, FaCalendarAlt, FaChevronLeft, FaShareAlt,
  FaClock, FaCheckCircle, FaEnvelope, FaArrowRight,
  FaBuilding, FaTag, FaFileAlt, FaTimes, FaExclamationCircle,
  FaStar,
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
  genderPreference: string | null
  experienceRequired: string | null
  minimumQualification: string
  applicationDeadline: string
  interviewDate: string | null
  rolesAndResponsibilities: string | null
  requirements: string | null
  skillsNeeded: string | null
  benefits: string | null
  workingHours: string | null
  jobDescriptionPdf: string | null
  status: string
  publishedAt: string | null
  createdAt: string
  _count?: { applications: number }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-UG", {
      day: "numeric", month: "long", year: "numeric",
    })
  } catch { return "—" }
}

function fmtSalary(min: number | null, max: number | null): string | null {
  if (!min && !max) return null
  const f = (n: number) => "UGX " + n.toLocaleString("en-UG", { maximumFractionDigits: 0 })
  if (min && max) return `${f(min)} – ${f(max)} / month`
  if (min) return `From ${f(min)} / month`
  return `Up to ${f(max!)} / month`
}

function label(str: string) {
  return str.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

function daysUntil(iso: string) {
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000)
}

// ─── Top Banner ───────────────────────────────────────────────────────────────

function TopBanner() {
  return (
    <div className="relative overflow-hidden bg-[#0a1a3e] border-b border-white/5">
      {/* Subtle shimmer line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-0 sm:gap-6 py-3 sm:py-3.5">

          {/* Left phrase — main */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-2.5"
          >
            <div className="flex items-center gap-1">
              {["text-yellow-400", "text-blue-400", "text-emerald-400"].map((color, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.35, type: "spring" }}
                >
                  <FaStar size={9} className={color} />
                </motion.div>
              ))}
            </div>
            <p className="text-white text-sm font-black tracking-wide leading-none">
              Inspire.{" "}
              <span className="text-blue-300">Grow.</span>{" "}
              <span className="text-emerald-300">Achieve.</span>
            </p>
            <span className="hidden sm:block w-px h-4 bg-white/15 mx-1" />
            <p className="hidden sm:block text-blue-200/80 text-xs font-semibold tracking-wider">
              Join the{" "}
              <span className="text-white font-bold">Shining Stars Vvumba</span>{" "}
              Family.
            </p>
          </motion.div>

          {/* Mobile: second line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="sm:hidden text-blue-200/70 text-[11px] font-semibold tracking-wider text-center"
          >
            Join the <span className="text-white font-bold">Shining Stars Vvumba</span> Family.
          </motion.p>

          {/* Divider — desktop only */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="hidden sm:block flex-1 h-px bg-gradient-to-r from-white/5 via-white/15 to-white/5 mx-4"
          />

          {/* Right phrase */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            <HiSparkles className="text-yellow-300/80 hidden sm:block" size={13} />
            <p className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-blue-300/70 text-center sm:text-right">
              Empowering{" "}
              <span className="text-yellow-300/90">Teachers</span>
              {" "}to Empower{" "}
              <span className="text-emerald-300/90">Pupils</span>
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

// ─── Rich Text Renderer ───────────────────────────────────────────────────────

function RichContent({ html }: { html: string }) {
  return (
    <>
      <style>{`
        .rich-content { color: #374151; font-size: 0.9rem; line-height: 1.75; }

        .rich-content h1 { font-size: 1.25rem; font-weight: 800; color: #111827; margin: 1.25rem 0 0.5rem; }
        .rich-content h2 { font-size: 1.1rem;  font-weight: 700; color: #111827; margin: 1.1rem 0 0.4rem; }
        .rich-content h3 { font-size: 1rem;    font-weight: 700; color: #1f2937; margin: 1rem 0 0.35rem; }

        .rich-content p  { margin: 0 0 0.75rem; }
        .rich-content p:last-child { margin-bottom: 0; }

        .rich-content strong, .rich-content b { font-weight: 700; color: #111827; }
        .rich-content em,     .rich-content i { font-style: italic; }
        .rich-content u { text-decoration: underline; }
        .rich-content s { text-decoration: line-through; }

        .rich-content ul {
          list-style-type: disc;
          padding-left: 1.4rem;
          margin: 0.6rem 0 0.9rem;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .rich-content ul li { padding-left: 0.25rem; }

        .rich-content ol {
          list-style-type: decimal;
          padding-left: 1.4rem;
          margin: 0.6rem 0 0.9rem;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .rich-content ol li { padding-left: 0.25rem; }

        .rich-content ul ul,
        .rich-content ol ol,
        .rich-content ul ol,
        .rich-content ol ul {
          margin: 0.2rem 0 0.2rem 0.5rem;
        }

        .rich-content a {
          color: #2563eb;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .rich-content a:hover { color: #1d4ed8; }

        .rich-content blockquote {
          border-left: 3px solid #93c5fd;
          padding-left: 1rem;
          color: #6b7280;
          font-style: italic;
          margin: 0.75rem 0;
        }

        .rich-content code {
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          border-radius: 4px;
          padding: 0.1em 0.4em;
          font-size: 0.85em;
          font-family: ui-monospace, monospace;
        }
        .rich-content pre {
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 1rem;
          overflow-x: auto;
          margin: 0.75rem 0;
        }
        .rich-content pre code { background: none; border: none; padding: 0; }

        .rich-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 0.75rem 0;
          font-size: 0.875rem;
        }
        .rich-content th {
          background: #eff6ff;
          color: #1e40af;
          font-weight: 700;
          padding: 0.5rem 0.75rem;
          text-align: left;
          border: 1px solid #bfdbfe;
        }
        .rich-content td {
          padding: 0.5rem 0.75rem;
          border: 1px solid #e5e7eb;
          color: #374151;
        }
        .rich-content tr:nth-child(even) td { background: #f9fafb; }

        .rich-content hr {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 1rem 0;
        }
      `}</style>
      <div
        className="rich-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  )
}

// ─── Section Card ─────────────────────────────────────────────────────────────

function Section({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode
  title: string
  content: string
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
      </div>
      <RichContent html={content} />
    </div>
  )
}

// ─── Refer Modal ──────────────────────────────────────────────────────────────

function ReferModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const jobUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/jobs/${job.id}`
      : `/jobs/${job.id}`

  async function handleSend() {
    if (!email.trim() || !name.trim()) { setErr("Please fill in both fields."); return }
    setSending(true); setErr(null)
    try {
      const res = await fetch(`/api/careers/jobs/${job.id}/refer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipientName: name, recipientEmail: email, jobUrl }),
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.error || "Failed to send")
      setSent(true)
    } catch (e: any) {
      setErr(e.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 sm:p-7"
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors">
          <FaTimes size={16} />
        </button>

        {sent ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="text-green-500" size={30} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Referral Sent!</h3>
            <p className="text-gray-500 text-sm">
              We've sent the job link for <strong>{job.title}</strong> to <strong>{email}</strong>.
            </p>
            <button onClick={onClose} className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors">
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaEnvelope className="text-blue-600" size={18} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Refer Someone</h3>
                <p className="text-xs text-gray-500">Share this job via email</p>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 mb-5 flex items-start gap-2">
              <FaBriefcase className="text-blue-500 mt-0.5 flex-shrink-0" size={12} />
              <p className="text-xs text-blue-700 font-medium">{job.title} — {job.department}</p>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Recipient's Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-400 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Recipient's Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-400 transition-colors"
                />
              </div>
            </div>
            {err && (
              <p className="mt-3 text-xs text-red-600 flex items-center gap-1.5">
                <FaExclamationCircle size={11} /> {err}
              </p>
            )}
            <button
              onClick={handleSend}
              disabled={sending}
              className="mt-5 w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
            >
              {sending ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
              ) : (
                <><FaEnvelope size={13} /> Send Referral</>
              )}
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>()

  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showRefer, setShowRefer] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await fetch(`/api/careers/jobs/${id}`)
        const json = await res.json()
        if (!res.ok || !json.success) throw new Error(json.error || "Job not found")
        setJob(json.data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchJob()
  }, [id])

  function handleCopyLink() {
    navigator.clipboard.writeText(`${window.location.origin}/jobs/${id}`).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8faff] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-gray-500 text-sm font-medium">Loading job details…</p>
        </div>
      </div>
    )
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (error || !job) {
    return (
      <div className="min-h-screen bg-[#f8faff] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaExclamationCircle className="text-red-400" size={28} />
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">Job Not Found</h2>
          <p className="text-gray-500 text-sm mb-5">{error || "This position may no longer be available."}</p>
          <Link href="/jobs" className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors">
            <FaChevronLeft size={10} /> Back to Jobs
          </Link>
        </div>
      </div>
    )
  }

  const days   = daysUntil(job.applicationDeadline)
  const urgent = days <= 7 && days >= 0
  const closed = days < 0
  const salary = fmtSalary(job.salaryMin, job.salaryMax)

  const CAT_PILL: Record<string, string> = {
    TEACHING:       "bg-sky-100 text-sky-700",
    ADMINISTRATION: "bg-violet-100 text-violet-700",
    SUPPORT_STAFF:  "bg-teal-100 text-teal-700",
    MANAGEMENT:     "bg-indigo-100 text-indigo-700",
    IT:             "bg-cyan-100 text-cyan-700",
    FINANCE:        "bg-emerald-100 text-emerald-700",
    SECURITY:       "bg-slate-100 text-slate-700",
    CLEANING:       "bg-lime-100 text-lime-700",
    OTHER:          "bg-orange-100 text-orange-700",
  }

  return (
    <div className="min-h-screen bg-[#f8faff]">
      <AnimatePresence>
        {showRefer && <ReferModal job={job} onClose={() => setShowRefer(false)} />}
      </AnimatePresence>

      {/* ── Top Banner ────────────────────────────────────────────────────── */}
      <TopBanner />

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a3a6e] via-[#1e4db7] to-[#2d62d4] text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/5" />
          <div className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-blue-400/10 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-14 lg:pb-16">
          {/* Back link */}
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm font-medium mb-6 sm:mb-8 transition-colors"
          >
            <FaChevronLeft size={10} /> All Positions
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${CAT_PILL[job.category] || "bg-blue-100 text-blue-700"}`}>
                {label(job.category)}
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-white border border-white/20">
                {label(job.employmentType)}
              </span>
              {urgent && (
                <span className="flex items-center gap-1.5 text-xs font-bold text-rose-200 bg-rose-500/20 border border-rose-400/30 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                  {days === 0 ? "Closes Today!" : `${days} days left`}
                </span>
              )}
              {closed && (
                <span className="text-xs font-bold text-gray-300 bg-gray-700/40 border border-gray-500/30 px-2.5 py-1 rounded-full">
                  Closed
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight mb-1.5 sm:mb-2">
              {job.title}
            </h1>
            <p className="text-blue-200 text-base sm:text-lg mb-4 sm:mb-6">{job.department}</p>

            {/* Quick meta */}
            <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-blue-100">
              <span className="flex items-center gap-1.5">
                <FaMapMarkerAlt size={11} className="text-blue-300 flex-shrink-0" />
                {job.location}
              </span>
              <span className="flex items-center gap-1.5">
                <FaUsers size={11} className="text-blue-300 flex-shrink-0" />
                {job.vacancies} vacanc{job.vacancies === 1 ? "y" : "ies"}
              </span>
              <span className="flex items-center gap-1.5">
                <FaCalendarAlt size={11} className="text-blue-300 flex-shrink-0" />
                Deadline: {fmtDate(job.applicationDeadline)}
              </span>
              {salary && (
                <span className="flex items-center gap-1.5">
                  <FaMoneyBillWave size={11} className="text-blue-300 flex-shrink-0" />
                  {salary}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Sticky CTA Bar ──────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-3">
          <p className="text-sm font-semibold text-gray-700 truncate hidden sm:block max-w-xs lg:max-w-sm">
            {job.title}
          </p>
          <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
            {/* Copy link */}
            <button
              onClick={handleCopyLink}
              title="Copy job link"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-50 transition-colors"
            >
              <FaShareAlt size={11} />
              <span className="hidden sm:inline">{copied ? "Copied!" : "Share"}</span>
            </button>

            {/* Refer */}
            <button
              onClick={() => setShowRefer(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl border border-blue-200 text-blue-600 text-xs font-semibold hover:bg-blue-50 transition-colors"
            >
              <FaEnvelope size={11} />
              <span className="hidden sm:inline">Refer Someone</span>
              <span className="sm:hidden">Refer</span>
            </button>

            {/* Apply / Closed */}
            {!closed ? (
              <Link
                href={`/jobs/${job.id}/apply`}
                className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-3 sm:px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap"
              >
                Apply Now <FaArrowRight size={10} />
              </Link>
            ) : (
              <span className="flex items-center gap-1.5 bg-gray-200 text-gray-500 text-xs font-bold px-3 sm:px-4 py-2 rounded-xl cursor-not-allowed whitespace-nowrap">
                Applications Closed
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">

          {/* ── Left: rich content ─────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5">

            {job.rolesAndResponsibilities && (
              <Section
                icon={<FaFileAlt className="text-blue-600" size={14} />}
                title="Roles & Responsibilities"
                content={job.rolesAndResponsibilities}
              />
            )}

            {job.requirements && (
              <Section
                icon={<FaCheckCircle className="text-blue-600" size={14} />}
                title="Requirements"
                content={job.requirements}
              />
            )}

            {job.skillsNeeded && (
              <Section
                icon={<HiSparkles className="text-blue-600" size={14} />}
                title="Skills Needed"
                content={job.skillsNeeded}
              />
            )}

            {job.benefits && (
              <Section
                icon={<FaTag className="text-blue-600" size={14} />}
                title="Benefits"
                content={job.benefits}
              />
            )}

            {job.workingHours && (
              <Section
                icon={<FaClock className="text-blue-600" size={14} />}
                title="Working Hours"
                content={job.workingHours}
              />
            )}

            {/* PDF download */}
            {job.jobDescriptionPdf && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                    <FaFileAlt className="text-red-500" size={14} />
                  </div>
                  <h2 className="text-base font-bold text-gray-900">Job Description PDF</h2>
                </div>
                <a
                  href={job.jobDescriptionPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-50 text-red-600 font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-red-100 transition-colors border border-red-200"
                >
                  <FaFileAlt size={12} /> Download JD PDF
                </a>
              </div>
            )}

            {/* Apply CTA bottom */}
            {!closed && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-[#1e4db7] to-[#2d62d4] rounded-2xl p-6 sm:p-8 text-white text-center"
              >
                <h3 className="text-xl sm:text-2xl font-black mb-2">Ready to Apply?</h3>
                <p className="text-blue-200 text-sm sm:text-base mb-5 sm:mb-6">
                  Submit your application before{" "}
                  <strong className="text-white">{fmtDate(job.applicationDeadline)}</strong>.{" "}
                  Don't miss this opportunity.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href={`/jobs/${job.id}/apply`}
                    className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-sm"
                  >
                    Apply Now <FaArrowRight size={12} />
                  </Link>
                  <button
                    onClick={() => setShowRefer(true)}
                    className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/25 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <FaEnvelope size={12} /> Refer a Friend
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* ── Right: sidebar ─────────────────────────────────────────────── */}
          <div className="space-y-4 sm:space-y-5">

            {/* Job Summary card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
              <h3 className="text-sm font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">
                Job Summary
              </h3>
              <dl className="space-y-3 sm:space-y-3.5">
                {[
                  { icon: <FaBuilding    size={12} className="text-blue-400" />, label: "Department",        value: job.department },
                  { icon: <FaMapMarkerAlt size={12} className="text-blue-400" />, label: "Location",         value: job.location },
                  { icon: <FaBriefcase   size={12} className="text-blue-400" />, label: "Type",              value: label(job.employmentType) },
                  { icon: <FaUsers       size={12} className="text-blue-400" />, label: "Vacancies",         value: `${job.vacancies} position${job.vacancies > 1 ? "s" : ""}` },
                  { icon: <FaGraduationCap size={12} className="text-blue-400" />, label: "Min. Qualification", value: job.minimumQualification },
                  ...(job.experienceRequired ? [{ icon: <FaClock size={12} className="text-blue-400" />, label: "Experience",       value: job.experienceRequired }] : []),
                  ...(job.genderPreference   ? [{ icon: <FaUsers size={12} className="text-blue-400" />, label: "Gender Preference", value: label(job.genderPreference) }] : []),
                  { icon: <FaCalendarAlt size={12} className="text-blue-400" />, label: "Deadline",          value: fmtDate(job.applicationDeadline) },
                  ...(job.interviewDate ? [{ icon: <FaCalendarAlt size={12} className="text-blue-400" />, label: "Interview Date",  value: fmtDate(job.interviewDate) }] : []),
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex-shrink-0">{item.icon}</div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide leading-none mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-sm text-gray-700 font-medium leading-snug">{item.value}</p>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            {/* Salary */}
            {salary && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-1">
                  <FaMoneyBillWave className="text-emerald-600" size={14} />
                  <h3 className="text-sm font-bold text-emerald-800">Salary Range</h3>
                </div>
                <p className="text-emerald-700 font-black text-lg sm:text-xl">{salary}</p>
              </div>
            )}

            {/* Deadline urgency */}
            {!closed && (
              <div className={`rounded-2xl p-4 sm:p-5 border ${urgent ? "bg-rose-50 border-rose-100" : "bg-blue-50 border-blue-100"}`}>
                <div className="flex items-center gap-2 mb-1">
                  <FaCalendarAlt className={urgent ? "text-rose-500" : "text-blue-500"} size={13} />
                  <h3 className={`text-sm font-bold ${urgent ? "text-rose-800" : "text-blue-800"}`}>
                    Application Deadline
                  </h3>
                </div>
                <p className={`font-black text-lg sm:text-xl ${urgent ? "text-rose-700" : "text-blue-700"}`}>
                  {fmtDate(job.applicationDeadline)}
                </p>
                <p className={`text-xs mt-1 ${urgent ? "text-rose-500" : "text-blue-500"}`}>
                  {days === 0 ? "Closes today!" : `${days} day${days !== 1 ? "s" : ""} remaining`}
                </p>
              </div>
            )}

            {closed && (
              <div className="bg-gray-100 border border-gray-200 rounded-2xl p-4 sm:p-5">
                <p className="text-sm font-bold text-gray-500 mb-1">Applications Closed</p>
                <p className="text-xs text-gray-400">The deadline was {fmtDate(job.applicationDeadline)}.</p>
              </div>
            )}

            {/* Apply button — visible in sidebar on desktop */}
            {!closed && (
              <Link
                href={`/jobs/${job.id}/apply`}
                className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-bold text-sm px-6 py-3.5 rounded-2xl hover:bg-blue-700 transition-colors shadow-sm"
              >
                Apply for this Position <FaArrowRight size={12} />
              </Link>
            )}
          </div>

        </div>
      </div>

      {/* ── Bottom padding for mobile ─────────────────────────────────────── */}
      <div className="h-8 sm:h-10 lg:h-0" />
    </div>
  )
}