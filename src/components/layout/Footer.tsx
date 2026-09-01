"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import { Globe } from 'lucide-react'

export default function Footer() {
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr')

  useEffect(() => {
    setDir(document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr')
  }, [])

  return (
    <footer className="border-t border-[#07160f] bg-[#0B1F14] text-[#F3F7F3]" dir={dir}>
      <Container>
        <div className="py-12 md:py-16 lg:py-20">
          <div className="flex flex-col gap-6 md:gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-sm">
              <div className="font-heading text-[1.5rem] md:text-[1.75rem] font-bold leading-none tracking-[-0.04em]">TechnoVerte</div>
              <div className="mt-2 text-[13px] md:text-[14px] leading-[1.6] md:leading-[1.7] text-[#9FB3A6]">Satellite intelligence for sustainable agriculture.</div>
            </div>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
              <div>
                <h4 className="text-[14px] md:text-[15px] font-semibold text-[#F3F7F3]">Pages</h4>
                <ul className="mt-3 space-y-2 text-[13px] md:text-[14px] text-[#9FB3A6]">
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/platform">Platform</Link></li>
                  <li><Link href="/solutions">Solutions</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-[14px] md:text-[15px] font-semibold text-[#F3F7F3]">Company</h4>
                <ul className="mt-3 space-y-2 text-[13px] md:text-[14px] text-[#9FB3A6]">
                  <li><Link href="/about">About</Link></li>
                  <li><Link href="/careers">Careers</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-[14px] md:text-[15px] font-semibold text-[#F3F7F3]">Contact</h4>
                <ul className="mt-3 space-y-2 text-[13px] md:text-[14px] text-[#9FB3A6]">
                  <li>Phone: +20 000 000 000</li>
                  <li>Email: info@technoverte.example</li>
                </ul>
              </div>

              <div>
                <h4 className="text-[14px] md:text-[15px] font-semibold text-[#F3F7F3]">Language</h4>
                <div className="mt-3 flex items-center gap-3 text-[13px] md:text-[14px] text-[#9FB3A6]">
                  <Link href="/?lang=en">EN</Link>
                  <Link href="/?lang=ar">AR</Link>
                </div>

                <div className="mt-4 flex items-center gap-3 text-[#F3F7F3]">
                  <a href="#" aria-label="website"><Globe size={18} /></a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-[#1E3A28] pt-6 text-[13px] md:text-[14px] text-[#9FB3A6]">Address placeholder — Cairo, Egypt</div>
        </div>
      </Container>
    </footer>
  )
}
