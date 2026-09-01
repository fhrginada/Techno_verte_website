"use client"

import React from "react"
import Container from "../ui/Container"

const IconCircle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[rgba(255,255,255,0.05)] text-[#EAF4EE] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
    <div className="h-4 w-4 text-[#F2F9F4]">{children}</div>
  </div>
)

const SmallIcon: React.FC<{ type?: string }> = ({ type = "person" }) => {
  // abstract tech/person/building glyphs — simple SVGs for compact rows
  if (type === "building")
    return (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 7h3v3H7zM14 7h3v3h-3zM7 14h3v3H7z" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    )

  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 20c1.5-4 6-6 7-6s5.5 2 7 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export default function HeroUnified() {
  return (
    <section aria-labelledby="hero-unified" className="bg-[#F6F8F5] py-12 md:py-16 lg:py-24">
      <Container>
        <div className="-mx-5 px-5 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12 xl:-mx-20 xl:px-20">
          <div className="relative w-full overflow-hidden rounded-[20px] md:rounded-[24px] border border-white/10 bg-[rgba(11,31,20,0.90)] text-[#F3F7F3] shadow-[0_30px_80px_rgba(11,31,20,0.14)] backdrop-blur-[26px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(124,217,87,0.14),transparent_32%),radial-gradient(circle_at_75%_30%,rgba(30,122,60,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />
            <div className="pointer-events-none absolute -left-10 top-14 h-56 w-56 rounded-full bg-[#4CAF50]/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-10 top-20 h-64 w-64 rounded-full bg-[#7ED957]/8 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.28)_0.5px,transparent_0.5px)] [background-size:10px_10px]" />

            <div className="relative z-10 flex flex-col items-stretch lg:flex-row">
              <div className="w-full p-5 md:p-8 lg:w-[57%] lg:p-12 lg:pr-16 xl:p-16 xl:pr-20">
                <div className="max-w-xl">
                  <div className="mb-2 md:mb-3 text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.2em] text-[#7ED957]">TWO WORLDS, ONE PLATFORM</div>
                  <h2 id="hero-unified" className="mb-4 md:mb-6 font-heading text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem] font-bold leading-[1.08] tracking-[-0.04em] text-[#F3F7F3]">
                    One Platform. Two Worlds.
                  </h2>

                  <div className="mb-6 grid grid-cols-2 gap-3 md:gap-4 lg:gap-5">
                    <div className="lg:pr-4 lg:shadow-[1px_0_0_rgba(255,255,255,0.08)]">
                      <h4 className="text-xs md:text-sm font-semibold text-[#F3F7F3]">Government Solutions</h4>
                      <div className="mt-1 mb-2 text-xs md:text-sm text-[#9FB3A6]">National visibility. Efficiency.</div>
                      <div className="mt-1 flex gap-2 md:gap-3">
                        <IconCircle><SmallIcon type="building" /></IconCircle>
                        <IconCircle><SmallIcon type="person" /></IconCircle>
                        <IconCircle><SmallIcon type="person" /></IconCircle>
                      </div>
                    </div>
                    <div className="lg:pl-4">
                      <h4 className="text-xs md:text-sm font-semibold text-[#F3F7F3]">Enterprise Solutions</h4>
                      <div className="mt-1 mb-2 text-xs md:text-sm text-[#9FB3A6]">Profitability. Scale.</div>
                      <div className="mt-1 flex gap-2 md:gap-3">
                        <IconCircle><SmallIcon /></IconCircle>
                        <IconCircle><SmallIcon /></IconCircle>
                        <IconCircle><SmallIcon type="building" /></IconCircle>
                        <IconCircle><SmallIcon /></IconCircle>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 md:mb-6 grid grid-cols-2 gap-2 md:gap-3">
                    <button className="group flex items-center gap-2 md:gap-3 rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] px-2 md:px-3 py-2 md:py-2.5 text-left text-[#F3F7F3] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-[1px] hover:border-[#A4E7B0]/35 hover:bg-[rgba(255,255,255,0.06)] hover:shadow-[0_0_0_1px_rgba(124,217,87,0.10),0_12px_24px_rgba(31,122,60,0.14)]">
                      <div className="flex h-5 md:h-6 w-5 md:w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#12291C] text-[8px] md:text-[10px] font-semibold text-[#F3F7F3] ring-1 ring-white/10">NP</div>
                      <div className="text-xs md:text-sm text-[#EAF4EE]">National Program</div>
                    </button>
                    <button className="group flex items-center gap-2 md:gap-3 rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] px-2 md:px-3 py-2 md:py-2.5 text-left text-[#F3F7F3] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-[1px] hover:border-[#A4E7B0]/35 hover:bg-[rgba(255,255,255,0.06)] hover:shadow-[0_0_0_1px_rgba(124,217,87,0.10),0_12px_24px_rgba(31,122,60,0.14)]">
                      <div className="flex h-5 md:h-6 w-5 md:w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#12291C] text-[8px] md:text-[10px] font-semibold text-[#F3F7F3] ring-1 ring-white/10">CS</div>
                      <div className="text-xs md:text-sm text-[#EAF4EE]">Corporate Solutions</div>
                    </button>
                    <button className="group flex items-center gap-2 md:gap-3 rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] px-2 md:px-3 py-2 md:py-2.5 text-left text-[#F3F7F3] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-[1px] hover:border-[#A4E7B0]/35 hover:bg-[rgba(255,255,255,0.06)] hover:shadow-[0_0_0_1px_rgba(124,217,87,0.10),0_12px_24px_rgba(31,122,60,0.14)]">
                      <div className="flex h-5 md:h-6 w-5 md:w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#12291C] text-[8px] md:text-[10px] font-semibold text-[#F3F7F3] ring-1 ring-white/10">T</div>
                      <div className="text-xs md:text-sm text-[#EAF4EE]">Technology</div>
                    </button>
                    <button className="group flex items-center gap-2 md:gap-3 rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] px-2 md:px-3 py-2 md:py-2.5 text-left text-[#F3F7F3] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-[1px] hover:border-[#A4E7B0]/35 hover:bg-[rgba(255,255,255,0.06)] hover:shadow-[0_0_0_1px_rgba(124,217,87,0.10),0_12px_24px_rgba(31,122,60,0.14)]">
                      <div className="flex h-5 md:h-6 w-5 md:w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#12291C] text-[8px] md:text-[10px] font-semibold text-[#F3F7F3] ring-1 ring-white/10">SF</div>
                      <div className="text-xs md:text-sm text-[#EAF4EE]">Smart Farm</div>
                    </button>
                  </div>

                  <div className="mt-2">
                    <button className="rounded-full bg-[#2E9E4F] px-5 md:px-7 py-2.5 md:py-3 text-[14px] md:text-[15px] font-semibold text-white shadow-[0_10px_24px_rgba(46,158,79,0.22)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#26843F] hover:shadow-[0_12px_26px_rgba(46,158,79,0.26)]">
                      Explore Solutions
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative flex w-full items-center justify-end p-4 md:p-6 lg:w-[43%] lg:p-8 lg:pr-10 xl:p-12 xl:pr-12">
                <div className="pointer-events-none absolute right-[12%] top-[16%] h-32 md:h-36 w-32 md:w-36 rounded-full bg-[#7ED957]/12 blur-3xl" />
                <div className="pointer-events-none absolute bottom-[10%] left-[12%] h-28 md:h-32 w-28 md:w-32 rounded-full bg-[#1E7A3C]/15 blur-3xl" />
                <div className="relative flex w-full justify-center lg:justify-end">
                  <img
                    src="/img/tablet_transparent.png"
                    alt="Platform mockup"
                    className="w-[280px] md:w-[320px] object-contain drop-shadow-[0_0_30px_rgba(124,217,87,0.18)] transition-transform duration-500 ease-out lg:w-[120%] lg:translate-y-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
