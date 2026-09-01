"use client"

import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import Container from "@/components/ui/Container"
import SectionTitle from "@/components/ui/SectionTitle"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils/cn"
import { MapPin } from "lucide-react"

const PROGRESSION = ["Feddan", "Sector", "Association", "Center", "Governorate", "Egypt"]
const MAP_IMAGE = "/img/egypt-network-map.png"
const FieldMap = dynamic(() => import("./FieldMap"), { ssr: false })

export default function ScaleBand() {
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")

  useEffect(() => {
    setDir(document.documentElement.dir === "rtl" ? "rtl" : "ltr")
  }, [])

  const arrow = dir === "rtl" ? "←" : "→"

  return (
    <section className="relative overflow-hidden bg-[#07130C]" aria-labelledby="scale-band-heading" dir={dir}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 hidden lg:block">
          <Image
            src={MAP_IMAGE}
            alt=""
            fill
            sizes="100vw"
            priority={false}
            className="object-cover object-right opacity-80"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 70%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 70%, transparent 100%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07130C] via-[#07130C]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07130C] via-[#07130C]/30 to-[#07130C]" />
        </div>

        <div className="absolute inset-x-0 top-0 h-[260px] sm:h-[300px] lg:hidden">
          <Image
            src={MAP_IMAGE}
            alt=""
            fill
            sizes="100vw"
            priority={false}
            className="object-cover object-[65%_35%] opacity-80"
            style={{
              maskImage: "linear-gradient(to bottom, black 42%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 42%, transparent 100%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07130C]/30 via-[#07130C]/55 to-[#07130C]" />
        </div>
      </div>

      <Container className="relative z-10">
        <div className="pt-20 pb-12 md:pt-24 md:pb-16 lg:pt-28 lg:pb-12">
          <SectionTitle
            id="scale-band-heading"
            align="center"
            tone="dark"
            title="From One Feddan to a National Network"
            description="Scale from a single field (feddan) to sector, association, center and governorate-wide programs — a platform designed to operate at national scale."
            maxWidthDescription="max-w-3xl"
          />

          <div className="mt-8 lg:mt-10 lg:max-w-2xl lg:mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-3 text-sm text-[#C9D6CE]">
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

        <div className="pb-16 md:pb-20 lg:pb-28">
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1.15fr]">
            <div className="max-w-xl">
              <SectionTitle
                align="start"
                tone="dark"
                title="See your farm, live."
                description="Simplified dashboard for on-farm visibility, KPIs and map-backed insights."
              />

              <p className="mt-6 max-w-md text-[16px] leading-[1.7] text-[#C8D5CD]">
                Monitor fields, view snapshots and track key performance indicators across your operations — with live
                telemetry and satellite overlays.
              </p>

              <div className="mt-6 flex gap-3">
                <Link href="/smart-farm">
                  <Button variant="primary" size="md">
                    Explore Smart Farm
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative lg:justify-self-end">
              <div className="rounded-[28px] border border-white/10 bg-white/95 p-4 shadow-[0_30px_80px_rgba(7,19,12,0.22)] backdrop-blur-sm">
                <div className="h-[260px] rounded-[20px] bg-gradient-to-br from-[#F3F7F3] to-[#EAF6EA] p-4 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                        <MapPin size={20} className="text-[#1E7A3C]" />
                      </div>
                      <div>
                        <div className="font-heading font-semibold text-[#101913]">Field snapshot</div>
                        <div className="text-sm text-mutedLight">Map + quick KPIs</div>
                      </div>
                    </div>

                    <div className="text-sm text-mutedLight">Live</div>
                  </div>

                  <div className="flex-1 rounded-md bg-white/70 border border-white/10" aria-hidden>
                    <div className="h-full">
                      <FieldMap />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1 rounded-md bg-[#12291C] text-white p-3">
                      <div className="font-sans text-xs">NDVI</div>
                      <div className="font-heading font-bold text-lg">0.73</div>
                    </div>
                    <div className="flex-1 rounded-md bg-[#12291C] text-white p-3">
                      <div className="font-sans text-xs">Soil Moist.</div>
                      <div className="font-heading font-bold text-lg">12%</div>
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