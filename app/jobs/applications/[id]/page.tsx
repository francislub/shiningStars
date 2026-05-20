"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaChevronLeft, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaGraduationCap, FaBriefcase, FaFileAlt, FaCalendarAlt,
  FaCheckCircle, FaExclamationCircle, FaSpinner, FaTimes,
  FaPaperPlane, FaEdit, FaTrash, FaDownload, FaGlobe,
  FaVenusMars, FaBirthdayCake, FaStar, FaClock,
} from "react-icons/fa"

// ── Types ─────────────────────────────────────────────────────────────────────

interface Application {
  id: string
  fullName: string
  gender?: string
  dateOfBirth?: string
  nationality?: string
  phone: string
  email: string
  physicalAddress?: string
  educationBackground?: any[]
  workExperience?: any[]
  skills?: string[]
  certifications?: string
  languages?: string
  cvUrl?: string
  academicDocumentsUrl?: string
  nationalIdUrl?: string
  coverLetterUrl?: string
  passportPhotoUrl?: string
  whyShouldWeHireYou?: string
  expectedSalary?: number
  availableStartDate?: string
  consentGiven: boolean
  status: string
  reviewNotes?: string
  interviewScheduledAt?: string
  interviewLocation?: string
  interviewNotes?: string
  createdAt: string
  updatedAt: string
  job: {
    id: string
    title: string
    department: string
    location: string
    applicationDeadline: string
  }
  reviewedBy?: { id: string; name: string; email: string }
}

// ── Constants ─────────────────────────────────────────────────────────────────

const STATUS_OPTIONS = [
  { value: "SUBMITTED",           label: "Submitted" },
  { value: "UNDER_REVIEW",        label: "Under Review" },
  { value: "SHORTLISTED",         label: "Shortlisted" },
  { value: "INTERVIEW_SCHEDULED", label: "Interview Scheduled" },
  { value: "INTERVIEWED",         label: "Interviewed" },
  { value: "OFFERED",             label: "Offered" },
  { value: "HIRED",               label: "Hired" },
  { value: "REJECTED",            label: "Rejected" },
  { value: "WITHDRAWN",           label: "Withdrawn" },
]

const STATUS_STYLES: Record<string, { badge: string; dot: string }> = {
  SUBMITTED:           { badge: "bg-slate-100 text-slate-600",                          dot: "bg-slate-400" },
  UNDER_REVIEW:        { badge: "bg-amber-50 text-amber-700 border border-amber-200",   dot: "bg-amber-500" },
  SHORTLISTED:         { badge: "bg-emerald-50 text-emerald-700 border border-emerald-200", dot: "bg-emerald-500" },
  INTERVIEW_SCHEDULED: { badge: "bg-blue-50 text-blue-700 border border-blue-200",      dot: "bg-blue-500" },
  INTERVIEWED:         { badge: "bg-violet-50 text-violet-700 border border-violet-200",dot: "bg-violet-500" },
  OFFERED:             { badge: "bg-cyan-50 text-cyan-700 border border-cyan-200",      dot: "bg-cyan-500" },
  HIRED:               { badge: "bg-green-100 text-green-800 border border-green-200",  dot: "bg-green-600" },
  REJECTED:            { badge: "bg-red-50 text-red-600 border border-red-200",         dot: "bg-red-500" },
  WITHDRAWN:           { badge: "bg-gray-100 text-gray-500",                            dot: "bg-gray-400" },
}

