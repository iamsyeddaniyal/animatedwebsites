"use client"
import { useEffect, useRef, useState } from "react"

export function ScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    video.pause()
    video.currentTime = 0

    // Only seek when scroll changes by more than this threshold (in seconds)
    // Keeps video on clean keyframes instead of blurry decoded mid-frames
    const SEEK_THRESHOLD = 0.04
    let lastTime = 0
    let rafId: number
    let pendingProgress = 0
    let dirty = false

    const commit = () => {
      if (dirty && video.readyState >= 2) {
        dirty = false
        const duration = video.duration || 1
        const targetTime = pendingProgress * duration
        if (Math.abs(targetTime - lastTime) >= SEEK_THRESHOLD) {
          video.currentTime = targetTime
          lastTime = targetTime
        }
      }
      rafId = requestAnimationFrame(commit)
    }

    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const containerHeight = container.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      if (scrolled < 0 || scrolled > containerHeight) return
      pendingProgress = scrolled / containerHeight
      setProgress(pendingProgress)
      dirty = true
    }

    rafId = requestAnimationFrame(commit)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#080808]">
        <video
          ref={videoRef}
          src="/assets/video.webm"
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 via-transparent to-transparent pointer-events-none" />

        {/* Scroll progress bar */}
        <div className="absolute bottom-8 left-6 md:left-10 flex items-center gap-4">
          <div className="w-32 h-px bg-[#1c1c1c]">
            <div
              className="h-full bg-[#c9a227] transition-none"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <span className="text-[#6b6b6b] text-xs font-mono uppercase tracking-widest">
            {Math.round(progress * 100)}%
          </span>
        </div>
      </div>
    </div>
  )
}
