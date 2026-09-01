"use client"
import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils/cn'
import { NAV_ITEMS, swapLocaleInPath, LOCALES, type Locale } from '@/lib/navigation'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import MobileNav from './MobileNav'
import { ArrowRight } from 'lucide-react'

export interface NavbarProps {
  theme?: 'dark' | 'light'
}

export const Navbar: React.FC<NavbarProps> = ({ theme = 'dark' }) => {
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const currentLocale = useMemo(() => {
    const segs = pathname?.split('/')?.filter(Boolean) || []
    return (segs[0] && LOCALES.includes(segs[0] as Locale) ? (segs[0] as Locale) : 'en') as Locale
  }, [pathname])

  const isRTL = currentLocale === 'ar'

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = () => setPrefersReducedMotion(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const sentinel = document.querySelector('#hero-top-sentinel')
    if (sentinel) {
      const io = new IntersectionObserver((entries) => {
        const e = entries[0]
        setScrolled(!e.isIntersecting)
      })
      io.observe(sentinel)
      return () => io.disconnect()
    }

    function onScroll() {
      setScrolled(window.scrollY > 40)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function toggleLocale() {
    const target: Locale = currentLocale === 'en' ? 'ar' : 'en'
    const next = swapLocaleInPath(pathname || '/', target)
    router.push(next)
  }

  const isLight = theme === 'light'

  const navSurface = scrolled
    ? isLight
      ? 'border-b border-[#E1E8E2] bg-white/80 shadow-[0_4px_20px_rgba(11,31,20,0.08)] backdrop-blur-xl backdrop-saturate-150'
      : 'border-b border-white/10 bg-[#12291C]/90 shadow-[0_4px_20px_rgba(11,31,20,0.12)] backdrop-blur-xl backdrop-saturate-150'
    : 'bg-transparent border-none backdrop-blur-0'

  const linkTextClass = isLight ? 'text-[#101913]' : 'text-[#F3F7F3]'

  return (
    <header
      dir={isRTL ? 'rtl' : 'ltr'}
      className="fixed inset-x-0 top-0 z-50 pointer-events-none"
    >
      <div className="px-[20px] pt-3 md:px-4 md:pt-4 lg:px-6 lg:pt-6">
        <div className="mx-auto w-full max-w-[1280px] pointer-events-auto">
          <div
            className={cn(
              'relative flex items-center rounded-full transition-all duration-300 ease-out',
              // heights: mobile h-16, desktop md:h-20 -> shrink to md:h-16 when scrolled
              scrolled ? 'h-16 md:h-16' : 'h-16 md:h-20',
              navSurface,
              prefersReducedMotion && 'transition-none',
            )}
          >
            <Container className="!max-w-none !px-0">
              <div className={cn('flex w-full items-center justify-between gap-3 sm:gap-6', isRTL && 'flex-row-reverse')}>
                {/* Group 1: Logo only */}
                <div className={cn('flex min-w-0 flex-1 items-center', isRTL && 'flex-row-reverse')}>
                  <Link href={`/${currentLocale}`} className="inline-flex items-center gap-3 min-w-0">
                    <img src="/img/LOGO_TECHNOVERTE.jpeg" alt="TechnoVerte" className="h-8 w-auto max-w-[140px] object-contain md:h-9" />
                  </Link>
                </div>

                {/* Group 2: Clustered nav links, divider, language switcher, CTA (and MobileNav) */}
                <div className={cn('flex shrink-0 items-center gap-3 sm:gap-8 lg:gap-10', isRTL && 'flex-row-reverse')}>
                  <nav className="hidden items-center gap-8 lg:flex">
                    {NAV_ITEMS.map((item) => {
                      const active = pathname === item.href || pathname?.startsWith(item.href + '/')
                      return (
                        <Link
                          key={item.key}
                          href={item.href}
                          className={cn(
                            'group relative text-[15px] font-medium tracking-[0.01em] transition-colors duration-200',
                            linkTextClass,
                            active ? 'text-[#2E9E4F]' : 'opacity-90 hover:opacity-100',
                          )}
                        >
                          <span className="relative z-10">{item.label}</span>
                          <span
                            aria-hidden
                            className={cn(
                              'absolute left-1/2 -bottom-1 h-[2px] w-full -translate-x-1/2 origin-center rounded-full bg-[#2E9E4F] transition-transform duration-300',
                              active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                            )}
                          />
                        </Link>
                      )
                    })}
                  </nav>

                  <div className="hidden lg:block h-5 w-px bg-white/15" aria-hidden="true" />

                  <div className="hidden lg:inline-flex">
                    <button
                      onClick={toggleLocale}
                      className={cn(
                        'inline-flex items-center justify-center rounded-full px-3 py-2 text-[15px] font-medium tracking-[0.03em] transition-colors duration-200',
                        scrolled
                          ? isLight
                            ? 'border border-[#E1E8E2] bg-white/[0.02] text-[#101913] hover:bg-white/[0.04]'
                            : 'border border-white/10 bg-white/[0.02] text-[#F3F7F3] hover:bg-white/[0.05]'
                          : isLight
                          ? 'border border-transparent bg-transparent text-[#101913] hover:bg-white/[0.02]'
                          : 'border border-transparent bg-transparent text-[#F3F7F3] hover:bg-white/[0.02]'
                      )}
                    >
                      {currentLocale === 'en' ? 'AR' : 'EN'}
                    </button>
                  </div>

                  <div className="hidden lg:inline-flex">
                    <Button
                      as="a"
                      href="/login"
                      size="sm"
                      variant="primary"
                    >
                      Platform Login
                    </Button>
                  </div>

                  <MobileNav dir={isRTL ? 'rtl' : 'ltr'} theme={theme} />
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar

