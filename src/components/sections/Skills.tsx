'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const skillCategories = [
  {
    id: 'tech',
    label: 'Technology',
    color: '#00f5ff',
    skills: [
      { name: 'HTML/CSS', level: 'Learning', x: 20, y: 25 },
      { name: 'JavaScript', level: 'Beginner', x: 35, y: 15 },
      { name: 'Python', level: 'Exploring', x: 15, y: 50 },
      { name: 'Git/GitHub', level: 'Learning', x: 30, y: 65 },
    ],
  },
  {
    id: 'software',
    label: 'Software',
    color: '#a855f7',
    skills: [
      { name: 'AutoCAD', level: 'Learning', x: 55, y: 20 },
      { name: 'Microsoft Office', level: 'Learning', x: 72, y: 10 },
      { name: 'Figma', level: 'Exploring', x: 82, y: 30 },
      { name: 'VS Code', level: 'Learning', x: 65, y: 45 },
    ],
  },
  {
    id: 'ai',
    label: 'AI Tools',
    color: '#3b82f6',
    skills: [
      { name: 'Google Gemini', level: 'Learning', x: 50, y: 62 },
      { name: 'ChatGPT', level: 'Exploring', x: 70, y: 72 },
      { name: 'AI Research', level: 'Exploring', x: 85, y: 57 },
    ],
  },
  {
    id: 'engineering',
    label: 'Engineering',
    color: '#10b981',
    skills: [
      { name: '2D Drawing', level: 'Learning', x: 20, y: 82 },
      { name: 'Technical Drafting', level: 'Beginner', x: 40, y: 87 },
      { name: 'Hardware Basics', level: 'Exploring', x: 57, y: 82 },
    ],
  },
]

const levelColors: Record<string, string> = {
  Beginner: '#f59e0b',
  Learning: '#00f5ff',
  Exploring: '#a855f7',
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredNode, setHoveredNode] = useState<{ name: string; level: string } | null>(null)

  return (
    <section id="skills" ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="section-container">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono text-cyan-400/60 tracking-[0.4em] uppercase">02. Skills</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">Skill Network</h2>
          <div className="neon-line w-24 mx-auto mt-6" />
          <p className="mt-4 text-slate-500 text-sm font-mono">Hover nodes to explore — honest skill levels shown</p>
        </motion.div>

        {/* Network Visualization */}
        <motion.div
          className="relative glass rounded-2xl border border-white/5 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ height: '500px' }}
        >
          <div className="absolute inset-0 cyber-grid-bg opacity-30" />

          {/* SVG lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {skillCategories.map(cat =>
              cat.skills.map((skill, i) =>
                cat.skills.slice(i + 1).map(other => (
                  <line
                    key={`${skill.name}-${other.name}`}
                    x1={skill.x} y1={skill.y}
                    x2={other.x} y2={other.y}
                    stroke={cat.color}
                    strokeWidth="0.12"
                    strokeOpacity="0.2"
                  />
                ))
              )
            )}
          </svg>

          {/* Nodes */}
          {skillCategories.map(cat =>
            cat.skills.map(skill => (
              <motion.button
                key={skill.name}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
                onMouseEnter={() => setHoveredNode(skill)}
                onMouseLeave={() => setHoveredNode(null)}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.4 + Math.random() * 0.5, duration: 0.4 }}
                whileHover={{ scale: 1.4 }}
              >
                <div
                  className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-md"
                  style={{ background: cat.color + '30' }}
                />
                <div
                  className="relative w-4 h-4 rounded-full border-2 transition-all"
                  style={{
                    background: levelColors[skill.level] + '30',
                    borderColor: levelColors[skill.level],
                    boxShadow: `0 0 8px ${levelColors[skill.level]}60`,
                  }}
                />
                <span className="absolute left-1/2 -translate-x-1/2 top-5 text-[10px] whitespace-nowrap font-mono text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 px-2 py-1 rounded z-10 pointer-events-none">
                  {skill.name}
                </span>
              </motion.button>
            ))
          )}

          {/* Category labels */}
          <div className="absolute top-3 left-3 text-xs font-mono font-bold" style={{ color: '#00f5ff' }}>Technology</div>
          <div className="absolute top-3 right-16 text-xs font-mono font-bold" style={{ color: '#a855f7' }}>Software</div>
          <div className="absolute bottom-20 right-3 text-xs font-mono font-bold" style={{ color: '#3b82f6' }}>AI Tools</div>
          <div className="absolute bottom-3 left-3 text-xs font-mono font-bold" style={{ color: '#10b981' }}>Engineering</div>

          {/* Tooltip */}
          <AnimatePresence>
            {hoveredNode && (
              <motion.div
                className="absolute bottom-4 right-4 glass-dark rounded-xl p-4 pointer-events-none z-20 min-w-[160px]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="font-semibold text-white text-sm mb-2">{hoveredNode.name}</div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: levelColors[hoveredNode.level] }} />
                  <span className="text-slate-400 text-xs font-mono">{hoveredNode.level}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Legend */}
        <motion.div
          className="mt-6 flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
        >
          {Object.entries(levelColors).map(([level, color]) => (
            <div key={level} className="flex items-center gap-2 text-sm text-slate-400 font-mono">
              <span className="w-3 h-3 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
              {level}
            </div>
          ))}
        </motion.div>

        {/* Category cards */}
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              className="glass rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full" style={{ background: cat.color, boxShadow: `0 0 6px ${cat.color}` }} />
                <span className="text-sm font-semibold text-white">{cat.label}</span>
              </div>
              <div className="space-y-2">
                {cat.skills.map(skill => (
                  <div key={skill.name} className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{skill.name}</span>
                    <span
                      className="font-mono px-1.5 py-0.5 rounded text-[10px]"
                      style={{ color: levelColors[skill.level], background: levelColors[skill.level] + '20' }}
                    >
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
