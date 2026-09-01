"use client"

import React, { useEffect, useState } from "react"
import Container from "@/components/ui/Container"
import SectionTitle from "@/components/ui/SectionTitle"
import { cn } from "@/lib/utils/cn"

export default function Partners() {
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")

  useEffect(() => {
    setDir(document.documentElement.dir === "rtl" ? "rtl" : "ltr")
  }, [])

  // Placeholder slots for partner logos
  const slots = new Array(6).fill(null)

  return (
    <section className="border-t border-[#E1E8E2] bg-[#F6F8F5]" aria-labelledby="partners-heading" dir={dir}>
      <Container>
        <div className="py-14 md:py-20 lg:py-28">
          <SectionTitle align="center" tone="light" title="Partners & Ecosystem" description="Placeholder — Client to provide partner / technology logos" />

          <div className="mt-8 md:mt-10 grid grid-cols-2 items-center gap-3 md:gap-4 sm:grid-cols-3 md:grid-cols-6 lg:gap-5">
            {slots.map((_, i) => (
              <div key={i} className="flex h-16 md:h-20 items-center justify-center rounded-[12px] md:rounded-[16px] border border-[#E1E8E2] bg-white p-3 md:p-4">
                <div className="text-[12px] md:text-[14px] font-medium uppercase tracking-[0.08em] text-[#5B6B60]">Logo</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
