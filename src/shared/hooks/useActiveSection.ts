import { useEffect, useState } from 'react'

/**
 * Tracks which section id is currently in the viewport based on scroll position.
 * @param sections Ordered array of section element ids (top to bottom in DOM).
 * @param offsetPx Number of pixels from the top of the viewport to consider a section "active".
 */
export function useActiveSection(sections: string[], offsetPx = 120): string {
  const [activeSection, setActiveSection] = useState(sections[0] ?? '')

  useEffect(() => {
    const handleScroll = () => {
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY + offsetPx >= el.offsetTop) {
          setActiveSection(id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections, offsetPx])

  return activeSection
}
