'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Prevent scroll while loading
    document.body.style.overflow = 'hidden'
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 15
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setLoading(false)
            document.body.style.overflow = ''
          }, 600)
          return 100
        }
        return next
      })
    }, 120)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050811]"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 cyber-grid-bg opacity-30" />
          
          {/* Scan line */}
          <div className="scan-line" />

          {/* Logo / Name */}
          <motion.div
            className="relative mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Glowing hex decoration */}
            <div className="absolute -inset-8 rounded-full bg-cyan-500/5 blur-3xl" />
            
            <div className="relative">
              {/* Rotating ring */}
              <motion.div
                className="absolute -inset-6 rounded-full border border-cyan-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute -inset-10 rounded-full border border-purple-500/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />

              <span className="loader-text text-xs text-cyan-400/60 tracking-[0.5em] block mb-3">
                INITIALIZING
              </span>
              
              <h1 className="text-4xl font-bold gradient-text tracking-wider">
                NVH
              </h1>
              
              <span className="loader-text text-xs text-slate-500 tracking-[0.3em] block mt-3">
                PORTFOLIO SYSTEM
              </span>
            </div>
          </motion.div>

          {/* Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-cyan-400/30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Progress section */}
          <motion.div
            className="w-64 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Progress bar track */}
            <div className="h-px bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Percentage */}
            <div className="flex items-center justify-between">
              <span className="loader-text text-xs text-slate-600">
                Loading assets...
              </span>
              <span className="loader-text text-xs text-cyan-400 tabular-nums">
                {Math.floor(progress)}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
