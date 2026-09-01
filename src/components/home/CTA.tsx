"use client"

import React, { useEffect, useState } from "react"
import Container from "@/components/ui/Container"
import SectionTitle from "@/components/ui/SectionTitle"
import { Button } from "@/components/ui/Button"
import Link from "next/link"

export default function CTA() {
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")

  useEffect(() => {
    setDir(document.documentElement.dir === "rtl" ? "rtl" : "ltr")
  }, [])

  return (
    <section className="bg-[#0B1F14]" aria-labelledby="cta-band" dir={dir}>
      <Container>
        <div className="py-14 md:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle align="center" tone="dark" title="Ready to see TechnoVerte in action?" />

            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <Link href="/request-demo">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">Explore the Platform</Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
