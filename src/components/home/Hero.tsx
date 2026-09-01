"use client"

/**
 * Hero.tsx
 *
 * The hero uses a client-provided video as an ambient, full-bleed background
 * (not a bordered/cropped device mockup). A dark scrim + directional gradient
 * ensures text legibility and allows the Navbar (which sits over this hero)
 * to remain readable on first paint.
 */

import React, { ReactNode, useEffect, useRef, useState } from "react"
import { Play, PlayCircle, Volume, VolumeX } from "lucide-react"
import { cn } from "../../lib/utils/cn"
import Container from "../ui/Container"
import Button from "../ui/Button"

export interface CTA {
  label: string
  href: string
}

export interface DataLabel {
  icon: ReactNode
  label: string
}

export interface HeroProps {
  eyebrow?: string
  headline: ReactNode
  description?: string
  primaryCta: CTA
  secondaryCta?: CTA
  videoSrcMp4: string
  videoSrcWebm?: string
  posterSrc: string
  dataLabels?: DataLabel[]
  enableVideoOnMobile?: boolean
}

const DEFAULT_LABELS: DataLabel[] = [
  { icon: <div className="w-3 h-3 rounded-full bg-emerald-400" />, label: "Satellite Data" },
  { icon: <div className="w-3 h-3 rounded-full bg-emerald-400" />, label: "Weather" },
  { icon: <div className="w-3 h-3 rounded-full bg-emerald-400" />, label: "Soil & Water" },
  { icon: <div className="w-3 h-3 rounded-full bg-emerald-400" />, label: "AI Intelligence" },
]

