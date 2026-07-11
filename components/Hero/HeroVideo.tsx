"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"

interface HeroVideoProps {
  videoId: string
}

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

const HeroVideo = ({ videoId }: HeroVideoProps) => {
  const [muted, setMuted] = useState(true)
  const [showHint, setShowHint] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const inViewRef = useRef(true)

  // Load the YouTube IFrame API and create the player
  useEffect(() => {
    let cancelled = false
    let unmuteTimer: ReturnType<typeof setTimeout>
    let confirmTimer: ReturnType<typeof setTimeout>

    const createPlayer = () => {
      if (cancelled || !containerRef.current) return

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        playerVars: {
          autoplay: 1,
          // Start muted — this is the ONLY combination every major
          // browser guarantees will actually autoplay. We try to
          // unmute immediately after, and fall back gracefully if
          // the browser refuses.
          mute: 1,
          loop: 1,
          playlist: videoId,
          controls: 0,
          modestbranding: 1,
          showinfo: 0,
          rel: 0,
          playsinline: 1,
          iv_load_policy: 3,
          disablekb: 1,
          vq: "hd1080",
        },
        events: {
          onReady: (event: any) => {
            event.target.mute()
            event.target.playVideo()

            // Give the player a beat to actually start, then try to
            // turn sound on. Some browsers allow this without a
            // gesture (especially returning visitors); most won't.
            unmuteTimer = setTimeout(() => {
              if (cancelled) return
              event.target.unMute()
              event.target.setVolume(100)

              // Confirm whether it actually took using the player's
              // own isMuted() — far more reliable than inferring it
              // from playback state.
              confirmTimer = setTimeout(() => {
                if (cancelled) return
                const stillMuted = event.target.isMuted()
                setMuted(stillMuted)
                setShowHint(stillMuted)
              }, 250)
            }, 300)
          },
        },
      })
    }

    if (window.YT && window.YT.Player) {
      createPlayer()
    } else {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      document.body.appendChild(tag)
      const prevReady = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        prevReady?.()
        createPlayer()
      }
    }

    return () => {
      cancelled = true
      clearTimeout(unmuteTimer)
      clearTimeout(confirmTimer)
      playerRef.current?.destroy?.()
    }
  }, [videoId])

  // Unmute the instant the visitor interacts with the page in any
  // way — satisfies every browser's autoplay-with-sound policy.
  useEffect(() => {
    if (!muted) return

    const unmuteOnInteraction = () => {
      const player = playerRef.current
      if (player) {
        player.unMute()
        player.setVolume(100)
        setMuted(false)
        setShowHint(false)
      }
    }

    const events = ["click", "scroll", "keydown", "touchstart"] as const
    events.forEach((evt) => window.addEventListener(evt, unmuteOnInteraction, { once: true }))

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, unmuteOnInteraction))
    }
  }, [muted])

  // Pause when scrolled out of view, resume when it's back in view.
  useEffect(() => {
    const node = wrapperRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting
        const player = playerRef.current
        if (!player) return

        if (entry.isIntersecting) {
          player.playVideo?.()
        } else {
          player.pauseVideo?.()
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const toggleMute = () => {
    const player = playerRef.current
    if (!player) return
    if (muted) {
      player.unMute()
      player.setVolume(100)
      setMuted(false)
      setShowHint(false)
    } else {
      player.mute()
      setMuted(true)
    }
  }

  return (
    <div ref={wrapperRef} className="relative w-full h-full overflow-hidden bg-gray-950">
      {/* ── Fullscreen "cover" video frame ── */}
      <motion.div
        initial={{ scale: 1.04, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <div className="relative w-full h-full">
          {/* Glow behind video */}
          <div className="absolute inset-0 blur-2xl bg-blue-600/10 scale-95 z-0" />

          {/* Video wrapper — clips + covers like object-fit: cover */}
          <div className="relative w-full h-full overflow-hidden z-[1] bg-gray-950">
            <div
              className="
                absolute top-1/2 left-1/2
                w-[177.78vh] h-[56.25vw]
                min-w-full min-h-full
                -translate-x-1/2 -translate-y-1/2
                pointer-events-none
              "
            >
              <div ref={containerRef} className="w-full h-full" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Bottom gradient overlay for legibility ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-950/85 to-transparent z-20 pointer-events-none" />

      {/* ── Top gradient overlay for depth ── */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-950/40 to-transparent z-20 pointer-events-none" />

      {/* ── Corner accent dots ── */}
      <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-blue-400/60 z-30" />
      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-indigo-400/60 z-30" />
      <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-purple-400/60 z-30" />
      <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-blue-400/60 z-30" />

      {/* ── Invisible click-blocker so the video stays purely decorative ── */}
      <div className="absolute inset-0 z-40" />

      {/* ── "Tap for sound" hint — only shows if autoplay-with-sound was blocked ── */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="
              absolute bottom-4 right-16 z-50
              px-3 py-1.5 rounded-full
              bg-black/50 backdrop-blur-sm
              border border-white/20
              text-white text-xs
              pointer-events-none
              whitespace-nowrap
            "
          >
            Tap anywhere for sound
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mute/Unmute toggle ── */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="
          absolute bottom-4 right-4 z-50
          w-10 h-10 rounded-full
          bg-black/50 backdrop-blur-sm
          border border-white/20
          flex items-center justify-center
          text-white
          hover:bg-black/70 transition-colors
        "
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </div>
  )
}

export default HeroVideo