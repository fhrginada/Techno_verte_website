"use client"

import React, { ReactNode, useEffect, useRef, useState } from "react"
import { Landmark, Building2, HardHat, Sprout, Briefcase, UserCog, Tractor, Wallet } from "lucide-react"
import Container from "@/components/ui/Container"
import SectionTitle from "@/components/ui/SectionTitle"
import { cn } from "@/lib/utils/cn"
import { useInView } from "@/hooks/useInView"

export type WorldTag = { icon: ReactNode; label: string }

export interface WorldPanelProps {
  title: string
  subtitle?: string
  tags: WorldTag[]
  tone?: "dark" | "contrast"
}

function WorldPanel({ title, subtitle, tags, tone = "dark" }: WorldPanelProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, threshold: 0.25 })

  const isDark = tone === "dark"

  return (
    <article
      ref={ref}
      className={cn(
        "relative min-h-[420px] overflow-hidden rounded-[16px] border transition-all duration-300",
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        isDark ? "border-[#1E3A28] bg-[#0B1F14]" : "border-[#E1E8E2] bg-[#12291C]",
        "hover:-translate-y-1 hover:border-[#2E9E4F]/60",
      )}
      aria-live="polite"
    >
      {/* decorative background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20" aria-hidden>
        <svg className="w-full h-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="g" cx="30%" cy="20%" r="80%">
              <stop offset="0%" stopColor={isDark ? "#1E4333" : "#2C7A4B"} stopOpacity="0.25" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>
      </div>

      <div className={cn("flex h-full flex-col justify-between p-8 lg:p-10", isDark ? "text-[#F3F7F3]" : "text-[#F3F7F3]") }>
        <div>
          <div className="mb-4 inline-flex items-center gap-3 rounded-full bg-white/5 px-3 py-1.5 text-sm">
            <span className="h-2 w-2 rounded-full bg-[#4CAF50]" aria-hidden />
            <span className="text-[13px] font-medium uppercase tracking-[0.1em] text-[#F3F7F3]">{title}</span>
          </div>

          <h3 className={cn("font-heading text-[1.8rem] font-bold leading-[1.1] tracking-[-0.04em]", isDark ? "text-[#F3F7F3]" : "text-[#F3F7F3]")}>{title}</h3>
          {subtitle && <p className="mt-3 text-[16px] leading-[1.7] text-[#DDECE0]">{subtitle}</p>}
        </div>

        <div className="mt-6">
          <div className="flex flex-wrap gap-3">
            {tags.map((t) => (
              <div key={t.label} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-[14px] text-[#F3F7F3]/80">
                <span className="inline-flex items-center text-[#7ED957]">{t.icon}</span>
                <span>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

type TwoWorldsProps = {
  panels?: WorldPanelProps[]
}

export default function TwoWorlds({
  panels,
}: TwoWorldsProps) {
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")

  useEffect(() => {
    setDir(document.documentElement.dir === "rtl" ? "rtl" : "ltr")
  }, [])

  const defaultPanels: WorldPanelProps[] = [
    {
      title: "Government Solutions",
      subtitle: "National visibility. Better policies. Greater impact.",
      tags: [
        { icon: <Landmark size={16} />, label: "Ministries" },
        { icon: <Building2 size={16} />, label: "Agencies" },
        { icon: <HardHat size={16} />, label: "Engineers" },
        { icon: <Sprout size={16} />, label: "Farmers" },
      ],
      tone: "dark",
    },
    {
      title: "Enterprise Solutions",
      subtitle: "Profitability. Efficiency. Sustainability.",
      tags: [
        { icon: <Briefcase size={16} />, label: "Chairman" },
        { icon: <UserCog size={16} />, label: "CEO" },
        { icon: <Tractor size={16} />, label: "Farm Manager" },
        { icon: <Wallet size={16} />, label: "Finance" },
      ],
      tone: "contrast",
    },
  ]

  const activePanels = panels ?? defaultPanels

  return (
    <section aria-labelledby="two-worlds-heading" className="border-t border-[#E1E8E2] bg-[#F6F8F5]">
      <Container>
        <div className="py-14 md:py-24 lg:py-32" dir={dir}>
          <div className="mx-auto max-w-4xl">
            <SectionTitle align="center" tone="light" title="One Platform. Two Worlds." />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {activePanels.map((p, i) => (
              <WorldPanel key={p.title} {...p} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
