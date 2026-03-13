'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import dynamic from 'next/dynamic'
import { ChevronDown, Github, Linkedin, Mail, Download, ExternalLink } from 'lucide-react'

const GalaxyBackground = dynamic(() => import('@/components/animations/GalaxyBackground'), { ssr: false })

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.5 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } },
}

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => setMounted(true), 1200)
  }, [])

  const scrollToNext = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Galaxy background */}
      <GalaxyBackground />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,245,255,0.06) 0%, transparent 70%)' }}
      />
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(168,85,247,0.04) 0%, transparent 70%)' }}
      />

      {/* Grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-20 pointer-events-none" />

      {/* Scan line */}
      <div className="scan-line opacity-30" />

      {/* Main content */}
      <div className="section-container relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={mounted ? 'visible' : 'hidden'}
          className="space-y-6"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20 text-xs font-mono text-cyan-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              Available for opportunities
            </div>
          </motion.div>

          {/* Name */}
          <motion.div variants={itemVariants}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none">
              <span className="block text-white/90 mb-2">Nguyen</span>
              <span className="block gradient-text relative">
                Van Hieu
                {/* Glow effect behind text */}
                <span className="absolute inset-0 gradient-text blur-3xl opacity-30 scale-110">Van Hieu</span>
              </span>
            </h1>
          </motion.div>

          {/* Role typing animation */}
          <motion.div variants={itemVariants} className="h-8">
            <p className="text-lg md:text-xl font-mono text-slate-400">
              <span className="text-cyan-500">{'>'} </span>
              <TypeAnimation
                sequence={[
                  'Technology Explorer', 2000,
                  'Information Technology Student', 2000,
                  'Future Digital Engineer', 2000,
                  'AutoCAD Enthusiast', 2000,
                  'Curious Learner', 2000,
                ]}
                repeat={Infinity}
                wrapper="span"
                cursor={true}
                className="text-white"
              />
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="max-w-xl mx-auto text-slate-400 text-base md:text-lg leading-relaxed"
          >
            Exploring the intersection of <span className="text-cyan-400">technology</span> and{' '}
            <span className="text-purple-400">engineering</span>. Building curiosity,
            one digital system at a time.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <MagneticButton
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              variant="primary"
            >
              <ExternalLink size={16} />
              View Portfolio
            </MagneticButton>

            <MagneticButton
              href="/cv.pdf"
              download
              variant="secondary"
            >
              <Download size={16} />
              Download CV
            </MagneticButton>

            <MagneticButton
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              variant="ghost"
            >
              <Mail size={16} />
              Contact
            </MagneticButton>
          </motion.div>

          {/* Social links */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 pt-2">
            {[
              { icon: Github, href: 'https://github.com/Vahain', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com/in/nguyễn-hiếu-456ab3263', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:ngval@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200 border border-transparent hover:border-cyan-500/20"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating stat badges */}
      <motion.div
        className="absolute left-8 top-1/3 hidden xl:block"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <FloatingBadge value="Vietnam 🇻🇳" label="Location" />
      </motion.div>
      <motion.div
        className="absolute right-8 top-1/3 hidden xl:block"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.7, duration: 0.8 }}
      >
        <FloatingBadge value="IT Student" label="Current Role" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <span className="text-xs font-mono tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  )
}

// === SUBCOMPONENTS ===

interface MagneticButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  download?: boolean
  variant: 'primary' | 'secondary' | 'ghost'
}

function MagneticButton({ children, onClick, href, download, variant }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px)'
    ref.current.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
  }

  const classes = {
    primary: 'bg-gradient-to-r from-cyan-500 to-cyan-400 text-black hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] hover:scale-105',
    secondary: 'bg-white/5 border border-white/10 text-white hover:border-cyan-500/50 hover:bg-cyan-500/10',
    ghost: 'text-slate-400 hover:text-cyan-400 border border-transparent hover:border-cyan-500/20',
  }[variant]

  const baseClasses = `inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${classes}`

  if (href) {
    return (
      <a
        ref={ref as any}
        href={href}
        download={download}
        target={!download ? '_blank' : undefined}
        className={baseClasses}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref as any}
      onClick={onClick}
      className={baseClasses}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  )
}

function FloatingBadge({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      className="glass border border-white/5 rounded-xl px-4 py-3 text-center"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="text-sm font-semibold text-white">{value}</div>
      <div className="text-xs text-slate-500 mt-0.5 font-mono">{label}</div>
    </motion.div>
  )
}
