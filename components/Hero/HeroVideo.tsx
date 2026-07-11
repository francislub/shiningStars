"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
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
  const [muted, setMuted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)

  // Load the YouTube IFrame API and create the player
  useEffect(() => {
    let cancelled = false

    const createPlayer = () => {
      if (cancelled || !containerRef.current) return

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 0, // try unmuted first
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
            // Attempt real unmuted autoplay
            event.target.unMute()
            event.target.setVolume(100)
            event.target.playVideo()

            // Browsers that block sound-on autoplay will leave the
            // player paused/unstarted — detect that and fall back
            // to muted autoplay so the video still plays.
            setTimeout(() => {
              const state = event.target.getPlayerState()
              // -1 unstarted, 0 ended, 2 paused = blocked
              if (state === -1 || state === 2 || state === 0) {
                event.target.mute()
                event.target.playVideo()
                setMuted(true)
              } else {
                setMuted(false)
              }
            }, 700)
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
      window.onYouTubeIframeAPIReady = createPlayer
    }

    return () => {
      cancelled = true
      playerRef.current?.destroy?.()
    }
  }, [videoId])

  // Unmute automatically the instant the visitor interacts with the page
  // in any way — this satisfies the browser's autoplay policy without
  // needing them to find/click a specific speaker button.
  useEffect(() => {
    const unmuteOnInteraction = () => {
      const player = playerRef.current
      if (player && muted) {
        player.unMute()
        player.setVolume(100)
        setMuted(false)
      }
      window.removeEventListener("click", unmuteOnInteraction)
      window.removeEventListener("scroll", unmuteOnInteraction)
      window.removeEventListener("keydown", unmuteOnInteraction)
      window.removeEventListener("touchstart", unmuteOnInteraction)
    }

    window.addEventListener("click", unmuteOnInteraction)
    window.addEventListener("scroll", unmuteOnInteraction)
    window.addEventListener("keydown", unmuteOnInteraction)
    window.addEventListener("touchstart", unmuteOnInteraction)

    return () => {
      window.removeEventListener("click", unmuteOnInteraction)
      window.removeEventListener("scroll", unmuteOnInteraction)
      window.removeEventListener("keydown", unmuteOnInteraction)
      window.removeEventListener("touchstart", unmuteOnInteraction)
    }
  }, [muted])

  const toggleMute = () => {
    const player = playerRef.current
    if (!player) return
    if (muted) {
      player.unMute()
      player.setVolume(100)
      setMuted(false)
    } else {
      player.mute()
      setMuted(true)
    }
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-950">
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