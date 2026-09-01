import React from 'react'
import { cn } from '@/lib/utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'

/**
 * Button — design-system button with variants and sizes.
 */

const buttonStyles = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-heading font-semibold tracking-[0.01em] transition-all duration-200 ease-out disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9E4F]/40 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        primary:
          'bg-[#2E9E4F] text-white hover:bg-[#26843F] hover:-translate-y-px focus-visible:ring-[#2E9E4F]/40',
        secondary:
          'border border-[#3A5C46] bg-transparent text-[#F3F7F3] hover:border-[#4CAF50] hover:bg-[#12291C]/40 focus-visible:ring-[#4CAF50]/40',
        outline:
          'border-[1.5px] border-[#101913] bg-transparent text-[#101913] hover:border-[#1E7A3C] hover:text-[#1E7A3C] focus-visible:ring-[#2E9E4F]/40',
      },
      size: {
        sm: 'px-4 md:px-5 py-2 md:py-2.5 text-[14px] md:text-[15px] leading-5',
        md: 'px-5 md:px-7 py-2.5 md:py-3 text-[14px] md:text-[15px] leading-5',
        lg: 'px-5 md:px-7 py-3 md:py-3.5 text-[15px] md:text-[16px] leading-5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'color' | 'type'>,
    VariantProps<typeof buttonStyles> {
  as?: React.ElementType
  asChild?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  tone?: 'brand'
  href?: string
  target?: React.HTMLAttributeAnchorTarget
  rel?: string
}

export const Button = React.forwardRef<HTMLElement, ButtonProps>(
  ({ as: Comp = 'button', asChild = false, leftIcon, rightIcon, className, variant, size, tone, ...props }, ref) => {
    const Component: React.ElementType = asChild ? Slot : Comp

    // Outline tone handling
    const toneClasses = variant === 'outline' && tone === 'brand' ? 'border-primary text-primary hover:bg-[rgba(30,122,60,0.08)] focus-visible:ring-cta' : ''

    return (
      <Component
        ref={ref as React.Ref<HTMLElement>}
        className={cn(buttonStyles({ variant, size }), toneClasses, className)}
        {...props}
      >
        {leftIcon}
        {props.children}
        {rightIcon}
      </Component>
    )
  },
)

Button.displayName = 'Button'

export default Button