const EMAIL_TEMPLATES: Record<string, { subject: string; message: string }> = {
  UNDER_REVIEW: {
    subject: "We've received your application",
    message: "Thank you for submitting your application. We have received it and it is currently under review by our team. We will be in touch with you shortly with further updates.",
  },
  SHORTLISTED: {
    subject: "You have been shortlisted!",
    message: "We are pleased to inform you that you have been shortlisted for the position. Your qualifications and experience stood out to our selection panel. We will contact you shortly with the next steps in the recruitment process.",
  },
  INTERVIEW_SCHEDULED: {
    subject: "Interview Invitation",
    message: "Congratulations! We would like to invite you for an interview. Please review the interview details that have been scheduled for you. Kindly confirm your attendance by replying to this email.",
  },
  INTERVIEWED: {
    subject: "Thank you for attending the interview",
    message: "Thank you for taking the time to attend the interview. We appreciate your interest in joining our team. Our panel is currently deliberating and we will get back to you with a decision as soon as possible.",
  },
  OFFERED: {
    subject: "Job Offer — Congratulations!",
    message: "We are delighted to offer you the position. We were very impressed with your performance throughout the recruitment process and believe you will be a great addition to our team. Please review the offer details and respond at your earliest convenience.",
  },
  HIRED: {
    subject: "Welcome to the Team!",
    message: "Congratulations! We are thrilled to officially welcome you to our team. Please expect an onboarding email shortly with details on your start date, orientation, and the documents you will need to bring. We look forward to working with you!",
  },
  REJECTED: {
    subject: "Update on your application",
    message: "Thank you for your interest in this position and for taking the time to go through our recruitment process. After careful consideration, we regret to inform you that we will not be moving forward with your application at this time. We encourage you to apply for future opportunities that match your profile.",
  },
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtDate(iso?: string) {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString("en-UG", { day: "numeric", month: "long", year: "numeric" })
}
function fmtDateTime(iso?: string) {
  if (!iso) return "—"
  return new Date(iso).toLocaleString("en-UG", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
}

// ── Card ──────────────────────────────────────────────────────────────────────

function Card({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-50">
        <Icon className="text-blue-500" size={14} />
        <h3 className="text-sm font-black text-gray-700 uppercase tracking-widest">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-4 py-2.5 border-b border-gray-50 last:border-0">
      <span className="text-xs font-bold text-gray-400 uppercase tracking-wide sm:w-36 flex-shrink-0">{label}</span>
      <span className="text-sm text-gray-700">{value || "—"}</span>
    </div>
  )
}

function DocLink({ label, url }: { label: string; url?: string | null }) {
  if (!url) return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-gray-200 text-gray-300">
      <FaFileAlt size={14} />
      <span className="text-xs font-medium">{label}</span>
      <span className="ml-auto text-xs">Not uploaded</span>
    </div>
  )
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-blue-100 bg-blue-50/50 hover:bg-blue-50 text-blue-700 transition-colors group"
    >
      <FaFileAlt size={14} className="text-blue-400" />
      <span className="text-xs font-semibold">{label}</span>
      <FaDownload size={10} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  )
}

// ── Feedback Modal ─────────────────────────────────────────────────────────────

interface FeedbackModalProps {
  open: boolean
  onClose: () => void
  applicantName: string
  applicantEmail: string
  currentStatus: string
  onSend: (data: {
    status: string
    reviewNotes: string
    sendEmail: boolean
    emailSubject: string
    emailMessage: string
    interviewScheduledAt?: string
    interviewLocation?: string
    interviewNotes?: string
  }) => Promise<void>
}

