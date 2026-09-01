"use client"

import React, { ReactNode, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Landmark, Building2, Cpu, MapPin } from "lucide-react"
import Container from "@/components/ui/Container"
import SectionTitle from "@/components/ui/SectionTitle"
import { cn } from "@/lib/utils/cn"
import { useInView } from "@/hooks/useInView"

export type Solution = {
  icon: ReactNode
  title: string
  description: string
  href: string
}

export interface SolutionsOverviewProps {
  solutions?: Solution[]
}

function SolutionCard({ solution, index }: { solution: Solution; index: number }) {
  const ref = React.useRef<HTMLElement | null>(null)
  const inView = useInView(ref, { once: true, threshold: 0.3 })

  return (
    <Link href={solution.href} className="group" aria-label={solution.title}>
      <article
        ref={ref}
        className={cn(
          "rounded-xl border border-[#E1E8E2] bg-white p-6 lg:p-8 transition-all duration-200",
          inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          "hover:-translate-y-1 hover:border-accent/30",
        )}
      >
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F6F8F5]">
            {solution.icon}
          </div>

          <div className="flex-1">
            <h4 className="font-heading font-semibold text-xl text-textLightBg">{solution.title}</h4>
            <p className="mt-2 text-base text-mutedLight line-clamp-2">{solution.description}</p>

            <div className="mt-4 flex items-center justify-start">
              <span className="font-heading font-semibold text-sm text-primary group-hover:underline">Learn more</span>
              <ArrowRight className="ml-2 h-4 w-4 text-primary transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function Solutions({ solutions }: SolutionsOverviewProps) {
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")

  useEffect(() => {
    setDir(document.documentElement.dir === "rtl" ? "rtl" : "ltr")
  }, [])

  const defaults: Solution[] = [
    { icon: <Landmark size={26} className="text-[#1E7A3C]" />, title: "National Program", description: "Design and operate nationwide agricultural programs at scale.", href: "/national" },
    { icon: <Building2 size={26} className="text-[#1E7A3C]" />, title: "Corporate Solutions", description: "Enterprise software and integrations for commercial agribusiness.", href: "/corporate" },
    { icon: <Cpu size={26} className="text-[#1E7A3C]" />, title: "Technology", description: "AI, analytics and data infrastructure powering decisions.", href: "/technology" },
    { icon: <MapPin size={26} className="text-[#1E7A3C]" />, title: "Smart Farm", description: "On-farm systems that improve yield and sustainability.", href: "/smart-farm" },
  ]

  const items = solutions ?? defaults

  return (
    <section aria-labelledby="solutions-overview" className="border-t border-[#E1E8E2] bg-white">
      <Container>
        <div className="py-14 md:py-24 lg:py-32" dir={dir}>
          <SectionTitle align="center" tone="light" eyebrow="WHAT WE DELIVER" title="What TechnoVerte Delivers" />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {items.map((s, i) => (
              <SolutionCard key={s.title} solution={s} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
