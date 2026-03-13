'use client'

import { useEffect } from 'react'

interface Props { children: React.ReactNode }

export default function SmoothScroll({ children }: Props) {
  useEffect(() => {
    let lenis: any
    const initLenis = async () => {
      try {
        const Lenis = (await import('lenis')).default
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
        })
        const raf = (time: number) => {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
      } catch (e) {
        // Lenis not available, continue without it
      }
    }
    initLenis()
    return () => { if (lenis) lenis.destroy() }
  }, [])

  return <>{children}</>
}
