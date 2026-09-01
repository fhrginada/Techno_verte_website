import './globals.css'
import type { ReactNode } from 'react'
import Footer from '@/components/layout/Footer'
import { IBM_Plex_Sans_Arabic, Inter, Manrope } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-ibm-plex-sans-arabic',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const localeScript = `
  (function () {
    try {
      const params = new URLSearchParams(window.location.search || '')
      const pathSegments = window.location.pathname.split('/').filter(Boolean)
      const queryLocale = params.get('lang')
      const pathLocale = pathSegments[0]
      const locale = (queryLocale || (['en', 'ar'].includes(pathLocale) ? pathLocale : 'en')).toLowerCase()
      const isArabic = locale === 'ar'

      document.documentElement.lang = locale
      document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
      document.documentElement.dataset.locale = locale
    } catch (error) {
      document.documentElement.lang = 'en'
      document.documentElement.dir = 'ltr'
    }
  })()
`

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${inter.variable} ${manrope.variable} ${ibmPlexSansArabic.variable}`}
    >
      <body className="bg-offWhite text-textLightBg antialiased">
        <script dangerouslySetInnerHTML={{ __html: localeScript }} />
        {children}
        <Footer />
      </body>
    </html>
  )
}