function FeedbackModal({ open, onClose, applicantName, applicantEmail, currentStatus, onSend }: FeedbackModalProps) {
  const [status,              setStatus]              = useState(currentStatus)
  const [reviewNotes,         setReviewNotes]         = useState("")
  const [sendEmail,           setSendEmail]           = useState(true)
  const [emailSubject,        setEmailSubject]        = useState("")
  const [emailMessage,        setEmailMessage]        = useState("")
  const [interviewDate,       setInterviewDate]       = useState("")
  const [interviewLocation,   setInterviewLocation]   = useState("")
  const [interviewNotes,      setInterviewNotes]      = useState("")
  const [sending,             setSending]             = useState(false)
  const [error,               setError]               = useState<string | null>(null)

  // Auto-fill template when status changes
  useEffect(() => {
    const tpl = EMAIL_TEMPLATES[status]
    if (tpl) {
      setEmailSubject(tpl.subject)
      setEmailMessage(tpl.message)
    }
  }, [status])

  async function handleSend() {
    if (!status) { setError("Please select a status."); return }
    setSending(true); setError(null)
    try {
      await onSend({
        status, reviewNotes, sendEmail,
        emailSubject, emailMessage,
        interviewScheduledAt: status === "INTERVIEW_SCHEDULED" ? interviewDate : undefined,
        interviewLocation:    status === "INTERVIEW_SCHEDULED" ? interviewLocation : undefined,
        interviewNotes:       status === "INTERVIEW_SCHEDULED" ? interviewNotes : undefined,
      })
      onClose()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Sheet */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-base font-black text-gray-900">Update Application</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {applicantName} · <span className="text-blue-600">{applicantEmail}</span>
                </p>
              </div>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                <FaTimes size={13} />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Status */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                  New Status <span className="text-rose-500">*</span>
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                >
                  {STATUS_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* Interview fields */}
              {status === "INTERVIEW_SCHEDULED" && (
                <div className="space-y-3 bg-blue-50/60 rounded-xl p-4 border border-blue-100">
                  <p className="text-xs font-black text-blue-700 uppercase tracking-widest">Interview Details</p>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Date & Time</label>
                    <input type="datetime-local" value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Location / Platform</label>
                    <input type="text" placeholder="e.g. Head Office, Room 3 / Google Meet link" value={interviewLocation}
                      onChange={(e) => setInterviewLocation(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Interview Notes (internal)</label>
                    <textarea rows={2} value={interviewNotes} onChange={(e) => setInterviewNotes(e.target.value)}
                      placeholder="Internal notes for the interview panel…"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
                  </div>
                </div>
              )}

              {/* Internal notes */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Internal Review Notes</label>
                <textarea rows={3} value={reviewNotes} onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Notes visible only to the admin team…"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all" />
              </div>

              {/* Email toggle */}
              <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                <div>
                  <p className="text-sm font-bold text-gray-700">Send Email to Applicant</p>
                  <p className="text-xs text-gray-400 mt-0.5">Notify the applicant of this status change</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSendEmail((v) => !v)}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${sendEmail ? "bg-blue-600" : "bg-gray-200"}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${sendEmail ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>

              {/* Email fields */}
              {sendEmail && (
                <div className="space-y-3 border border-blue-100 rounded-xl p-4 bg-blue-50/40">
                  <p className="text-xs font-black text-blue-700 uppercase tracking-widest">Email to: {applicantEmail}</p>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Subject</label>
                    <input type="text" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Message</label>
                    <textarea rows={6} value={emailMessage} onChange={(e) => setEmailMessage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 leading-relaxed" />
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  <FaExclamationCircle className="text-red-500 flex-shrink-0" size={13} />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 p-5 border-t border-gray-100 sticky bottom-0 bg-white">
              <button onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleSend} disabled={sending}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors disabled:opacity-60 shadow-md shadow-blue-200">
                {sending ? <FaSpinner className="animate-spin" size={13} /> : <FaPaperPlane size={12} />}
                {sending ? "Sending…" : sendEmail ? "Update & Send Email" : "Update Status"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// ── Main Detail Page ───────────────────────────────────────────────────────────

export default function ApplicationDetailPage() {
  const { id }  = useParams<{ id: string }>()
  const router  = useRouter()

  const [app,     setApp]     = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)
  const [modal,   setModal]   = useState(false)
  const [toast,   setToast]   = useState<{ type: "success" | "error"; msg: string } | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const res  = await fetch(`/api/admin/applications/${id}`)
        const json = await res.json()
        if (!json.success) throw new Error(json.error)
        setApp(json.data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    if (id) load()
  }, [id])

  function showToast(type: "success" | "error", msg: string) {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 4000)
  }

  async function handleUpdate(data: any) {
    const res  = await fetch(`/api/admin/applications/${id}`, {
      method:  "PATCH",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(data),
    })
    const json = await res.json()
    if (!json.success) throw new Error(json.error || "Update failed")
    setApp((prev) => prev ? { ...prev, ...json.data } : prev)
    showToast("success", data.sendEmail ? "Status updated and email sent!" : "Status updated successfully.")
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to permanently delete this application? This cannot be undone.")) return
    const res  = await fetch(`/api/admin/applications/${id}`, { method: "DELETE" })
    const json = await res.json()
    if (!json.success) { showToast("error", "Failed to delete application."); return }
    router.push("/admin/careers/applications")
  }

  // ── Loading / Error ────────────────────────────────────────────────────────

  if (loading) return (
    <div className="min-h-screen bg-[#f7f8fc] flex items-center justify-center">
      <FaSpinner className="text-blue-400 animate-spin" size={28} />
    </div>
  )

  if (error || !app) return (
    <div className="min-h-screen bg-[#f7f8fc] flex items-center justify-center text-center px-4">
      <div>
        <FaExclamationCircle className="text-red-400 mx-auto mb-3" size={32} />
        <h2 className="text-lg font-bold text-gray-800 mb-1">Application Not Found</h2>
        <p className="text-sm text-gray-400 mb-4">{error}</p>
        <Link href="/admin/careers/applications" className="text-sm font-bold text-blue-600 hover:underline">
          ← Back to Applications
        </Link>
      </div>
    </div>
  )

  const styles = STATUS_STYLES[app.status] ?? STATUS_STYLES["SUBMITTED"]

  return (
    <div className="min-h-screen bg-[#f7f8fc]">

      {/* ── Toast ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold ${
              toast.type === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {toast.type === "success" ? <FaCheckCircle size={13} /> : <FaExclamationCircle size={13} />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/careers/applications"
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
              <FaChevronLeft size={12} />
            </Link>
            <div>
              <h1 className="text-lg font-black text-gray-900 tracking-tight">{app.fullName}</h1>
              <p className="text-xs text-gray-400 mt-0.5">{app.job.title} · {app.job.department}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide ${styles.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
              {app.status.replace(/_/g, " ")}
            </span>
            <button
              onClick={() => setModal(true)}
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-sm shadow-blue-200"
            >
              <FaEdit size={11} /> Update Status
            </button>
            <button onClick={handleDelete}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors">
              <FaTrash size={12} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ── Left / Main Column ──────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-5">

          {/* Personal Info */}
          <Card title="Personal Information" icon={FaUser}>
            <InfoRow label="Full Name"    value={app.fullName} />
            <InfoRow label="Gender"       value={app.gender} />
            <InfoRow label="Date of Birth" value={fmtDate(app.dateOfBirth)} />
            <InfoRow label="Nationality"  value={app.nationality} />
            <InfoRow label="Phone"        value={app.phone} />
            <InfoRow label="Email"        value={app.email} />
            <InfoRow label="Address"      value={app.physicalAddress} />
          </Card>

          {/* Education */}
          {app.educationBackground && app.educationBackground.length > 0 && (
            <Card title="Education Background" icon={FaGraduationCap}>
              <div className="space-y-4">
                {app.educationBackground.map((edu: any, i: number) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-4 border border-gray-100">
                    <p className="font-bold text-gray-800 text-sm">{edu.institution || "—"}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{edu.course} {edu.qualification ? `· ${edu.qualification}` : ""}</p>
                    {edu.graduationYear && <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1"><FaCalendarAlt size={9} /> Graduated {edu.graduationYear}</p>}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Work Experience */}
          <Card title="Work Experience" icon={FaBriefcase}>
            {!app.workExperience || app.workExperience.length === 0 ? (
              <p className="text-sm text-gray-400 italic">No work experience listed.</p>
            ) : (
              <div className="space-y-4">
                {app.workExperience.map((w: any, i: number) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{w.position || "—"}</p>
                        <p className="text-xs text-gray-500">{w.company}</p>
                      </div>
                      {w.duration && <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-lg flex-shrink-0 ml-2">{w.duration}</span>}
                    </div>
                    {w.responsibilities && (
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed border-t border-gray-100 pt-2">{w.responsibilities}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Why hire you */}
          {app.whyShouldWeHireYou && (
            <Card title="Why Should We Hire You?" icon={FaStar}>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{app.whyShouldWeHireYou}</p>
            </Card>
          )}

          {/* Documents */}
          <Card title="Uploaded Documents" icon={FaFileAlt}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DocLink label="CV / Resume"          url={app.cvUrl} />
              <DocLink label="Academic Documents"   url={app.academicDocumentsUrl} />
              <DocLink label="National ID / Passport" url={app.nationalIdUrl} />
              <DocLink label="Cover Letter"         url={app.coverLetterUrl} />
              <DocLink label="Passport Photo"       url={app.passportPhotoUrl} />
            </div>
          </Card>
        </div>

        {/* ── Right / Sidebar ──────────────────────────────────────────────── */}
        <div className="space-y-5">

          {/* Status card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Application Status</p>
            <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold ${styles.badge}`}>
              <span className={`w-2 h-2 rounded-full ${styles.dot}`} />
              {app.status.replace(/_/g, " ")}
            </div>
            <div className="mt-4 space-y-2 text-xs text-gray-400">
              <div className="flex items-center gap-1.5"><FaCalendarAlt size={10} /> Applied: {fmtDateTime(app.createdAt)}</div>
              {app.reviewedBy && <div className="flex items-center gap-1.5"><FaUser size={10} /> Reviewed by: {app.reviewedBy.name}</div>}
            </div>
            <button
              onClick={() => setModal(true)}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-3 rounded-xl transition-colors shadow-sm shadow-blue-200"
            >
              <FaPaperPlane size={11} /> Update & Send Feedback
            </button>
          </div>

          {/* Job Info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Position Applied</p>
            <p className="font-bold text-gray-800 text-sm">{app.job.title}</p>
            <p className="text-xs text-gray-400 mt-0.5">{app.job.department}</p>
            <div className="mt-3 space-y-1.5 text-xs text-gray-400">
              <div className="flex items-center gap-1.5"><FaMapMarkerAlt size={10} />{app.job.location}</div>
              <div className="flex items-center gap-1.5"><FaCalendarAlt size={10} />Deadline: {fmtDate(app.job.applicationDeadline)}</div>
            </div>
            <Link href={`/admin/careers/jobs/${app.job.id}`}
              className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline">
              View Job Posting →
            </Link>
          </div>

          {/* Professional Details */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Professional</p>
            {app.skills && app.skills.length > 0 && (
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1.5">Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {app.skills.map((s, i) => (
                    <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg font-medium border border-blue-100">{s}</span>
                  ))}
                </div>
              </div>
            )}
            {app.certifications && (
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">Certifications</p>
                <p className="text-xs text-gray-600 leading-relaxed">{app.certifications}</p>
              </div>
            )}
            {app.languages && (
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">Languages</p>
                <p className="text-xs text-gray-600">{app.languages}</p>
              </div>
            )}
            {app.expectedSalary && (
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">Expected Salary</p>
                <p className="text-xs text-gray-700 font-semibold">UGX {app.expectedSalary.toLocaleString()} / month</p>
              </div>
            )}
            {app.availableStartDate && (
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">Available From</p>
                <p className="text-xs text-gray-600">{fmtDate(app.availableStartDate)}</p>
              </div>
            )}
          </div>

          {/* Interview Info */}
          {app.interviewScheduledAt && (
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
              <p className="text-xs font-black text-blue-700 uppercase tracking-widest mb-3">Interview Scheduled</p>
              <div className="space-y-1.5 text-xs text-blue-800">
                <div className="flex items-center gap-1.5"><FaCalendarAlt size={10} />{fmtDateTime(app.interviewScheduledAt)}</div>
                {app.interviewLocation && <div className="flex items-center gap-1.5"><FaMapMarkerAlt size={10} />{app.interviewLocation}</div>}
                {app.interviewNotes && <p className="mt-2 text-blue-600 leading-relaxed border-t border-blue-100 pt-2">{app.interviewNotes}</p>}
              </div>
            </div>
          )}

          {/* Review Notes */}
          {app.reviewNotes && (
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
              <p className="text-xs font-black text-amber-700 uppercase tracking-widest mb-2">Internal Notes</p>
              <p className="text-xs text-amber-800 leading-relaxed">{app.reviewNotes}</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Feedback Modal ──────────────────────────────────────────────────── */}
      <FeedbackModal
        open={modal}
        onClose={() => setModal(false)}
        applicantName={app.fullName}
        applicantEmail={app.email}
        currentStatus={app.status}
        onSend={handleUpdate}
      />
    </div>
  )
}