'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }

    const animateRing = () => {
      ringX += (mouseX - ringX - 18) * 0.12
      ringY += (mouseY - ringY - 18) * 0.12
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      requestAnimationFrame(animateRing)
    }

    const handleHover = () => ring.classList.add('hovering')
    const handleUnhover = () => ring.classList.remove('hovering')

    document.addEventListener('mousemove', moveCursor)
    animateRing()

    const interactables = document.querySelectorAll('a, button, [data-cursor-hover]')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleHover)
      el.addEventListener('mouseleave', handleUnhover)
    })

    // Re-add listeners on DOM changes
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
        el.addEventListener('mouseenter', handleHover)
        el.addEventListener('mouseleave', handleUnhover)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
