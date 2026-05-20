"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { generateReactHelpers } from "@uploadthing/react"
import type { OurFileRouter } from "@/app/api/uploadthing/core"
import {
  FaChevronLeft, FaUser, FaGraduationCap, FaBriefcase, FaPlus,
  FaTrash, FaCheckCircle, FaExclamationCircle, FaArrowRight,
  FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaFileAlt, FaTimes,
  FaCloudUploadAlt, FaSpinner, FaLink,
} from "react-icons/fa"

// ─── UploadThing client ───────────────────────────────────────────────────────

const { useUploadThing } = generateReactHelpers<OurFileRouter>()

// ─── Types ────────────────────────────────────────────────────────────────────

interface Job {
  id: string
  title: string
  department: string
  location: string
  applicationDeadline: string
  minimumQualification: string
  vacancies: number
}

interface EducationEntry {
  institution: string
  course: string
  qualification: string
  graduationYear: string
}

interface WorkEntry {
  company: string
  position: string
  duration: string
  responsibilities: string
}

interface FormData {
  fullName: string
  gender: string
  dateOfBirth: string
  nationality: string
  phone: string
  email: string
  physicalAddress: string
  educationBackground: EducationEntry[]
  workExperience: WorkEntry[]
  skills: string
  certifications: string
  languages: string
  whyShouldWeHireYou: string
  expectedSalary: string
  availableStartDate: string
  consentGiven: boolean
}

type FileKey = "cvUrl" | "academicDocumentsUrl" | "nationalIdUrl" | "coverLetterUrl" | "passportPhotoUrl"

type UploadStatus = "idle" | "uploading" | "done" | "error"

interface FileState {
  file: File | null
  url: string | null
  status: UploadStatus
  error: string | null
  progress: number
}

const INITIAL_FILE_STATE: FileState = {
  file: null, url: null, status: "idle", error: null, progress: 0,
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-UG", {
      day: "numeric", month: "long", year: "numeric",
    })
  } catch { return "—" }
}

function daysUntil(iso: string) {
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000)
}

// ─── Step Config ──────────────────────────────────────────────────────────────

