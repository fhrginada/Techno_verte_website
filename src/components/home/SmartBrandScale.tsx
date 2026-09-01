"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Container from "@/components/ui/Container"
import SectionTitle from "@/components/ui/SectionTitle"
import { cn } from "@/lib/utils/cn"

const PROGRESSION = ["Feddan", "Sector", "Association", "Center", "Governorate", "Egypt"]

// Place the provided image at: /public/images/egypt-network-map.png
const MAP_IMAGE = "/images/egypt-network-map.png"

export default function SmartFarmScaleSection() {
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")

  useEffect(() => {
    setDir(document.documentElement.dir === "rtl" ? "rtl" : "ltr")
  }, [])

  const arrow = dir === "rtl" ? "←" : "→"

  return (
    <section className="relative overflow-hidden bg-[#F6F8F5]" aria-labelledby="scale-heading" dir={dir}>
      {/*
        Shared background for the whole merged section.
        The Egypt map image is invisible behind the Smart Farm teaser (top) and
        gradually appears + the surface darkens as you scroll into the
        Scale / Credibility band (bottom) — one continuous surface, no seam.

        NOTE: the mask percentages below assume the teaser block roughly fills
        the first ~48% of the section height. If your real content pushes that
        taller/shorter, nudge the percentages so the map still "arrives" right
        around the "From One Feddan..." heading.
      */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <Image
          src={MAP_IMAGE}
          alt=""
          fill
          className="object-cover object-right"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, transparent 42%, rgba(0,0,0,0.5) 56%, black 72%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, transparent 42%, rgba(0,0,0,0.5) 56%, black 72%, black 100%)",
          }}
        />
        {/* left-edge blend so the map dissolves into the surface rather than showing a hard photo edge */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F6F8F5] via-transparent to-transparent lg:from-[#F6F8F5] lg:via-[#F6F8F5]/10" />
        {/* the single color transition that carries the whole section from off-white to dark */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #F6F8F5 0%, #F6F8F5 40%, rgba(246,248,245,0.55) 52%, rgba(11,31,20,0.55) 62%, #07130C 80%, #07130C 100%)",
          }}
        />
      </div>

      <Container>
        <div className="relative z-10">
          {/* ===== SMART FARM TEASER — off-white, split ===== */}
          <div className="pt-16 pb-14 md:pt-24 md:pb-16 lg:pt-28 lg:pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-sm font-medium text-[#3F8F63]">Simplified dashboard</span>
              <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-ink">
                See your farm, live.
              </h2>
              <p className="mt-5 text-base text-mutedLight max-w-lg">
                Monitor fields, view snapshots and track key performance indicators across your operations — with
                live telemetry and satellite overlays.
              </p>
              <a
                href="#smart-farm"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white bg-[#1E7A46] hover:bg-[#186238] transition-colors rounded-full px-6 py-3"
              >
                Explore Smart Farm
                <span aria-hidden>{arrow}</span>
              </a>
            </div>

            {/* snapshot graphic: map + KPI cards (illustrative UI, not live data) */}
            <div className="relative rounded-3xl bg-white shadow-[0_24px_70px_-24px_rgba(11,31,20,0.22)] p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF4EE] text-[#1E7A46]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">Field snapshot</p>
                    <p className="text-xs text-mutedLight">Map + quick KPIs</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-[#3F8F63]">Live</span>
              </div>

              {/* map placeholder graphic */}
              <div className="relative mt-4 h-44 rounded-xl overflow-hidden bg-[#E7ECE8]">
                <svg className="absolute inset-0 w-full h-full opacity-40" aria-hidden>
                  <defs>
                    <pattern id="snapshot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#C6D1CA" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#snapshot-grid)" />
                </svg>
                {/* zoom controls */}
                <div className="absolute left-3 top-3 flex flex-col overflow-hidden rounded-md border border-black/10 bg-white text-ink shadow-sm">
                  <span className="flex h-7 w-7 items-center justify-center text-sm border-b border-black/10">+</span>
                  <span className="flex h-7 w-7 items-center justify-center text-sm">−</span>
                </div>
                {/* marker */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="block h-3.5 w-3.5 rounded-full bg-[#2E7D52] ring-4 ring-[#2E7D52]/20" />
                </div>
              </div>

              {/* KPI cards */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#0B1F14] px-4 py-3">
                  <p className="text-xs text-[#9FB8A9]">NDVI</p>
                  <p className="mt-1 text-lg font-semibold text-white">0.73</p>
                </div>
                <div className="rounded-xl bg-[#0B1F14] px-4 py-3">
                  <p className="text-xs text-[#9FB8A9]">Soil Moist.</p>
                  <p className="mt-1 text-lg font-semibold text-white">12%</p>
                </div>
              </div>
            </div>
          </div>

          {/* ===== SCALE / CREDIBILITY BAND — same surface, now dark ===== */}
          <div className="pt-6 pb-20 md:pb-28 lg:pb-36">
            <SectionTitle align="center" tone="dark" title="From One Feddan to a National Network" />

            <div className="mt-8 flex flex-wrap justify-center items-center gap-x-2.5 gap-y-3 text-sm text-[#C9D6CE]">
              {PROGRESSION.map((step, i) => {
                const isLast = i === PROGRESSION.length - 1
                return (
                  <React.Fragment key={step}>
                    <span className="inline-flex items-center gap-2">
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full bg-[#7FCB9E]",
                          isLast && "h-2 w-2 shadow-[0_0_9px_2px_rgba(127,203,158,0.6)]"
                        )}
                        aria-hidden
                      />
                      <span className={cn(isLast && "text-white font-medium")}>{step}</span>
                    </span>
                    {!isLast && (
                      <span className="text-[#4E6357]" aria-hidden>
                        {arrow}
                      </span>
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}