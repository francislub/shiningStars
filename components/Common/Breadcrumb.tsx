"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ChevronRight as Crumb, AlertCircle } from "lucide-react"
import LoadingStars from "./LoadingStars"

interface LinkItem {
  href: string
  label: string
}

interface BreadcrumbProps {
  pageName: string
  description: string
  links?: LinkItem[]
}

interface Slide {
  id: string
  title: string
  description: string
  photo: string
  createdAt: string
}

const AUTOPLAY_MS = 6000

const Breadcrumb = ({ pageName, description, links }: BreadcrumbProps) => {
  const [slides, setSlides] = useState<Slide[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const progressKeyRef = useRef(0)

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch("/api/website-sliders")

        if (!response.ok) {
          throw new Error("Unable to load hero slides")
        }

        const data = await response.json()
        setSlides(data.slides || [])
      } catch (err: any) {
        setError(err.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchSlides()
  }, [])

  const goTo = useCallback(
    (index: number, dir: 1 | -1) => {
      if (slides.length === 0) return
      setDirection(dir)
      setCurrentIndex(((index % slides.length) + slides.length) % slides.length)
      progressKeyRef.current += 1
    },
    [slides.length],
  )

  const goNext = useCallback(() => goTo(currentIndex + 1, 1), [currentIndex, goTo])
  const goPrev = useCallback(() => goTo(currentIndex - 1, -1), [currentIndex, goTo])

  // Autoplay — pauses on hover/focus so visitors can actually read a slide
  useEffect(() => {
    if (slides.length <= 1 || isPaused) return
    const timer = setInterval(goNext, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [slides.length, isPaused, goNext])

  const activeSlide = slides[currentIndex]

  const slideVariants = {
    enter: (dir: 1 | -1) => ({ opacity: 0, x: dir === 1 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: 1 | -1) => ({ opacity: 0, x: dir === 1 ? -40 : 40 }),
  }

  return (
    <section
      className="relative z-10 overflow-hidden pt-8 lg:pt-[150px] min-h-[400px] lg:min-h-[600px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Background Slider */}
      <div className="absolute inset-0 h-full bg-gray-900">
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <LoadingStars />
            </motion.div>
          )}

          {!loading && error && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-900 text-white/80"
            >
              <AlertCircle className="w-6 h-6" />
              <p className="text-sm">{error}</p>
            </motion.div>
          )}

          {!loading && !error && slides.length === 0 && (
            // Graceful fallback — hero still works with a solid gradient if no slides are configured yet.
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900"
            />
          )}

          {!loading && !error && activeSlide && (
            <motion.div
              key={activeSlide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 h-full"
            >
              {/* Ken Burns: slow continuous zoom while a slide is active, resets each slide change */}
              <motion.div
                key={`${activeSlide.id}-kenburns`}
                initial={{ scale: 1 }}
                animate={{ scale: 1.08 }}
                transition={{ duration: AUTOPLAY_MS / 1000 + 1, ease: "linear" }}
                className="absolute inset-0"
              >
                <Image
                  src={activeSlide.photo || "/placeholder.svg"}
                  alt={activeSlide.title || `Slide ${currentIndex + 1}`}
                  fill
                  priority={currentIndex === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>

              {/* Layered gradient reads better across the whole image than a flat black overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  className="text-2xl md:text-4xl font-bold max-w-3xl"
                >
                  {activeSlide.title}
                </motion.h2>
                {activeSlide.description && (
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                    className="text-base md:text-xl mt-3 max-w-2xl text-white/85"
                  >
                    {activeSlide.description}
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Arrow controls */}
        {slides.length > 1 && !loading && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={goPrev}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={goNext}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Dot navigation + autoplay progress */}
        {slides.length > 1 && !loading && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goTo(index, index > currentIndex ? 1 : -1)}
                className="relative h-1.5 rounded-full bg-white/30 overflow-hidden transition-all duration-300"
                style={{ width: index === currentIndex ? 32 : 8 }}
              >
                {index === currentIndex && !isPaused && (
                  <motion.span
                    key={progressKeyRef.current}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                    className="absolute inset-y-0 left-0 bg-white"
                  />
                )}
                {index === currentIndex && isPaused && (
                  <span className="absolute inset-0 bg-white" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Foreground Content */}
      <div className="relative container z-20">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 md:w-8/12 lg:w-7/12">
            
          </div>

          {/* Breadcrumb Links */}
          <div className="w-full px-4 md:w-4/12 lg:w-5/12">
            <div className="text-end backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <ul className="flex items-center flex-wrap md:justify-end gap-y-1">
                <li className="flex items-center">
                  <Link
                    href="/"
                    className="pr-1 text-base font-medium text-body-color transition-colors"
                  >
                    Home
                  </Link>
                  <Crumb className="w-3.5 h-3.5 mr-2 text-body-color" />
                </li>

                {links?.map((link, index) => (
                  <li key={index} className="flex items-center">
                    <Link
                      href={link.href}
                      className="pr-1 text-base font-medium text-body-color hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                    <Crumb className="w-3.5 h-3.5 mr-2 text-body-color" />
                  </li>
                ))}

                <li className="text-base font-medium text-body-color transition-colors">{pageName}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Breadcrumb