const STEPS = [
  { label: "Personal Info",   shortLabel: "Personal",   icon: FaUser },
  { label: "Education",       shortLabel: "Education",  icon: FaGraduationCap },
  { label: "Work Experience", shortLabel: "Experience", icon: FaBriefcase },
  { label: "Documents",       shortLabel: "Documents",  icon: FaFileAlt },
  { label: "Final Details",   shortLabel: "Final",      icon: FaCheckCircle },
]

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="w-full">
      <div className="sm:hidden mb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            Step {current + 1} of {STEPS.length}
          </span>
          <span className="text-xs font-semibold text-gray-500">{STEPS[current].label}</span>
        </div>
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-600 rounded-full"
            initial={false}
            animate={{ width: `${((current + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>
      </div>
      <div className="hidden sm:flex items-center justify-center gap-0">
        {STEPS.map((step, i) => {
          const Icon = step.icon
          const done = i < current
          const active = i === current
          return (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  done ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : active ? "bg-blue-600 text-white ring-4 ring-blue-100 shadow-lg shadow-blue-200"
                  : "bg-gray-100 text-gray-400"
                }`}>
                  {done ? <FaCheckCircle size={14} /> : <Icon size={13} />}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wide transition-colors ${
                  active ? "text-blue-600" : done ? "text-gray-500" : "text-gray-300"
                }`}>{step.shortLabel}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="relative mx-2 mb-5">
                  <div className="h-0.5 w-12 lg:w-16 bg-gray-100 rounded-full" />
                  {i < current && (
                    <motion.div
                      className="absolute inset-0 h-0.5 bg-blue-500 rounded-full"
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    />
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({ label, required, children, hint }: {
  label: string; required?: boolean; children: React.ReactNode; hint?: string
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">{hint}</p>}
    </div>
  )
}

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white text-gray-800 placeholder-gray-300 " +
  "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 hover:border-gray-300"
const selectCls = inputCls + " appearance-none cursor-pointer"
const textareaCls = inputCls + " resize-none leading-relaxed"

// ─── Smart File Upload (uploads immediately on pick) ──────────────────────────

function FileUpload({
  label, required, fileKey, state, onFileChange,
}: {
  label: string
  required?: boolean
  fileKey: FileKey
  state: FileState
  onFileChange: (key: FileKey, file: File) => void
}) {
  const ref = useRef<HTMLInputElement>(null)

  const statusColor = {
    idle: "border-gray-200 bg-gray-50/60",
    uploading: "border-blue-300 bg-blue-50/40",
    done: "border-green-300 bg-green-50/50",
    error: "border-red-300 bg-red-50/50",
  }[state.status]

  return (
    <div>
      <p className="text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">
        {label} {required && <span className="text-rose-500">*</span>}
      </p>

      <div
        onClick={() => state.status !== "uploading" && ref.current?.click()}
        className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 border-dashed transition-all duration-200 ${statusColor} ${
          state.status !== "uploading" ? "cursor-pointer hover:border-blue-300 hover:bg-blue-50/30" : "cursor-not-allowed"
        }`}
      >
        <input
          ref={ref}
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) onFileChange(fileKey, f)
            e.target.value = "" // reset so same file can be re-picked
          }}
        />

        {/* idle */}
        {state.status === "idle" && (
          <>
            <FaCloudUploadAlt className="text-gray-300 flex-shrink-0" size={18} />
            <span className="text-sm text-gray-400">Click to upload</span>
          </>
        )}

        {/* uploading */}
        {state.status === "uploading" && (
          <>
            <FaSpinner className="text-blue-500 flex-shrink-0 animate-spin" size={15} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-blue-700 font-medium truncate">{state.file?.name}</p>
              <div className="mt-1.5 h-1 w-full bg-blue-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500 rounded-full"
                  animate={{ width: `${state.progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-[10px] text-blue-400 mt-0.5">{state.progress}% uploaded</p>
            </div>
          </>
        )}

        {/* done */}
        {state.status === "done" && (
          <>
            <FaCheckCircle className="text-green-500 flex-shrink-0" size={15} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-green-700 font-medium truncate">{state.file?.name}</p>
              
               <a href={state.url!}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-[10px] text-green-600 hover:text-green-700 underline mt-0.5"
              >
                <FaLink size={8} /> View uploaded file
              </a>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); ref.current?.click() }}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-400 hover:bg-blue-100 hover:text-blue-500 transition-colors flex-shrink-0"
              title="Replace file"
            >
              <FaTimes size={10} />
            </button>
          </>
        )}

        {/* error */}
        {state.status === "error" && (
          <>
            <FaExclamationCircle className="text-red-400 flex-shrink-0" size={15} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-red-600 font-medium">Upload failed — click to retry</p>
              <p className="text-[10px] text-red-400 mt-0.5 truncate">{state.error}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ title, subtitle, children }: {
  title: string; subtitle?: string; children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-black text-gray-900 tracking-tight">{title}</h2>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

// ─── Nav Buttons ──────────────────────────────────────────────────────────────

function NavButtons({ step, jobId, submitting, uploading, onPrev, onNext, onSubmit }: {
  step: number; jobId: string; submitting: boolean; uploading: boolean
  onPrev: () => void; onNext: () => void; onSubmit: () => void
}) {
  const isFirst = step === 0
  const isLast = step === STEPS.length - 1
  const busy = submitting || uploading

  return (
    <div className="flex items-center justify-between mt-8 gap-3">
      {isFirst ? (
        <Link
          href={`/jobs/${jobId}`}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
        >
          <FaArrowLeft size={11} /> Back to Job
        </Link>
      ) : (
        <button
          type="button"
          onClick={onPrev}
          disabled={busy}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
        >
          <FaArrowLeft size={11} /> Previous
        </button>
      )}

      <span className="hidden sm:block text-xs text-gray-400 font-medium">
        {step + 1} / {STEPS.length}
      </span>

      {isLast ? (
        <button
          type="button"
          onClick={onSubmit}
          disabled={busy}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold px-7 py-3 rounded-xl transition-all duration-200 shadow-md shadow-blue-200"
        >
          {uploading ? (
            <><FaSpinner className="animate-spin" size={13} /> Uploading files…</>
          ) : submitting ? (
            <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting…</>
          ) : (
            <><FaCheckCircle size={13} /> Submit Application</>
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-7 py-3 rounded-xl transition-all duration-200 shadow-md shadow-blue-200"
        >
          Continue <FaArrowRight size={11} />
        </button>
      )}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ApplyPage() {
  const { id } = useParams<{ id: string }>()

  const [job, setJob] = useState<Job | null>(null)
  const [jobLoading, setJobLoading] = useState(true)
  const [jobError, setJobError] = useState<string | null>(null)

  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Each file field has its own state so uploads can run independently
  const [fileStates, setFileStates] = useState<Record<FileKey, FileState>>({
    cvUrl:                { ...INITIAL_FILE_STATE },
    academicDocumentsUrl: { ...INITIAL_FILE_STATE },
    nationalIdUrl:        { ...INITIAL_FILE_STATE },
    coverLetterUrl:       { ...INITIAL_FILE_STATE },
    passportPhotoUrl:     { ...INITIAL_FILE_STATE },
  })

  const anyUploading = Object.values(fileStates).some((s) => s.status === "uploading")

  const [form, setForm] = useState<FormData>({
    fullName: "", gender: "", dateOfBirth: "", nationality: "",
    phone: "", email: "", physicalAddress: "",
    educationBackground: [{ institution: "", course: "", qualification: "", graduationYear: "" }],
    workExperience: [],
    skills: "", certifications: "", languages: "",
    whyShouldWeHireYou: "", expectedSalary: "", availableStartDate: "",
    consentGiven: false,
  })

  // ── UploadThing hook ────────────────────────────────────────────────────────
  // We use the "applicationDocuments" route defined in your core.ts
  const { startUpload } = useUploadThing("applicationDocuments", {
    onUploadProgress: (progress) => {
      // progress is a number 0-100; we track per-file via the pendingKey ref
      setFileStates((prev) => {
        const uploading = Object.keys(prev).find(
          (k) => prev[k as FileKey].status === "uploading"
        ) as FileKey | undefined
        if (!uploading) return prev
        return { ...prev, [uploading]: { ...prev[uploading], progress } }
      })
    },
  })

  // We upload one file at a time so progress tracking is unambiguous
  async function uploadFile(key: FileKey, file: File) {
    setFileStates((prev) => ({
      ...prev,
      [key]: { file, url: null, status: "uploading", error: null, progress: 0 },
    }))
    try {
      const result = await startUpload([file])
      const url = result?.[0]?.url ?? result?.[0]?.ufsUrl ?? null
      if (!url) throw new Error("No URL returned from UploadThing")
      setFileStates((prev) => ({
        ...prev,
        [key]: { file, url, status: "done", error: null, progress: 100 },
      }))
    } catch (err: any) {
      setFileStates((prev) => ({
        ...prev,
        [key]: { file, url: null, status: "error", error: err.message ?? "Upload failed", progress: 0 },
      }))
    }
  }

  // Called by FileUpload when user picks a file
  function handleFileChange(key: FileKey, file: File) {
    uploadFile(key, file)
  }

  // ── Fetch job ───────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!id) return
    async function load() {
      try {
        const res = await fetch(`/api/careers/jobs/${id}`)
        const json = await res.json()
        if (!json.success) throw new Error(json.error || "Job not found")
        setJob(json.data)
      } catch (e: any) {
        setJobError(e.message)
      } finally {
        setJobLoading(false)
      }
    }
    load()
  }, [id])

  // ── Form helpers ────────────────────────────────────────────────────────────

  function setField(key: keyof FormData, value: any) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  const addEdu = () =>
    setField("educationBackground", [
      ...form.educationBackground,
      { institution: "", course: "", qualification: "", graduationYear: "" },
    ])
  const removeEdu = (i: number) =>
    setField("educationBackground", form.educationBackground.filter((_, idx) => idx !== i))
  const setEdu = (i: number, key: keyof EducationEntry, val: string) => {
    const arr = [...form.educationBackground]
    arr[i] = { ...arr[i], [key]: val }
    setField("educationBackground", arr)
  }

  const addWork = () =>
    setField("workExperience", [
      ...form.workExperience,
      { company: "", position: "", duration: "", responsibilities: "" },
    ])
  const removeWork = (i: number) =>
    setField("workExperience", form.workExperience.filter((_, idx) => idx !== i))
  const setWork = (i: number, key: keyof WorkEntry, val: string) => {
    const arr = [...form.workExperience]
    arr[i] = { ...arr[i], [key]: val }
    setField("workExperience", arr)
  }

  function goNext() {
    setDirection(1)
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  function goPrev() {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 0))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // ── Submit ──────────────────────────────────────────────────────────────────

  async function handleSubmit() {
    if (!form.consentGiven) {
      setSubmitError("You must give consent to submit the application.")
      return
    }

    // Block if any file is still uploading
    if (anyUploading) {
      setSubmitError("Please wait for all files to finish uploading.")
      return
    }

    // Check CV is uploaded (required)
    if (!fileStates.cvUrl.url) {
      setSubmitError("Please upload your CV / Resume before submitting.")
      return
    }

    setSubmitting(true)
    setSubmitError(null)

    try {
      // Send plain JSON — file URLs are already resolved
      const payload = {
        fullName:            form.fullName,
        gender:              form.gender,
        dateOfBirth:         form.dateOfBirth,
        nationality:         form.nationality,
        phone:               form.phone,
        email:               form.email,
        physicalAddress:     form.physicalAddress,
        educationBackground: form.educationBackground,
        workExperience:      form.workExperience,
        skills:              form.skills,
        certifications:      form.certifications,
        languages:           form.languages,
        whyShouldWeHireYou:  form.whyShouldWeHireYou,
        expectedSalary:      form.expectedSalary,
        availableStartDate:  form.availableStartDate,
        consentGiven:        true,
        // File URLs (null if not uploaded)
        cvUrl:                fileStates.cvUrl.url,
        academicDocumentsUrl: fileStates.academicDocumentsUrl.url,
        nationalIdUrl:        fileStates.nationalIdUrl.url,
        coverLetterUrl:       fileStates.coverLetterUrl.url,
        passportPhotoUrl:     fileStates.passportPhotoUrl.url,
      }

      const res = await fetch(`/api/careers/jobs/${id}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.error || "Submission failed")
      setSubmitted(true)
    } catch (e: any) {
      setSubmitError(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  // ── Guards ──────────────────────────────────────────────────────────────────

  if (jobLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    )
  }

  if (jobError || !job) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-center px-4">
        <div>
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaExclamationCircle className="text-red-400" size={28} />
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">Job Not Found</h2>
          <p className="text-gray-500 text-sm mb-5">{jobError}</p>
          <Link href="/jobs" className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors">
            <FaChevronLeft size={10} /> Back to Jobs
          </Link>
        </div>
      </div>
    )
  }

  const days = daysUntil(job.applicationDeadline)
  if (days < 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-center px-4">
        <div>
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaCalendarAlt className="text-gray-400" size={28} />
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">Applications Closed</h2>
          <p className="text-gray-500 text-sm mb-5">The deadline for this position has passed.</p>
          <Link href={`/jobs/${id}`} className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors">
            <FaChevronLeft size={10} /> Back to Job
          </Link>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <FaCheckCircle className="text-green-500" size={38} />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Application Submitted!</h2>
          <p className="text-gray-500 text-sm mb-2">
            Your application for <strong className="text-gray-700">{job.title}</strong> has been received.
          </p>
          <p className="text-gray-400 text-xs mb-8 leading-relaxed">
            We'll review your application and get back to you at{" "}
            <strong className="text-gray-600">{form.email}</strong>.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors w-full shadow-md shadow-blue-200"
          >
            Browse More Jobs <FaArrowRight size={12} />
          </Link>
        </motion.div>
      </div>
    )
  }

  // ── Form ────────────────────────────────────────────────────────────────────

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="bg-gradient-to-br from-[#0f2554] via-[#1a3a8f] to-[#2455c7] text-white">
        <div className="container mx-auto px-4 pt-8 pb-12 max-w-3xl">
          <Link
            href={`/jobs/${id}`}
            className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm font-medium mb-6 transition-colors"
          >
            <FaChevronLeft size={10} /> Back to Job Details
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-1">Apply for this Position</h1>
          <p className="text-blue-300 text-sm">{job.title} &mdash; {job.department}</p>
          <div className="flex flex-wrap gap-4 mt-3 text-xs text-blue-300">
            <span className="flex items-center gap-1.5"><FaMapMarkerAlt size={10} /> {job.location}</span>
            <span className="flex items-center gap-1.5"><FaCalendarAlt size={10} /> Deadline: {fmtDate(job.applicationDeadline)}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16 max-w-3xl -mt-4">

        {/* Step indicator */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 mb-6">
          <StepIndicator current={step} />
        </div>

        {/* Animated content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >

            {/* STEP 0 — Personal Info */}
            {step === 0 && (
              <Section title="Personal Information" subtitle="Please fill in your personal details accurately">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <Field label="Full Name" required>
                      <input className={inputCls} placeholder="e.g. John Doe" value={form.fullName}
                        onChange={(e) => setField("fullName", e.target.value)} />
                    </Field>
                  </div>
                  <Field label="Gender">
                    <select className={selectCls} value={form.gender} onChange={(e) => setField("gender", e.target.value)}>
                      <option value="">Select gender</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other / Prefer not to say</option>
                    </select>
                  </Field>
                  <Field label="Date of Birth">
                    <input type="date" className={inputCls} value={form.dateOfBirth}
                      onChange={(e) => setField("dateOfBirth", e.target.value)} />
                  </Field>
                  <Field label="Nationality">
                    <input className={inputCls} placeholder="e.g. Ugandan" value={form.nationality}
                      onChange={(e) => setField("nationality", e.target.value)} />
                  </Field>
                  <Field label="Phone Number" required>
                    <input className={inputCls} placeholder="+256 700 000 000" value={form.phone}
                      onChange={(e) => setField("phone", e.target.value)} />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Email Address" required>
                      <input type="email" className={inputCls} placeholder="you@example.com" value={form.email}
                        onChange={(e) => setField("email", e.target.value)} />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Physical Address">
                      <input className={inputCls} placeholder="Street, City, District" value={form.physicalAddress}
                        onChange={(e) => setField("physicalAddress", e.target.value)} />
                    </Field>
                  </div>
                </div>
              </Section>
            )}

            {/* STEP 1 — Education */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-black text-gray-900 tracking-tight">Education Background</h2>
                      <p className="text-xs text-gray-400 mt-1">List your academic qualifications, most recent first</p>
                    </div>
                    <button onClick={addEdu}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-xl transition-colors">
                      <FaPlus size={10} /> Add Entry
                    </button>
                  </div>
                  <div className="space-y-4">
                    {form.educationBackground.map((edu, i) => (
                      <div key={i} className="relative bg-slate-50 rounded-xl p-5 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Entry {i + 1}</p>
                          {form.educationBackground.length > 1 && (
                            <button onClick={() => removeEdu(i)}
                              className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors">
                              <FaTrash size={11} /> Remove
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Field label="Institution">
                            <input className={inputCls} placeholder="University or School name" value={edu.institution}
                              onChange={(e) => setEdu(i, "institution", e.target.value)} />
                          </Field>
                          <Field label="Course / Programme">
                            <input className={inputCls} placeholder="e.g. BSc Computer Science" value={edu.course}
                              onChange={(e) => setEdu(i, "course", e.target.value)} />
                          </Field>
                          <Field label="Qualification">
                            <input className={inputCls} placeholder="e.g. Bachelor's Degree" value={edu.qualification}
                              onChange={(e) => setEdu(i, "qualification", e.target.value)} />
                          </Field>
                          <Field label="Graduation Year">
                            <input className={inputCls} placeholder="e.g. 2021" value={edu.graduationYear}
                              onChange={(e) => setEdu(i, "graduationYear", e.target.value)} />
                          </Field>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-5">
                  <div>
                    <h2 className="text-xl font-black text-gray-900 tracking-tight">Professional Profile</h2>
                    <p className="text-xs text-gray-400 mt-1">Skills, certifications, and languages</p>
                  </div>
                  <Field label="Key Skills" hint="Comma-separated — e.g. Leadership, MS Office, Communication">
                    <input className={inputCls} placeholder="e.g. Teaching, Research, Communication" value={form.skills}
                      onChange={(e) => setField("skills", e.target.value)} />
                  </Field>
                  <Field label="Certifications">
                    <textarea className={textareaCls} rows={3}
                      placeholder="List any professional certifications or training..." value={form.certifications}
                      onChange={(e) => setField("certifications", e.target.value)} />
                  </Field>
                  <Field label="Languages Spoken">
                    <input className={inputCls} placeholder="e.g. English, Luganda, Swahili" value={form.languages}
                      onChange={(e) => setField("languages", e.target.value)} />
                  </Field>
                </div>
              </div>
            )}

            {/* STEP 2 — Work Experience */}
            {step === 2 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-black text-gray-900 tracking-tight">Work Experience</h2>
                    <p className="text-xs text-gray-400 mt-1">Leave blank if this is your first job</p>
                  </div>
                  <button onClick={addWork}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-xl transition-colors">
                    <FaPlus size={10} /> Add Entry
                  </button>
                </div>
                {form.workExperience.length === 0 ? (
                  <div className="text-center py-14 border-2 border-dashed border-gray-100 rounded-xl">
                    <FaBriefcase size={30} className="mx-auto mb-3 text-gray-200" />
                    <p className="text-sm font-medium text-gray-400">No work experience added yet</p>
                    <p className="text-xs text-gray-300 mt-1 mb-4">That's okay — add an entry if you have previous experience</p>
                    <button onClick={addWork}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors">
                      <FaPlus size={10} /> Add Work Entry
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {form.workExperience.map((work, i) => (
                      <div key={i} className="relative bg-slate-50 rounded-xl p-5 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Position {i + 1}</p>
                          <button onClick={() => removeWork(i)}
                            className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors">
                            <FaTrash size={11} /> Remove
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Field label="Company / Organisation">
                            <input className={inputCls} placeholder="Company name" value={work.company}
                              onChange={(e) => setWork(i, "company", e.target.value)} />
                          </Field>
                          <Field label="Job Title / Position">
                            <input className={inputCls} placeholder="e.g. Teacher, Accountant" value={work.position}
                              onChange={(e) => setWork(i, "position", e.target.value)} />
                          </Field>
                          <div className="sm:col-span-2">
                            <Field label="Duration">
                              <input className={inputCls} placeholder="e.g. Jan 2020 – Dec 2022" value={work.duration}
                                onChange={(e) => setWork(i, "duration", e.target.value)} />
                            </Field>
                          </div>
                          <div className="sm:col-span-2">
                            <Field label="Key Responsibilities">
                              <textarea className={textareaCls} rows={3}
                                placeholder="Describe your main duties and achievements..." value={work.responsibilities}
                                onChange={(e) => setWork(i, "responsibilities", e.target.value)} />
                            </Field>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* STEP 3 — Documents */}
            {step === 3 && (
              <Section
                title="Upload Documents (Only pdfs can be uploaded)"
                subtitle="Files upload immediately when selected. Wait for all to finish before continuing."
              >
                {/* Upload summary banner */}
                {anyUploading && (
                  <div className="mb-5 flex items-center gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                    <FaSpinner className="text-blue-500 animate-spin flex-shrink-0" size={13} />
                    <p className="text-sm text-blue-700 font-medium">Uploading files — please don't close this page…</p>
                  </div>
                )}
                {!anyUploading && Object.values(fileStates).some((s) => s.status === "done") && (
                  <div className="mb-5 flex items-center gap-2.5 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" size={13} />
                    <p className="text-sm text-green-700 font-medium">All selected files uploaded successfully.</p>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FileUpload label="CV / Resume" required fileKey="cvUrl"
                    state={fileStates.cvUrl} onFileChange={handleFileChange} />
                  <FileUpload label="Academic Documents" fileKey="academicDocumentsUrl"
                    state={fileStates.academicDocumentsUrl} onFileChange={handleFileChange} />
                  <FileUpload label="National ID / Passport" fileKey="nationalIdUrl"
                    state={fileStates.nationalIdUrl} onFileChange={handleFileChange} />
                  <FileUpload label="Cover Letter" fileKey="coverLetterUrl"
                    state={fileStates.coverLetterUrl} onFileChange={handleFileChange} />
                  <FileUpload label="Passport Photo" fileKey="passportPhotoUrl"
                    state={fileStates.passportPhotoUrl} onFileChange={handleFileChange} />
                </div>
                {Object.values(fileStates).some((s) => s.status === "error") && (
                  <p className="mt-4 text-xs text-red-500">
                    Some files failed to upload. Click them again to retry.
                  </p>
                )}
              </Section>
            )}

            {/* STEP 4 — Final Details */}
            {step === 4 && (
              <div className="space-y-5">
                <Section title="Final Details" subtitle="Tell us a bit more about yourself and your expectations">
                  <div className="space-y-5">
                    <Field label="Why should we hire you?" required>
                      <textarea className={textareaCls} rows={6}
                        placeholder="Tell us what makes you the best candidate for this role…"
                        value={form.whyShouldWeHireYou}
                        onChange={(e) => setField("whyShouldWeHireYou", e.target.value)} />
                    </Field>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Expected Salary (UGX / month)">
                        <input type="number" className={inputCls} placeholder="e.g. 1500000"
                          value={form.expectedSalary}
                          onChange={(e) => setField("expectedSalary", e.target.value)} />
                      </Field>
                      <Field label="Available Start Date">
                        <input type="date" className={inputCls} value={form.availableStartDate}
                          onChange={(e) => setField("availableStartDate", e.target.value)} />
                      </Field>
                    </div>
                  </div>
                </Section>

                {/* Consent */}
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.consentGiven}
                      onChange={(e) => setField("consentGiven", e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-blue-600 flex-shrink-0 cursor-pointer"
                    />
                    <span className="text-sm text-blue-800 leading-relaxed">
                      I confirm that all information provided is accurate and complete. I give consent for this
                      organisation to store and process my personal data for the purposes of this recruitment process.
                    </span>
                  </label>
                </div>

                {submitError && (
                  <div className="flex items-center gap-2.5 bg-red-50 border border-red-100 rounded-xl px-4 py-3.5">
                    <FaExclamationCircle className="text-red-500 flex-shrink-0" size={14} />
                    <p className="text-sm text-red-600">{submitError}</p>
                  </div>
                )}
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        <NavButtons
          step={step}
          jobId={id}
          submitting={submitting}
          uploading={anyUploading}
          onPrev={goPrev}
          onNext={goNext}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}