/**
 * Design tokens and spacing conventions (reference only)
 *
 * Spacing system:
 * - section-y-mobile: 56px  -> usage: `py-14`
 * - section-y-desktop: 96-128px -> usage: `md:py-24 lg:py-32`
 * - heading-to-body gap: 16-20px -> usage: `space-y-4` / `space-y-5`
 * - element gap (icons, inline groups): 12px -> usage: `gap-3`
 * - grid/card gap: 24px mobile, 32px desktop -> usage: `gap-6 md:gap-8`
 * - card internal padding: 24px mobile, 32px desktop -> usage: `p-6 md:p-8`
 */

export const SPACING = {
  sectionYMobile: '56px',
  sectionYDesktop: '96-128px',
  headingToBodyGap: '16-20px',
  elementGap: '12px',
  gridCardGapMobile: '24px',
  gridCardGapDesktop: '32px',
  cardPaddingMobile: '24px',
  cardPaddingDesktop: '32px',
} as const
