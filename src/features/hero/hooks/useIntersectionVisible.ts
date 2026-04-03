import { useEffect, useRef, useState } from 'react'

interface UseIntersectionVisibleOptions {
  threshold?: number
}

/**
 * Returns a ref to attach to a DOM element and a boolean indicating whether
 * that element has entered the viewport. Once visible, it stays `true`.
 */
export function useIntersectionVisible<T extends Element>(
  options: UseIntersectionVisibleOptions = {}
): { ref: React.RefObject<T>; visible: boolean } {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: options.threshold ?? 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [options.threshold])

  return { ref, visible }
}
