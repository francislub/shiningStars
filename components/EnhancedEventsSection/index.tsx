"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CalendarIcon, ClockIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid"
import { add, format, isSameMonth, parseISO, startOfToday } from "date-fns"
import { activities } from "@/lib/constants"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

interface Activity {
  id: string
  title: string
  startDatetime: string
  endDatetime: string
  description: string
}

const EnhancedEventsSection = () => {
  const today = startOfToday()
  const [currentMonth] = useState(format(today, "MMM-yyyy"))
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const firstDayCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const nextMonth = add(firstDayCurrentMonth, { months: 1 })

  const currentMonthEvents = activities.filter((activity) => {
    const eventDate = parseISO(activity.startDatetime)
    return isSameMonth(eventDate, firstDayCurrentMonth)
  })

  const nextMonthEvents = activities.filter((activity) => {
    const eventDate = parseISO(activity.startDatetime)
    return isSameMonth(eventDate, nextMonth)
  })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (currentMonthEvents.length > 0) {
      const interval = setInterval(() => {
        setCurrentEventIndex((prev) => (prev + 1) % currentMonthEvents.length)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [currentMonthEvents.length])

  const handlePrevEvent = () => {
    setCurrentEventIndex((prev) =>
      prev === 0 ? currentMonthEvents.length - 1 : prev - 1
    )
  }

  const handleNextEvent = () => {
    setCurrentEventIndex((prev) => (prev + 1) % currentMonthEvents.length)
  }

  return (
    <section className="w-full space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
      {/* Section Header - Responsive Typography */}
      <div className="text-center md:text-left">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2"
        >
          School Activities
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xs sm:text-sm md:text-sm lg:text-base text-gray-600 dark:text-gray-300"
        >
          Current & upcoming activities
        </motion.p>
      </div>

      {/* Featured Activities Card - Advanced Responsive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-xl transition-shadow duration-300 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 p-2.5 sm:p-3 md:p-4 text-white">
          <h3 className="text-base sm:text-lg md:text-lg lg:text-xl font-bold mb-0.5 sm:mb-1">
            Featured - {format(firstDayCurrentMonth, "MMM yyyy")}
          </h3>
          <p className="opacity-90 text-xs sm:text-sm">Current month highlights</p>
        </div>

        {/* Content - Responsive height and padding */}
        <div className="relative overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700">
          <div className="min-h-[200px] sm:min-h-[240px] md:min-h-[280px] lg:h-64 p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col">
            <AnimatePresence mode="wait">
              {currentMonthEvents.length > 0 && (
                <motion.div
                  key={currentEventIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col space-y-2 sm:space-y-3 md:space-y-4 flex-1"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm">
                      <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="text-sm sm:text-base md:text-base lg:text-lg font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2 line-clamp-2">
                      {currentMonthEvents[currentEventIndex]?.title}
                    </h4>
                    <p className="text-xs sm:text-sm md:text-sm lg:text-base text-gray-600 dark:text-gray-300 mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                      {currentMonthEvents[currentEventIndex]?.description}
                    </p>
                    <div className="flex items-center space-x-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                      <ClockIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="truncate">
                        {format(parseISO(currentMonthEvents[currentEventIndex]?.startDatetime), "MMM dd, yyyy")}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Controls - Mobile Friendly */}
          <div className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 px-3 sm:px-4 md:px-5 lg:px-6 py-2.5 sm:py-3 flex items-center justify-between">
            {/* Left Navigation Button */}
            <button
              onClick={handlePrevEvent}
              className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Previous event"
            >
              <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Dots Navigation - Responsive spacing */}
            <div className="flex gap-1 sm:gap-1.5 flex-wrap justify-center flex-1 mx-2 sm:mx-3">
              {currentMonthEvents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentEventIndex(index)}
                  className={classNames(
                    "rounded-full transition-all duration-300",
                    index === currentEventIndex
                      ? "bg-blue-600 dark:bg-blue-500 scale-125 w-2.5 h-2.5 sm:w-3 sm:h-3 lg:scale-100"
                      : "bg-gray-300 dark:bg-gray-600 w-1.5 h-1.5 sm:w-2 sm:h-2 hover:bg-gray-400 dark:hover:bg-gray-500",
                  )}
                  aria-label={`Go to event ${index + 1}`}
                />
              ))}
            </div>

            {/* Right Navigation Button */}
            <button
              onClick={handleNextEvent}
              className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Next event"
            >
              <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Upcoming Events Section - Advanced Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md md:shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2.5 sm:p-3 md:p-4 text-white">
          <h3 className="text-base sm:text-lg md:text-lg lg:text-xl font-bold">
            Next Month - {format(nextMonth, "MMM yyyy")}
          </h3>
        </div>

        {/* Events List - Responsive */}
        <div className="p-3 sm:p-4 md:p-5 lg:p-6">
          {nextMonthEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3 md:gap-4 max-h-80 lg:max-h-96 overflow-y-auto">
              {nextMonthEvents.slice(0, 6).map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-2.5 sm:p-3 md:p-4 hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-600"
                >
                  <div className="flex gap-2 sm:gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 rounded-lg flex items-center justify-center">
                        <CalendarIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-0.5 sm:mb-1 line-clamp-2">
                        {event.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-1 sm:mb-1.5 line-clamp-1">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                        <ClockIcon className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">
                          {format(parseISO(event.startDatetime), "MMM dd")}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <CalendarIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2 sm:mb-3" />
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                No events for {format(nextMonth, "MMMM")}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}

export default EnhancedEventsSection