const Hero: React.FC<HeroProps> = ({
  eyebrow,
  headline,
  description,
  primaryCta,
  secondaryCta,
  videoSrcMp4,
  videoSrcWebm,
  posterSrc,
  dataLabels = DEFAULT_LABELS,
  enableVideoOnMobile = false,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")
  const [mounted, setMounted] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isWide, setIsWide] = useState(true)

  useEffect(() => {
    setMounted(true)

    const d = typeof document !== "undefined" ? document.documentElement.dir : "ltr"
    setDir(d === "rtl" ? "rtl" : "ltr")

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(!!mq.matches)
    const mqHandler = (e: MediaQueryListEvent) => setPrefersReducedMotion(!!e.matches)
    mq.addEventListener?.("change", mqHandler)

    const widthMq = window.matchMedia("(min-width: 768px)")
    setIsWide(!!widthMq.matches)
    const widthHandler = (e: MediaQueryListEvent) => setIsWide(!!e.matches)
    widthMq.addEventListener?.("change", widthHandler)

    return () => {
      mq.removeEventListener?.("change", mqHandler)
      widthMq.removeEventListener?.("change", widthHandler)
    }
  }, [])

  useEffect(() => {
    // If user prefers reduced motion, avoid autoplaying the video
    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [prefersReducedMotion])

  // Always attempt to show video/poster; decide based on enableVideoOnMobile on mobile
  // On mobile: show poster or muted video. On desktop: show full video.
  const shouldShowVideoOnThisViewport = enableVideoOnMobile || isWide

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setIsMuted(v.muted)
  }

  const togglePlay = async () => {
    const v = videoRef.current
    if (!v) return
    try {
      if (v.paused) {
        await v.play()
        setIsPlaying(true)
      } else {
        v.pause()
        setIsPlaying(false)
      }
    } catch (e) {
      // play may fail on some mobile autopolicy cases — keep state consistent
      setIsPlaying(!v.paused)
    }
  }

  // Gradient direction and flex direction based on `dir`
  const flexDirectionClass = dir === "rtl" ? "lg:flex-row-reverse" : "lg:flex-row"
  const gradientDirectionClass = dir === "rtl" ? "bg-gradient-to-l" : "bg-gradient-to-r"

  // Positions for floating data labels (percentages). We'll mirror horizontally in RTL.
  const basePositions: React.CSSProperties[] = [
    { top: "12%", left: "6%" },
    { top: "22%", right: "8%" },
    { bottom: "18%", left: "12%" },
    { bottom: "8%", right: "14%" },
  ]

  const getLabelStyle = (index: number): React.CSSProperties => {
    const pos = basePositions[index % basePositions.length]
    // Mirror left/right for RTL by swapping left/right keys
    if (dir === "rtl") {
      const mirrored: React.CSSProperties = {}
      if (pos.left != null) mirrored.right = pos.left
      if (pos.right != null) mirrored.left = pos.right
      if (pos.top != null) mirrored.top = pos.top
      if (pos.bottom != null) mirrored.bottom = pos.bottom
      return mirrored
    }
    return pos
  }

  return (
    <section className="relative overflow-hidden bg-[#0B1F14] min-h-[90vh] md:min-h-screen w-full">
      <div id="hero-top-sentinel" aria-hidden="true" className="absolute left-0 top-0 h-px w-full" />
      <div className="absolute inset-0 z-0 w-full h-full">
        {/* video area sits behind content - always show visual on mobile and desktop */}
        <div className="w-full h-full relative overflow-hidden">
          {shouldShowVideoOnThisViewport && !prefersReducedMotion ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              autoPlay
              muted
              loop
              preload="metadata"
              poster={posterSrc}
            >
              {videoSrcWebm && <source src={videoSrcWebm} type="video/webm" />}
              <source src={videoSrcMp4} type="video/mp4" />
            </video>
          ) : (
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${posterSrc})` }}
              aria-hidden
            />
          )}

          {/* uniform dark overlay so footage reads moody */}
          <div className="absolute inset-0 bg-black/30" />

          {/* directional gradient near the text side to ensure contrast */}
          <div
            className={cn(
              "absolute inset-0 pointer-events-none",
              gradientDirectionClass
            )}
            style={{
              background: `linear-gradient(to ${dir === "rtl" ? "left" : "right"}, #0B1F14 0%, rgba(11,31,20,0.15) 35%, rgba(11,31,20,0.0) 65%)`,
            }}
          />
        </div>
      </div>

      <Container>
        <div className={cn("relative z-10 flex flex-col justify-center py-14 md:py-20 lg:py-24 lg:gap-8", flexDirectionClass)}>
          {/* Text / CTA column */}
          <div className="w-full lg:w-7/12 flex items-center">
            <div className="py-0">
              {eyebrow && (
                <div className="mb-2 md:mb-3 text-[12px] md:text-[13px] font-medium uppercase tracking-[0.18em] text-[#2E9E4F]">
                  {eyebrow}
                </div>
              )}

              <h1 className="font-heading text-[2.125rem] md:text-[2.75rem] lg:text-[3.5rem] font-bold leading-[1.15] md:leading-[1.1] lg:leading-[0.96] tracking-[-0.03em] md:tracking-[-0.04em] text-[#F3F7F3]">
                {headline}
              </h1>

              {description && (
                <p className="mt-4 md:mt-5 max-w-xl text-[16px] leading-[1.6] md:leading-[1.7] text-[#F3F7F3]/85">
                  {description}
                </p>
              )}

              <div className="mt-6 md:mt-8 flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:flex-wrap">
                <Button as="a" href={primaryCta.href} variant="primary" size="lg">
                  {primaryCta.label}
                </Button>

                {/* secondary */}
                {secondaryCta && (
                  <Button as="a" href={secondaryCta.href} variant="secondary" size="lg" leftIcon={<PlayCircle size={18} />}>
                    {secondaryCta.label}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Video / ambient column */}
          <div className="w-full lg:w-5/12 relative mt-6 md:mt-8 lg:mt-0 h-auto md:h-[300px] lg:h-auto" style={{ minHeight: 'clamp(240px, 60vw, 500px)' }}>
            {/* Container for floating labels and controls */}
            <div className="absolute inset-0 z-20 pointer-events-none hidden lg:block">
              {(dataLabels ?? []).slice(0, isWide ? 4 : 2).map((dl, i) => {
                const style = getLabelStyle(i)
                return (
                  <div
                    key={i}
                    className={cn(
                      "absolute backdrop-blur-md bg-[#0B1F14]/60 border border-white/10 text-[#F3F7F3] text-sm rounded-full px-4 py-2 flex items-center gap-2",
                      mounted && !prefersReducedMotion ? "opacity-100 translate-y-0 transition-transform transition-opacity duration-500" : "opacity-0 translate-y-2"
                    )}
                    style={{
                      transitionDelay: `${i * 150}ms`,
                      ...style,
                    }}
                  >
                    <span className="flex h-4 w-4 items-center justify-center text-[#7ED957]">{dl.icon}</span>
                    <span>{dl.label}</span>
                  </div>
                )
              })}
            </div>

            {/* Controls (play/pause + mute) - only show on desktop and tablet where video is visible */}
            {shouldShowVideoOnThisViewport && (
              <div className="absolute z-30 bottom-3 sm:bottom-4 right-3 sm:right-4 flex gap-2">
                <button
                  onClick={togglePlay}
                  aria-pressed={!isPlaying}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  className="pointer-events-auto bg-white/8 hover:bg-white/12 rounded-full p-2 backdrop-blur-sm"
                >
                  {isPlaying ? <Play size={16} /> : <PlayCircle size={16} />}
                </button>

                <button
                  onClick={toggleMute}
                  aria-pressed={isMuted}
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  className="pointer-events-auto bg-white/8 hover:bg-white/12 rounded-full p-2 backdrop-blur-sm"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume size={16} />}
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Hero
