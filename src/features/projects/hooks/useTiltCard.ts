import { useCallback, useRef } from 'react'

interface UseTiltCardReturn {
  cardRef: React.RefObject<HTMLDivElement>
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void
  handleMouseLeave: () => void
}

/**
 * Provides a ref and mouse event handlers that apply a 3-D perspective tilt
 * effect to the referenced card element while the pointer is over it.
 */
export function useTiltCard(): UseTiltCardReturn {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const { left, top, width, height } = card.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5
    card.style.transform = `perspective(900px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) scale(1.045) translateZ(20px)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = ''
  }, [])

  return { cardRef, handleMouseMove, handleMouseLeave }
}
