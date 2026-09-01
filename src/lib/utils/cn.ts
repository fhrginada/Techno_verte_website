import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge className values safely (clsx + tailwind-merge)
 */
export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(...inputs))
}
