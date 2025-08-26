"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CalendarIcon, ClockIcon } from "@heroicons/react/solid"
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
    if (currentMonthEvents.length > 0) {
      const interval = setInterval(() => {
        setCurrentEventIndex((prev) => (prev + 1) % currentMonthEvents.length)
      }, 4000) // Change every 4 seconds

      return () => clearInterval(interval)
    }
  }, [currentMonthEvents.length])

  return (
    <section className="py-4 lg:py-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 h-full">
      <div className="px-3 lg:px-4 h-full">
        {/* Section Header - Compact version */}
        <div className="text-center mb-6 lg:mb-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2"
          >
            School Events
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm lg:text-base text-gray-600 dark:text-gray-300"
          >
            Current & upcoming activities
          </motion.p>
        </div>

        <div className="space-y-4 lg:space-y-6">
          {/* Featured Activities Slider - Compact version */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-primary to-blue-600 p-3 lg:p-4 text-white">
              <h3 className="text-lg lg:text-xl font-bold mb-1">
                Featured - {format(firstDayCurrentMonth, "MMM yyyy")}
              </h3>
              <p className="opacity-90 text-sm">Current month highlights</p>
            </div>

            <div className="p-4 lg:p-6 h-48 lg:h-64 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {currentMonthEvents.length > 0 && (
                  <motion.div
                    key={currentEventIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 p-4 lg:p-6"
                  >
                    <div className="flex flex-col items-start space-y-3 lg:space-y-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 lg:w-16 lg:h-16 bg-primary/10 rounded-full flex items-center justify-center">
                          <CalendarIcon className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {currentMonthEvents[currentEventIndex]?.title}
                        </h4>
                        <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300 mb-3 line-clamp-3 leading-relaxed">
                          {currentMonthEvents[currentEventIndex]?.description}
                        </p>
                        <div className="flex flex-col space-y-1 text-xs lg:text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-2">
                            <ClockIcon className="w-4 h-4" />
                            <span className="font-medium">
                              {format(parseISO(currentMonthEvents[currentEventIndex]?.startDatetime), "MMM dd, yyyy")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Event Navigation Dots */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {currentMonthEvents.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentEventIndex(index)}
                    className={classNames(
                      "w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300",
                      index === currentEventIndex
                        ? "bg-primary scale-125"
                        : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400",
                    )}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Upcoming Events - Compact grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 lg:p-6"
          >
            <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">
              Next Month - {format(nextMonth, "MMM yyyy")}
            </h3>

            <div className="grid grid-cols-1 gap-3 lg:gap-4 max-h-80 lg:max-h-96 overflow-y-auto">
              {nextMonthEvents.slice(0, 4).map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg p-3 lg:p-4 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <CalendarIcon className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm lg:text-base font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                        {event.title}
                      </h4>
                      <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex items-center text-xs text-primary font-medium">
                        <ClockIcon className="w-3 h-3 mr-1" />
                        {format(parseISO(event.startDatetime), "MMM dd")}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {nextMonthEvents.length === 0 && (
              <div className="text-center py-8">
                <CalendarIcon className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-sm text-gray-500 dark:text-gray-400">No Events for {format(nextMonth, "MMMM")}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default EnhancedEventsSection
