"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, User, Mail, MessageSquare, CheckCircle, Clock, Phone, MapPin, Globe } from "lucide-react"

interface CommentFormProps {
  contentId: string
  contentType: "event" | "news"
  onCommentSubmitted: () => void
}

export default function CommentForm({ contentId, contentType, onCommentSubmitted }: CommentFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const apiEndpoint = contentType === "news" ? "news" : "events"
      const response = await fetch(`/api/${apiEndpoint}/${contentId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setShowSuccess(true)
        setFormData({ name: "", email: "", comment: "" })
        onCommentSubmitted()
        // Auto-hide success message after 8 seconds
        setTimeout(() => setShowSuccess(false), 8000)
      } else {
        setError(data.error || "Failed to submit comment")
      }
    } catch (error) {
      setError("Failed to submit comment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          Leave a Comment
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ... existing form fields ... */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>

          <div>
            <textarea
              placeholder="Write your comment here..."
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Comment
              </>
            )}
          </button>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
            >
              {error}
            </motion.div>
          )}
        </form>
      </motion.div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700"
            >
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </motion.div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Comment Submitted Successfully!
                </h3>

                <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400 mb-4">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm font-medium">Pending Admin Approval</span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Thank you for your comment! Your message has been received and will be reviewed by our administrators.
                  It will be published once approved to ensure quality and appropriateness.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 text-center">
                  Shining Stars Nursery And primary School Contact
                </h4>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3 text-blue-700 dark:text-blue-300">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>0393102603</span>
                  </div>

                  <div className="flex items-center gap-3 text-blue-700 dark:text-blue-300">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span>info@shiningstarsvvumba.com</span>
                  </div>

                  <div className="flex items-center gap-3 text-blue-700 dark:text-blue-300">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span> P.O Box 170262 Luwero, Uganda</span>
                  </div>

                  <div className="flex items-center gap-3 text-blue-700 dark:text-blue-300">
                    <Globe className="w-4 h-4 flex-shrink-0" />
                    <span>www.shiningstarsvvumba.com</span>
                  </div>
                </div>

                <p className="text-xs text-blue-600 dark:text-blue-400 mt-3 text-center italic">
                  "Arise And Shine" - For inquiries about your comment or school matters
                </p>
              </div>

              <button
                onClick={() => setShowSuccess(false)}
                className="w-full mt-6 bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
