import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface SectionTitleProps {
  eyebrow?: string
  title: string | React.ReactNode
  description?: string
  align?: 'start' | 'center'
  tone?: 'light' | 'dark'
  maxWidthDescription?: string
  className?: string
  id?: string
  titleId?: string
}

/**
 * SectionTitle — accessible section heading with optional eyebrow and description.
 */
export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'start',
  tone = 'light',
  maxWidthDescription = 'max-w-2xl',
  className,
  id,
  titleId,
}: SectionTitleProps) {
  const isCenter = align === 'center'
  const titleColor = tone === 'light' ? 'text-textLightBg' : 'text-textDarkBg'
  const descColor = tone === 'light' ? 'text-mutedLight' : 'text-mutedDark'

  return (
    <div className={cn('space-y-3 md:space-y-4', isCenter ? 'text-center' : 'text-start', className)}>
      {eyebrow && (
        <div className={cn('flex items-center gap-2', isCenter ? 'justify-center' : 'justify-start')}>
          <span className="h-2 w-2 rounded-full bg-[#4CAF50]" aria-hidden />
          <p className="font-medium text-[12px] md:text-[13px] uppercase tracking-[0.18em] text-[#1E7A3C]">{eyebrow}</p>
        </div>
      )}

      <h2
        id={id ?? titleId}
        className={cn(
          'font-heading font-bold leading-[1.08] tracking-[-0.04em] text-[1.875rem] sm:text-[2.25rem] md:text-[2.5rem] lg:text-[2.75rem]',
          titleColor,
        )}
      >
        {title}
      </h2>

      {description && (
        <p className={cn('text-[15px] md:text-[16px] lg:text-[17px] leading-[1.6] md:leading-[1.7]', descColor, isCenter ? 'mx-auto' : '', maxWidthDescription)}>
          {description}
        </p>
      )}
    </div>
  )
}
