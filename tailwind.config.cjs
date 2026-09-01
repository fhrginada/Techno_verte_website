module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1E7A3C',
        accent: '#4CAF50',
        accentBright: '#7ED957',
        darkBase: '#0B1F14',
        darkSurface: '#12291C',
        offWhite: '#F6F8F5',
        textDarkBg: '#F3F7F3',
        textLightBg: '#101913',
        mutedLight: '#5B6B60',
        mutedDark: '#9FB3A6',
        borderLight: '#E1E8E2',
        borderDark: '#1E3A28',
        cta: '#2E9E4F',
        ctaHover: '#26843F',
      },
      spacing: {
        // Section vertical spacing tokens
        'section-y-mobile': '3.5rem', // 56px
        'section-y-desktop': '6rem', // 96px (use md:py-24 / lg:py-32 for up to 128px)
        // Element gaps
        'gap-inline-sm': '0.75rem', // 12px -> gap-3
        // Grid/card gaps
        'gap-card-mobile': '1.5rem', // 24px -> gap-6
        'gap-card-desktop': '2rem', // 32px -> md:gap-8
        // Card internal padding
        'card-padding-mobile': '1.5rem', // 24px -> p-6
        'card-padding-desktop': '2rem', // 32px -> md:p-8
      },
      borderRadius: {
        xl: '1rem', // 16px rounded-xl
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-ibm-plex-sans-arabic)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // H1/H2/H3 sizes are applied inline where needed using exact classes
      }
    }
  },
  plugins: [],
}
