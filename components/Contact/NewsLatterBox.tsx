"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Stars, Send, Mail, X } from "lucide-react"

const NewsLatterBox: React.FC = () => {
  const router = useRouter()
  const [status, setStatus] = useState("")
  const [showThankYou, setShowThankYou] = useState(false)
  const [isExistingSubscriber, setIsExistingSubscriber] = useState(false)

  const [newsLetterEmail, setNewsLetterEmail] = React.useState({
    newsemail: "",
  })

  const [loading, setLoading] = React.useState(false)

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await fetch("/api/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newsLetterEmail),
      })
      const data = await res.json()
      if (data.success) {
        setNewsLetterEmail({
          newsemail: "",
        })
        setLoading(false)
        setIsExistingSubscriber(data.isExistingSubscriber || false)
        setShowThankYou(true)
        // Hide thank you message after 8 seconds
        setTimeout(() => {
          setShowThankYou(false)
        }, 8000)
      } else {
        setLoading(false)
        setStatus(data.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error(error.message)
      setStatus("Failed to subscribe. Please try again.")
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("")

    if (!newsLetterEmail.newsemail) {
      setStatus("Email is required")
      return
    }

    try {
      handleEmailSubmit(e)
    } catch (error) {
      setStatus("Failed to subscribe. Please try again.")
    }
  }

  // Thank You Modal Component
  const ThankYouModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={() => setShowThankYou(false)}
    >
      <motion.div
        className="relative max-w-md w-full bg-white dark:bg-[#1D2144] rounded-2xl p-8 shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {/* Close button */}
        <button
          onClick={() => setShowThankYou(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={24} />
        </button>

        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-200 rounded-full opacity-20"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-200 rounded-full opacity-20"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {isExistingSubscriber ? "You're Already Subscribed!" : "Thank You for Subscribing!"}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {isExistingSubscriber
                ? "You're already part of the Shining Stars family! We've sent you a confirmation email."
                : "You're now part of the Shining Stars family! We'll keep you updated with all our exciting events and news."}
            </p>
          </motion.div>

          <div className="w-full flex justify-center space-x-4 mb-4">
            <motion.div
              className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full"
              animate={{
                y: [0, -5, 0],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            >
              <Mail className="w-6 h-6 text-blue-500" />
            </motion.div>

            <motion.div
              className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full"
              animate={{
                y: [0, -5, 0],
                rotate: [0, -5, 0, 5, 0],
              }}
              transition={{
                duration: 2,
                delay: 0.3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            >
              <Stars className="w-6 h-6 text-purple-500" />
            </motion.div>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isExistingSubscriber
              ? "We've sent you a reminder email. Thank you for your continued support!"
              : "Check your inbox for a confirmation email from us!"}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <div className="relative">
      {/* Thank You Modal */}
      <AnimatePresence>{showThankYou && <ThankYouModal />}</AnimatePresence>

      {/* On big devices */}
      <div
        className="hidden md:flex flex-row w-[1200px] mx-auto justify-center items-center gap-20 wow fadeInUp relative z-10 rounded-2xl bg-primary/[3%] p-8 dark:bg-primary/10 shadow-lg"
        data-wow-delay=".2s"
      >
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-200 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-pulse"></div>
          <Image
            src="https://fra.cloud.appwrite.io/v1/storage/buckets/683383760031705f5948/files/6843f13e002a2e59e216/view?project=683381d6001779054d64&mode=admin"
            width={600}
            height={500}
            alt="Subscribe for school news"
            className="rounded-xl shadow-md relative z-10 object-cover"
          />
        </div>
        <div className="max-w-md">
          <div>
            <h3 className="mb-4 text-3xl font-bold leading-tight text-black dark:text-white">
              Join Our Shining Stars Family!
            </h3>
            <p className="mb-8 border-b border-body-color border-opacity-25 pb-8 text-lg font-medium leading-relaxed text-body-color dark:border-white dark:border-opacity-25">
              Subscribe to receive updates about school events, news, and activities directly to your inbox.
            </p>
          </div>

          {loading && (
            <div className="mt-2 mb-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <p className="text-lg text-orange-500 flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-orange-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing your subscription...
              </p>
            </div>
          )}

          <div>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-6">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  id="newsemail"
                  placeholder="Enter your email address"
                  value={newsLetterEmail.newsemail}
                  onChange={(e) =>
                    setNewsLetterEmail({
                      ...newsLetterEmail,
                      newsemail: e.target.value,
                    })
                  }
                  className="pl-12 w-full rounded-xl border border-body-color border-opacity-50 py-4 px-6 text-base font-medium text-body-color placeholder-body-color outline-none focus:border-primary focus:border-opacity-100 focus-visible:shadow-none dark:border-white dark:border-opacity-10 dark:bg-[#242B51] focus:dark:border-opacity-50 transition-all duration-300"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="duration-300 mb-4 w-full cursor-pointer rounded-xl border border-transparent bg-primary py-4 px-6 text-center text-base font-medium text-white outline-none transition ease-in-out hover:bg-opacity-80 hover:shadow-lg focus-visible:shadow-none flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Send size={20} />
                Subscribe to Newsletter
              </button>
              <p className="text-center text-base font-medium leading-relaxed text-body-color">
                We promise not to send spam, only important updates!
              </p>
              {status && (
                <p className="mt-4 text-center text-base font-medium leading-relaxed p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* On small devices */}
      <div
        className="block md:hidden wow fadeInUp relative z-10 rounded-xl bg-primary/[3%] p-6 dark:bg-primary/10 sm:p-8 shadow-lg"
        data-wow-delay=".2s"
      >
        <div className="relative mb-6 overflow-hidden rounded-xl">
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-yellow-200 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-200 rounded-full opacity-30 animate-pulse"></div>
          <Image
            src="https://fra.cloud.appwrite.io/v1/storage/buckets/683383760031705f5948/files/6841947c00006b45cc93/view?project=683381d6001779054d64&mode=admin"
            width={400}
            height={300}
            alt="Subscribe for school news"
            className="w-full h-48 object-cover rounded-xl"
          />
        </div>

        <h3 className="mb-4 text-2xl font-bold leading-tight text-black dark:text-white">
          Join Our Shining Stars Family!
        </h3>
        <p className="mb-6 border-b border-body-color border-opacity-25 pb-6 text-base font-medium leading-relaxed text-body-color dark:border-white dark:border-opacity-25">
          Subscribe to receive updates about school events, news, and activities.
        </p>

        {loading && (
          <div className="mt-2 mb-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <p className="text-sm text-orange-500 flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-orange-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={newsLetterEmail.newsemail}
              onChange={(e) =>
                setNewsLetterEmail({
                  ...newsLetterEmail,
                  newsemail: e.target.value,
                })
              }
              className="pl-10 w-full rounded-lg border border-body-color border-opacity-50 py-3 px-4 text-base font-medium text-body-color placeholder-body-color outline-none focus:border-primary focus:border-opacity-100 focus-visible:shadow-none dark:border-white dark:border-opacity-10 dark:bg-[#242B51] focus:dark:border-opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="duration-300 mb-4 w-full cursor-pointer rounded-lg border border-transparent bg-primary py-3 px-6 text-center text-base font-medium text-white outline-none transition ease-in-out hover:bg-opacity-80 hover:shadow-lg focus-visible:shadow-none flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Send size={18} />
            Subscribe
          </button>
          <p className="text-center text-sm font-medium leading-relaxed text-body-color">
            We promise not to send spam, only important updates!
          </p>
          {status && (
            <p className="mt-4 text-center text-sm font-medium leading-relaxed p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default NewsLatterBox
