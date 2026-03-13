'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github, Layers, Cpu, PenTool, Globe } from 'lucide-react'

const projects = [
  {
    title: 'PC Hardware Optimizer',
    category: 'Hardware',
    description: 'A research project exploring PC assembly and performance optimization techniques. Documented component compatibility, cooling solutions, and benchmarking results.',
    tools: ['Hardware Research', 'Documentation', 'Benchmarking'],
    icon: Cpu,
    color: '#00f5ff',
    status: 'Completed',
    year: '2024',
  },
  {
    title: 'AutoCAD Technical Drawings',
    category: 'Engineering',
    description: 'Collection of 2D technical drawings and schematics created during AutoCAD certification training. Includes floor plans, mechanical parts, and engineering blueprints.',
    tools: ['AutoCAD', 'Technical Drawing', '2D Drafting'],
    icon: PenTool,
    color: '#a855f7',
    status: 'Ongoing',
    year: '2024',
    link: 'https://drive.google.com/file/d/1lycevNhFbAQdzwg-I0OCWiiDon33lwKY/view?usp=drive_link',
  },
  {
    title: 'AI Tools Exploration',
    category: 'Technology',
    description: 'Systematic exploration of modern AI tools including Google Gemini. Documented use cases, capabilities, and practical applications for everyday productivity.',
    tools: ['Gemini AI', 'Research', 'Documentation'],
    icon: Layers,
    color: '#3b82f6',
    status: 'Completed',
    year: '2024',
  },
  {
    title: 'Digital Portfolio Website',
    category: 'Web',
    description: 'This portfolio itself — a technology exploration project combining modern web technologies, 3D graphics, and interactive design to showcase learning journey.',
    tools: ['Next.js', 'Three.js', 'Framer Motion', 'TailwindCSS'],
    icon: Globe,
    color: '#10b981',
    status: 'Live',
    year: '2025',
    link: '#',
  },
]

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeFilter, setActiveFilter] = useState('All')
  
  const filters = ['All', 'Hardware', 'Engineering', 'Technology', 'Web']
  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter)

  return (
    <section id="projects" ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-10 pointer-events-none" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />

      <div className="section-container">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono text-cyan-400/60 tracking-[0.4em] uppercase">03. Projects</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">What I've Built</h2>
          <div className="neon-line w-24 mx-auto mt-6" />
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                activeFilter === f
                  ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400'
                  : 'bg-white/3 border border-white/5 text-slate-500 hover:text-slate-300 hover:border-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((project, i) => (
            <TiltCard key={project.title} project={project} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TiltCard({ project, index, isInView }: { project: typeof projects[0]; index: number; isInView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const Icon = project.icon

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 10
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 10
    setTilt({ x, y })
  }

  const statusColors: Record<string, string> = {
    'Live': '#10b981',
    'Completed': '#00f5ff',
    'Ongoing': '#f59e0b',
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => { setHovering(false); setTilt({ x: 0, y: 0 }) }}
      style={{
        transform: hovering ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)` : 'perspective(1000px) rotateX(0) rotateY(0) scale(1)',
        transition: 'transform 0.2s ease',
      }}
      className="glass rounded-2xl p-6 border border-white/5 group relative overflow-hidden cursor-default"
    >
      {/* Color glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.color}08 0%, transparent 70%)` }}
      />
      
      {/* Top border glow on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}60, transparent)` }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}
            >
              <Icon size={18} style={{ color: project.color }} />
            </div>
            <div>
              <span className="text-xs font-mono text-slate-500">{project.category}</span>
              <h3 className="font-semibold text-white group-hover:text-white/90 text-sm leading-tight">
                {project.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span
              className="text-xs px-2 py-0.5 rounded-full font-mono"
              style={{
                background: `${statusColors[project.status]}15`,
                border: `1px solid ${statusColors[project.status]}30`,
                color: statusColors[project.status],
              }}
            >
              {project.status}
            </span>
            <span className="text-xs text-slate-600 font-mono">{project.year}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed mb-4">{project.description}</p>

        {/* Tools */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tools.map(tool => (
            <span key={tool} className="text-xs px-2 py-0.5 rounded font-mono text-slate-400 bg-white/5 border border-white/5">
              {tool}
            </span>
          ))}
        </div>

        {/* Links */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono transition-colors"
            style={{ color: project.color }}
          >
            <ExternalLink size={12} />
            View Project
          </a>
        )}
      </div>
    </motion.div>
  )
}
