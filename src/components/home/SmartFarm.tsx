"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import Container from "@/components/ui/Container"
import SectionTitle from "@/components/ui/SectionTitle"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils/cn"
import { useInView } from "@/hooks/useInView"
import { MapPin, BarChart2 } from "lucide-react"

const FieldMap = dynamic(() => import('./FieldMap'), { ssr: false })

export default function SmartFarm() {
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")

  useEffect(() => {
    setDir(document.documentElement.dir === "rtl" ? "rtl" : "ltr")
  }, [])

  const ref = React.useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, threshold: 0.3 })

  return (
    <section className="border-t border-[#E1E8E2] bg-[#F6F8F5]" aria-labelledby="smartfarm-teaser" dir={dir}>
      <Container>
        <div className="py-14 md:py-20 lg:py-28">
          <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 items-center">
            <div ref={ref} className={cn(inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0", "transition-all duration-500") }>
              <SectionTitle align="start" tone="light" title="See your farm, live." description="Simplified dashboard for on-farm visibility, KPIs and map-backed insights." />

              <p className="mt-4 md:mt-6 max-w-md text-sm md:text-[16px] leading-[1.6] md:leading-[1.7] text-[#5B6B60]">Monitor fields, view snapshots and track key performance indicators across your operations — with live telemetry and satellite overlays.</p>

              <div className="mt-6 md:mt-8 flex gap-3">
                <Link href="/smart-farm">
                  <Button variant="primary" size="md">Explore Smart Farm</Button>
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-3 md:p-4 shadow-sm">
              <div className="h-[220px] md:h-[260px] rounded-lg bg-gradient-to-br from-[#F3F7F3] to-[#EAF6EA] p-3 md:p-4 flex flex-col gap-3 md:gap-4">
                <div className="flex items-center justify-between gap-2 md:gap-3">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 md:w-10 h-8 md:h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                      <MapPin size={16} className="md:w-5 md:h-5 text-[#1E7A3C]" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-heading font-semibold text-sm md:text-base">Field snapshot</div>
                      <div className="text-xs md:text-sm text-mutedLight">Map + quick KPIs</div>
                    </div>
                  </div>

                  <div className="text-xs md:text-sm text-mutedLight flex-shrink-0">Live</div>
                </div>

                <div className="flex-1 rounded-md bg-white/70 border border-white/10 overflow-hidden" aria-hidden>
                  {/* Interactive map preview — placeholder data until real API/coordinates are provided */}
                  <div className="h-full w-full">
                    <FieldMap />
                  </div>
                </div>

                <div className="flex gap-2 md:gap-3">
                  <div className="flex-1 rounded-md bg-[#12291C] text-white p-2 md:p-3">
                    <div className="font-sans text-[10px] md:text-xs">NDVI</div>
                    <div className="font-heading font-bold text-base md:text-lg">0.73</div>
                  </div>
                  <div className="flex-1 rounded-md bg-[#12291C] text-white p-2 md:p-3">
                    <div className="font-sans text-[10px] md:text-xs">Soil Moist.</div>
                    <div className="font-heading font-bold text-base md:text-lg">12%</div>
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
