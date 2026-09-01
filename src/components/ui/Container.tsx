import React from 'react'
import { cn } from '@/lib/utils/cn'

type AsProp<C extends React.ElementType> = {
  as?: C
}

type Props<C extends React.ElementType> = AsProp<C> & {
  children?: React.ReactNode
  className?: string
}

/**
 * Container — responsive centered container with logical horizontal padding.
 * Design Direction: Mobile ~20px, Tablet ~32px, Laptop ~48px, Desktop ~80px
 */
const defaultClasses =
  'max-w-[1280px] mx-auto px-[20px] sm:px-6 md:px-8 lg:px-12 xl:px-20'

export const Container = React.forwardRef(
  <C extends React.ElementType = 'div'>(
    { as, children, className, ...rest }: Props<C>,
    ref: React.ForwardedRef<HTMLElement>,
  ) => {
    const Component = (as || 'div') as React.ElementType
    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore -- allow polymorphic rest props
      <Component ref={ref} className={cn(defaultClasses, className)} {...rest}>
        {children}
      </Component>
    )
  },
)

Container.displayName = 'Container'

export default Container
