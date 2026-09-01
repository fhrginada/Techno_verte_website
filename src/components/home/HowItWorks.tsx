"use client"

import React, { ReactNode, useEffect, useState } from "react"
import { Satellite, Droplets, Cpu, CheckCircle2, ChevronRight } from "lucide-react"
import Container from "@/components/ui/Container"
import SectionTitle from "@/components/ui/SectionTitle"
import { cn } from "@/lib/utils/cn"
import { useInView } from "@/hooks/useInView"

export type HowStep = { icon: ReactNode; label: string; description?: string }

export interface HowItWorksProps {
  steps?: HowStep[]
}

function Node({ step, index }: { step: HowStep; index: number }) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, threshold: 0.4 })

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className={cn(
        "w-20 h-20 rounded-full flex items-center justify-center border border-[#1F2B26]",
        inView ? "scale-100 opacity-100 ring-2 ring-accent/30" : "scale-95 opacity-60",
      )}>
        {step.icon}
      </div>

      <div className="mt-3">
        <div className="font-sans font-medium text-sm text-[#F3F7F3]">{step.label}</div>
        {step.description && <div className="text-mutedDark text-sm">{step.description}</div>}
      </div>
    </div>
  )
}

export default function HowItWorks({ steps }: HowItWorksProps) {
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")

  useEffect(() => {
    setDir(document.documentElement.dir === "rtl" ? "rtl" : "ltr")
  }, [])

  const defaults: HowStep[] = [
    { icon: <Satellite size={28} className="text-accentBright" />, label: "Satellite", description: "Live field imagery" },
    { icon: <Droplets size={28} className="text-accentBright" />, label: "Soil & Water", description: "Telemetry and sensors" },
    { icon: <Cpu size={28} className="text-accentBright" />, label: "AI Analysis", description: "Model-driven insights" },
    { icon: <CheckCircle2 size={28} className="text-accentBright" />, label: "Decision", description: "Actionable recommendations" },
  ]

  const active = steps ?? defaults

  return (
    <section aria-labelledby="how-heading" className="bg-[#0B1F14]">
      <Container>
        <div className="py-14 md:py-24 lg:py-32" dir={dir}>
          <SectionTitle align="center" tone="dark" eyebrow="THE PIPELINE" title="Data In. Decisions Out." />

          <div className="mt-10">
            <div className="hidden lg:flex items-center justify-between">
              {active.map((s, i) => (
                <div key={s.label} className="flex-1 flex items-center">
                  <div className="w-full flex flex-col items-center">
                    <Node step={s} index={i} />
                  </div>

                  {i < active.length - 1 && (
                    <div className="mx-4 flex-0 w-24">
                      <div className="relative w-full">
                        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-[#1F2B26]" />
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                          <ChevronRight className={cn("h-4 w-4 text-mutedDark", dir === "rtl" ? "rotate-180" : "") } />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-8 lg:hidden">
              {active.map((s) => (
                <div key={s.label} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center border border-[#1F2B26] bg-[#12291C]">
                      {s.icon}
                    </div>
                  </div>
                  <div>
                    <div className="font-sans font-medium text-sm text-[#F3F7F3]">{s.label}</div>
                    {s.description && <div className="text-mutedDark text-sm">{s.description}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
