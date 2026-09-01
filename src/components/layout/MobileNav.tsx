import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { NAV_ITEMS, swapLocaleInPath, LOCALES, type NavItem, type Locale } from '@/lib/navigation'
import Button from '@/components/ui/Button'
import { X, Menu } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

export interface MobileNavProps {
  dir?: 'ltr' | 'rtl'
  theme?: 'dark' | 'light'
}

export const MobileNav: React.FC<MobileNavProps> = ({ dir = 'ltr', theme = 'dark' }) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const panelRef = useRef<HTMLDivElement | null>(null)
  const hamburgerRef = useRef<HTMLButtonElement | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // simple focus trap
  useEffect(() => {
    if (!open) return
    const el = panelRef.current
    const focusable = el?.querySelectorAll<HTMLElement>('a,button') || []
    focusable[0]?.focus()
    function onTab(e: KeyboardEvent) {
      if (e.key !== 'Tab') return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onTab)
    return () => document.removeEventListener('keydown', onTab)
  }, [open])

  useEffect(() => {
    if (!open) return
    // lock scroll
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
      hamburgerRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = () => setPrefersReducedMotion(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // close when route changes (keeps drawer in sync)
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const currentLocale = (() => {
    const segs = pathname?.split('/')?.filter(Boolean) || []
    return (segs[0] && LOCALES.includes(segs[0] as Locale) ? (segs[0] as Locale) : 'en') as Locale
  })()

  function toggleLocale() {
    const target: Locale = currentLocale === 'en' ? 'ar' : 'en'
    const next = swapLocaleInPath(pathname || '/', target)
    setOpen(false)
    router.push(next)
  }

  const panelSideClass = dir === 'rtl' ? 'left-0 origin-left translate-x-0' : 'right-0 origin-right translate-x-0'
  const isLight = theme === 'light'

  return (
    <div className={cn('ml-auto flex items-center justify-end lg:hidden', dir === 'rtl' ? 'mr-auto justify-start' : 'ml-auto justify-end')}>
      <button
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        ref={hamburgerRef}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#1E3A28] bg-[#12291C]/80 text-[#F3F7F3] shadow-[0_8px_24px_rgba(11,31,20,0.25)] backdrop-blur-md transition-all duration-200 hover:bg-[#1A3426] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9E4F]"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      <div
        className={cn(
          'pointer-events-none fixed inset-0 z-[55] h-screen w-screen overflow-hidden transition-opacity duration-300 ease-out',
          open ? 'pointer-events-auto opacity-100' : 'opacity-0',
          prefersReducedMotion ? 'transition-none' : 'duration-300'
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            'absolute inset-0 h-full w-full backdrop-blur-sm transition-opacity duration-300 ease-out',
            isLight ? 'bg-[#101913]/45' : 'bg-[#0B1F14]/60',
            open ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setOpen(false)}
        />

        <aside
          ref={panelRef}
          role="dialog"
          aria-modal
          className={cn(
            'absolute inset-0 z-[60] flex h-screen w-screen flex-col overflow-hidden bg-[#0B1F14]/95 text-[#F3F7F3] transition-all duration-300 ease-out',
            isLight ? 'bg-[#F3F7F3]/95 text-[#101913]' : 'bg-[#0B1F14]/95 text-[#F3F7F3]',
            open ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0',
            dir === 'rtl' ? 'items-end text-right' : 'items-start text-left',
            prefersReducedMotion ? 'transition-none' : 'duration-300 ease-out'
          )}
        >
          <div
            className={cn(
              'flex w-full items-center justify-between gap-3 border-b border-[#1E3A28] px-5 pb-4 pt-5',
              isLight && 'border-[#D9E3DA]',
              dir === 'rtl' ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            <Link href={`/${currentLocale}`} className="inline-flex items-center gap-3">
              <img src="/img/LOGO_TECHNOVERTE.jpeg" alt="TechnoVerte" className="h-8 w-auto object-contain" />
            </Link>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className={cn(
                'inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1E3A28] bg-white/[0.02] text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9E4F]',
                isLight && 'border-[#D9E3DA] bg-[#12291C]/5'
              )}
            >
              <X size={18} />
            </button>
          </div>

          <nav className="flex w-full flex-1 flex-col items-center justify-center gap-2 px-6 py-10 text-center">
            {NAV_ITEMS.map((item: NavItem) => {
              const active = pathname === item.href || pathname?.startsWith(item.href + '/')
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block w-full max-w-[280px] rounded-2xl border border-transparent px-5 py-4 text-base font-medium transition-all duration-200',
                    active
                      ? 'bg-[#12291C] text-[#7ED957] shadow-[0_10px_30px_rgba(18,41,28,0.18)]'
                      : 'text-current hover:bg-[#12291C]/60 hover:text-[#F3F7F3]',
                    isLight && !active && 'text-[#101913] hover:bg-[#12291C]/5'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className={cn('flex w-full items-center justify-between gap-3 border-t border-[#1E3A28] px-6 py-5', isLight && 'border-[#D9E3DA]')}>
            <span className={cn('text-sm', isLight ? 'text-[#4C5D54]' : 'text-[#9FB3A6]')}>Language</span>
            <button
              onClick={toggleLocale}
              className={cn(
                'inline-flex items-center justify-center rounded-full border border-[#1E3A28] bg-[#12291C]/60 px-4 py-2 text-sm font-medium transition-colors hover:bg-[#12291C]',
                isLight && 'border-[#D9E3DA] bg-[#12291C]/5 text-[#101913] hover:bg-[#12291C]/10'
              )}
            >
              {currentLocale === 'en' ? 'AR' : 'EN'}
            </button>
          </div>

          <div className="w-full px-6 pb-8 pt-2">
            <Button as="a" href="/login" size="lg" variant="primary" className="w-full">
              Platform Login
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default MobileNav
