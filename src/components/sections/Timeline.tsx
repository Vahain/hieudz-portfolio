'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, GraduationCap, Code, Star } from 'lucide-react'

const timelineItems = [
  {
    year: '2025',
    title: 'Digital Portfolio Development',
    org: 'Personal Project',
    type: 'project',
    icon: Code,
    color: '#00f5ff',
    description: 'Began building a comprehensive personal portfolio using modern web technologies as a hands-on learning project. Exploring Next.js, Three.js, and advanced frontend concepts.',
    tags: ['Next.js', 'Three.js', 'Self-Study'],
  },
  {
    year: '2024',
    title: 'Google Gemini AI Certification',
    org: 'Google Program',
    type: 'cert',
    icon: Star,
    color: '#3b82f6',
    description: 'Completed Google Gemini AI certification program. Learned AI fundamentals, prompt engineering techniques, and practical applications of AI tools in daily workflows.',
    tags: ['AI', 'Certification', 'Google'],
  },
  {
    year: '2024',
    title: 'AutoCAD Certification',
    org: 'Technical Training Program',
    type: 'cert',
    icon: Star,
    color: '#a855f7',
    description: 'Completed AutoCAD certification covering 2D drafting and technical drawing. Gained foundational skills in engineering documentation and blueprint creation.',
    tags: ['AutoCAD', 'Engineering', 'Certification'],
  },
  {
    year: '2023–2024',
    title: 'Customer Service Representative',
    org: 'Service Industry',
    type: 'work',
    icon: Briefcase,
    color: '#10b981',
    description: 'Worked in a customer-facing environment gaining valuable real-world communication skills, teamwork experience, and professional work ethic in a collaborative team setting.',
    tags: ['Communication', 'Teamwork', 'Customer Service'],
  },
  {
    year: '2022',
    title: 'Information Technology Studies',
    org: 'University / College',
    type: 'edu',
    icon: GraduationCap,
    color: '#f59e0b',
    description: 'Started IT studies, developing foundations in computer science, digital systems, networking basics, and software concepts. Discovered a passion for technology and engineering.',
    tags: ['IT Studies', 'Computer Science', 'Learning'],
  },
]

export default function Timeline() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="timeline" ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute left-0 top-1/2 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="section-container">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono text-cyan-400/60 tracking-[0.4em] uppercase">05. Experience</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">My Journey</h2>
          <div className="neon-line w-24 mx-auto mt-6" />
        </motion.div>

        <div className="max-w-2xl mx-auto relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-8 top-4 bottom-4 w-px"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(0,245,255,0.3), rgba(168,85,247,0.3), transparent)' }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />

          <div className="space-y-8">
            {timelineItems.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  className="flex gap-6 group"
                >
                  {/* Dot + icon */}
                  <div className="relative shrink-0 z-10">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `${item.color}10`,
                        borderColor: `${item.color}30`,
                        boxShadow: `0 0 20px ${item.color}10`,
                      }}
                    >
                      <Icon size={20} style={{ color: item.color }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="glass rounded-xl p-5 flex-1 border border-white/5 group-hover:border-white/10 transition-all duration-300">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">{item.org}</p>
                      </div>
                      <span
                        className="text-xs font-mono px-2 py-0.5 rounded-full shrink-0"
                        style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}
                      >
                        {item.year}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded bg-white/5 text-slate-500 border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
