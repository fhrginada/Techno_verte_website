"use client"

import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'
import Container from '../ui/Container'
import Button from '../ui/Button'
import { cn } from '@/lib/utils/cn'
import EgyptNetworkMap from './EgyptNetworkMap'

type Step = {
  icon?: React.ReactNode
  title: string
  description: string
  image?: string
  badge?: string
  metric?: string
  metricLabel?: string
}

export interface IntroProps {
  eyebrow?: string
  heading?: React.ReactNode
  headingDescription?: string
  steps?: Step[]
}

const defaultCardImage = '/img/lucid-origin_Create_a_premium_realistic_3D_computer_workstation_visual_for_a_modern_AgriTech_-0.jpg'
const glassSurfaceClass =
  'isolate relative overflow-hidden rounded-[14px] border border-white/[0.12] bg-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl backdrop-saturate-150'

export default function Intro({
  eyebrow = 'WHAT WE DO',
  heading = <>Agricultural intelligence that connects data to decisions</>,
  headingDescription = 'TechnoVerte combines satellite, sensor and operational data with scalable software to inform better agricultural decisions.',
  steps = [
    {
      title: 'Agricultural Data',
      description: 'Satellite, weather and field telemetry consolidated for precise observation.',
      badge: '01',
      metric: '2.4M',
      metricLabel: 'field signals tracked',
      image: defaultCardImage,
    },
    {
      title: 'Intelligence & Analysis',
      description: 'AI-driven models transform raw signals into actionable insights.',
      badge: '02',
      metric: '94%',
      metricLabel: 'decision confidence',
      image: defaultCardImage,
    },
    {
      title: 'Connected Systems',
      description: 'Integrations and APIs that connect sensors, platforms and workflows.',
      badge: '03',
      metric: '7.1x',
      metricLabel: 'faster response loops',
      image: defaultCardImage,
    },
    {
      title: 'Scalable Solutions',
      description: 'Cloud-native systems designed for large-scale, repeatable deployment.',
      badge: '04',
      metric: '100%',
      metricLabel: 'operational visibility',
      image: defaultCardImage,
    },
  ],
}: IntroProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [isRTL, setIsRTL] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (typeof document !== 'undefined') setIsRTL(document.documentElement.dir === 'rtl')
  }, [])

  const currentStep = steps[Math.min(activeStep, steps.length - 1)] ?? steps[0]
  const [stepSpacing, setStepSpacing] = useState<number>(60)

  useEffect(() => {
    function updateSpacing() {
      if (typeof window === 'undefined') return
      const width = window.innerWidth
      const spacing = width >= 1024 ? 60 : 45
      setStepSpacing(spacing)
    }

    updateSpacing()
    window.addEventListener('resize', updateSpacing)
    return () => window.removeEventListener('resize', updateSpacing)
  }, [])

  if (prefersReduced) {
    return (

    <section aria-labelledby="intro-heading" className="relative bg-white">
        <Container>
          <div className={cn('py-14 md:py-20 lg:py-28', isRTL && 'lg:direction-rtl')}>
            <div className={cn('flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] lg:gap-10', isRTL ? 'lg:[direction:rtl]' : '')}>
              <div className="lg:pr-8">
                {eyebrow && <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-[#1E7A3C]">{eyebrow}</p>}
                <h2 id="intro-heading" className="mt-3 font-heading text-[2.1rem] font-bold leading-[1.08] tracking-[-0.04em] text-[#101913] md:text-[2.6rem] lg:text-[3.1rem]">{heading}</h2>
                {headingDescription && <p className="mt-4 max-w-xl text-[16px] leading-[1.7] text-[#5B6B60] md:text-[17px]">{headingDescription}</p>}
              </div>

              <div className="space-y-4">
                {steps.map((s, i) => (
                  <article key={i} className="intro-visual relative isolate overflow-hidden rounded-[16px] border border-[#7ED957]/10">
                    <div className="iv-bg-layer" />
                    <div
                      className="iv-image-layer absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${s.image ?? defaultCardImage})` }}
                    />
                    <div
                      className="iv-glass-overlay absolute inset-0 rounded-[12px] pointer-events-none"
                      style={{
                        boxShadow: '0 30px 80px rgba(34,84,52,0.12), inset 0 0 60px rgba(34,84,52,0.06)',
                        background: 'linear-gradient(180deg, rgba(46,127,66,0.04), rgba(46,127,66,0.02))'
                      }}
                      aria-hidden="true"
                    />
                    <div className="iv-grid" />
                    <div className="iv-particles">
                      {particleDots.slice(0, 5).map((p, pi) => (
                        <span key={pi} style={{ top: p.top, left: p.left, width: p.size, height: p.size }} />
                      ))}
                    </div>
                    <div className="iv-vignette" />

                    <div className="iv-foreground flex min-h-[260px] flex-col justify-between p-5 sm:p-6 lg:p-8">
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full border border-white/10 bg-[#0B1F14]/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#D9F5DE]">
                          {s.badge ?? String(i + 1).padStart(2, '0')}
                        </span>
                        {s.metric && (
                          <span className="text-lg font-semibold text-[#D9F5DE]">{s.metric}</span>
                        )}
                      </div>

                      <div className={cn('max-w-[72%] p-4 sm:p-5', glassSurfaceClass)}>
                        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent" />
                        <div className="relative z-10">
                          <h3 className="font-heading text-2xl font-bold text-[#F4FBF6]">{s.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-[#D9F5DE]">{s.description}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    )
  }

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (value: number) => {
    if (!steps || steps.length === 0) return
    const nextIndex = Math.min(Math.max(Math.floor(value * steps.length), 0), steps.length - 1)
    setActiveStep(nextIndex)
  })

  const totalHeight = Math.max(100 + (Math.max(steps.length - 1, 0) * stepSpacing), 100)

  const particleDots = [
    { top: '12%', left: '18%', size: 8 },
    { top: '28%', left: '72%', size: 6 },
    { top: '46%', left: '40%', size: 10 },
    { top: '62%', left: '22%', size: 7 },
    { top: '78%', left: '68%', size: 5 },
    { top: '20%', left: '50%', size: 6 },
    { top: '56%', left: '82%', size: 6 },
  ]

  return (
    <section aria-labelledby="intro-heading" className="relative bg-white">

      <Container className="relative">
        <div className="py-14 md:py-20 lg:py-28">
          <div className={cn('flex flex-col gap-6 md:gap-8 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] lg:gap-10', isRTL ? 'lg:[direction:rtl]' : '')}>
            <div className="lg:pr-8">
              <div className="lg:sticky lg:top-24">
                {eyebrow && <p className="text-[12px] md:text-[13px] font-medium uppercase tracking-[0.18em] text-[#1E7A3C]">{eyebrow}</p>}
                <h2 id="intro-heading" className="mt-2 md:mt-3 max-w-lg font-heading text-[1.875rem] md:text-[2.25rem] lg:text-[2.75rem] font-bold leading-[1.08] tracking-[-0.04em] text-[#101913]">{heading}</h2>
                {headingDescription && <p className="mt-3 md:mt-4 max-w-xl text-[15px] md:text-[16px] lg:text-[17px] leading-[1.6] md:leading-[1.7] text-[#5B6B60]">{headingDescription}</p>}

              </div>
            </div>

            <div ref={wrapperRef} className="relative" style={{ height: `${totalHeight}vh` }}>
              <div className="sticky top-0 flex h-screen items-center">
                  <div className="w-full">
                  <div className="relative overflow-hidden rounded-[16px] border border-[#7ED957]/10 bg-[#0B1F14] shadow-[0_18px_50px_rgba(0,0,0,0.32)]">
                    <AnimatePresence initial={false}>
                      <motion.article
                        key={currentStep.title}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12, position: 'absolute' }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="intro-visual relative isolate min-h-[420px] overflow-hidden rounded-[16px] lg:min-h-[500px]"
                      >
                        <div className="iv-bg-layer" aria-hidden="true" />
                        <div
                          className="iv-image-layer absolute inset-0 bg-cover bg-center bg-no-repeat"
                          style={{ backgroundImage: `url(${currentStep.image ?? defaultCardImage})` }}
                          aria-hidden="true"
                        />
                        <div
                          className="pointer-events-none absolute inset-0 rounded-[16px] bg-[radial-gradient(circle_at_center,rgba(11,31,20,0.7)_0%,rgba(11,31,20,0.38)_32%,rgba(11,31,20,0)_72%)] blur-[80px] opacity-80"
                          aria-hidden="true"
                        />
                        <div
                          className="iv-glass-overlay absolute inset-0 rounded-[14px] pointer-events-none"
                          style={{
                            boxShadow: '0 30px 80px rgba(34,84,52,0.14), inset 0 0 72px rgba(34,84,52,0.07)',
                            background: 'linear-gradient(180deg, rgba(46,127,66,0.05), rgba(46,127,66,0.02))'
                          }}
                          aria-hidden="true"
                        />
                        <div className="iv-grid" aria-hidden="true" />
                        <div className="iv-particles" aria-hidden="true">
                          {particleDots.map((p, i) => (
                            <span key={i} style={{ top: p.top, left: p.left, width: p.size, height: p.size }} />
                          ))}
                        </div>
                        <div className="iv-vignette" aria-hidden="true" />

                        {/* Egypt network map overlay (decorative/illustrative). */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-full max-w-xl p-6 pointer-events-auto">
                            <EgyptNetworkMap className="w-full h-56 lg:h-72" />
                          </div>
                        </div>

                        <div className="iv-foreground relative flex min-h-[420px] flex-col justify-between p-4 sm:p-6 lg:min-h-[500px] lg:p-7">
                          <div className="flex items-center justify-between gap-4">
                            <span className="rounded-full border border-[#D9F5DE]/12 bg-[#0B1F14]/50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#EAF7EE]">
                              {currentStep.badge ?? String(activeStep + 1).padStart(2, '0')}
                            </span>
                            <div className="rounded-full border border-[#D9F5DE]/12 bg-[#0B1F14]/45 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[#D9F5DE] backdrop-blur-[2px]">
                              tech overview
                            </div>
                          </div>

                          <div className={cn('max-w-[62%] self-start p-4 sm:p-5 lg:p-6', glassSurfaceClass)}>
                            <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent" />
                            <div className="relative z-10">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#A6D4B4]">
                                    {currentStep.metricLabel ?? 'field intelligence'}
                                  </p>
                                  <h3 className="mt-3 font-heading text-2xl font-bold leading-tight text-[#F4FBF6] lg:text-[2rem]">
                                    {currentStep.title}
                                  </h3>
                                </div>
                                {currentStep.metric && (
                                  <div className="rounded-[10px] border border-[#D9F5DE]/12 bg-[#12291C]/70 px-2.5 py-2 text-right text-lg font-semibold text-[#EAF7EE]">
                                    {currentStep.metric}
                                  </div>
                                )}
                              </div>

                              <p className="mt-3 max-w-md text-sm leading-relaxed text-[#D9F5DE] lg:text-[0.96rem]">
                                {currentStep.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    </AnimatePresence>
                  </div>

                  <div className="mt-5 flex justify-center">
                    <div className="flex items-center gap-2">
                      {steps.map((_, index) => (
                        <motion.span
                          key={index}
                          layout
                          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                          className={cn(
                            'block h-1 rounded-full transition-all duration-300',
                            index === activeStep ? 'w-8 bg-[#7ED957]' : 'w-4 bg-[#3B5A4B]'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
