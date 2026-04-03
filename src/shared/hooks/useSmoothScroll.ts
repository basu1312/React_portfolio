import { useEffect } from 'react'

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

function smoothScrollTo(targetY: number, duration = 860): void {
  const startY = window.scrollY
  const diff = targetY - startY
  if (Math.abs(diff) < 1) return
  const startTime = performance.now()
  const step = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1)
    window.scrollTo(0, startY + diff * easeInOutCubic(progress))
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

/**
 * Intercepts clicks on anchor tags with hash hrefs and performs a smooth
 * animated scroll to the target element instead of the browser's default jump.
 */
export function useSmoothScroll(): void {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Element
      const anchor = target.closest('a') as HTMLAnchorElement | null
      if (!anchor) return
      const href = anchor.getAttribute('href') ?? ''
      if (!href.startsWith('#')) return
      const id = href.slice(1)
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      smoothScrollTo(el.getBoundingClientRect().top + window.scrollY)
      try {
        history.pushState(null, '', href)
      } catch {
        // history.pushState is unavailable in some embedded contexts; navigation still works
      }
    }

    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])
}
