import { RefObject, useEffect, useState } from 'react'

export interface UseInViewOptions {
  root?: Element | Document | null
  rootMargin?: string
  threshold?: number | number[]
  once?: boolean
}

export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  options: UseInViewOptions = {},
): boolean {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current

    if (!element) {
      return undefined
    }

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return undefined
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      setInView(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry) {
          return
        }

        const nextValue = entry.isIntersecting

        setInView((currentValue) => {
          if (options.once) {
            return currentValue || nextValue
          }

          return nextValue
        })

        if (options.once && nextValue) {
          observer.unobserve(element)
        }
      },
      {
        root: options.root ?? null,
        rootMargin: options.rootMargin ?? '0px 0px -10% 0px',
        threshold: options.threshold ?? 0.35,
      },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [ref, options.root, options.rootMargin, options.threshold, options.once])

  return inView
}
