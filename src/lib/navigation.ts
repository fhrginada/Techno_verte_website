export type NavItem = {
  key: string
  label: string
  href: string
}

export const NAV_ITEMS: NavItem[] = [
  { key: 'national-program', label: 'National Program', href: '/national-program' },
  { key: 'corporate-solutions', label: 'Corporate Solutions', href: '/corporate-solutions' },
  { key: 'technology', label: 'Technology', href: '/technology' },
  { key: 'smart-farm', label: 'Smart Farm', href: '/smart-farm' },
  { key: 'about', label: 'About', href: '/about' },
  { key: 'contact', label: 'Contact', href: '/contact' },
]

export const LOCALES = ['en', 'ar'] as const
export type Locale = (typeof LOCALES)[number]

/**
 * Swap the locale segment in a pathname (preserves the rest of the path).
 * If no locale prefix exists, prefix with the target locale.
 */
export function swapLocaleInPath(pathname: string, target: Locale) {
  const parts = pathname.split('/')
  // parts[0] is "" because pathname starts with /
  const segs = parts.slice(1)
  if (segs.length === 0) return `/${target}`

  const first = segs[0]
  if (LOCALES.includes(first as Locale)) {
    segs[0] = target
    return `/${segs.join('/')}`
  }

  return `/${target}/${segs.join('/')}`
}
