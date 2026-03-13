'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CountUp from 'react-countup'
import { useIntersectionObserver } from 'react-intersection-observer'
import { BookOpen, Cpu, Globe, Wrench } from 'lucide-react'

const stats = [
  { label: 'Learning Hours', value: 500, suffix: '+', icon: BookOpen, color: 'cyan' },
  { label: 'Tools Explored', value: 15, suffix: '+', icon: Wrench, color: 'purple' },
  { label: 'Certificates', value: 2, suffix: '', icon: Globe, color: 'blue' },
  { label: 'Projects Built', value: 8, suffix: '+', icon: Cpu, color: 'green' },
]

const interests = [
  { title: 'Software Technology', desc: 'Exploring modern tools and frameworks, always learning what\'s new in tech.', emoji: '💻' },
  { title: 'AutoCAD & Engineering', desc: 'Fascinated by technical drawing and how digital tools shape physical design.', emoji: '📐' },
  { title: 'Digital Systems', desc: 'Understanding how hardware and software intersect in the real world.', emoji: '🔧' },
  { title: 'AI & Modern Tools', desc: 'Curious about AI applications and how they\'re transforming every industry.', emoji: '🤖' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      <div className="section-container">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono text-cyan-400/60 tracking-[0.4em] uppercase">01. About</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">
            Who I Am
          </h2>
          <div className="neon-line w-24 mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="glass rounded-2xl p-6 border border-white/5 glow-border-purple">
              <div className="flex items-start gap-4">
                <span className="text-4xl">👋</span>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Hi, I'm Hieu</h3>
                  <p className="text-slate-400 leading-relaxed">
                    I'm an Information Technology student in Vietnam with a deep curiosity for 
                    how technology and engineering intersect. Every tool I pick up, every system 
                    I explore — it's all part of understanding the digital world around me.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-slate-400 leading-relaxed">
                My journey started with a simple question: <span className="text-cyan-400 italic">"How does this work?"</span> That 
                curiosity has led me through software tools, AutoCAD drawing, hardware systems, 
                and the rapidly evolving world of AI tools.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-slate-400 leading-relaxed">
                I'm not claiming to be an expert — I'm a learner. Someone who wakes up curious, 
                explores through hands-on practice, and values the process of growth over 
                the destination.
              </p>
            </motion.div>

            {/* Tags */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-2">
              {['Curious Learner', 'IT Student', 'Vietnam 🇻🇳', 'Technology Explorer', 'AutoCAD', 'Always Building'].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-mono text-cyan-400/80 border border-cyan-500/20 bg-cyan-500/5">
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Interests grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 gap-4"
          >
            {interests.map((item, i) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="glass rounded-xl p-5 border border-white/5 hover:border-cyan-500/20 transition-all duration-300 group cursor-default"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {item.emoji}
                </div>
                <h4 className="font-semibold text-white text-sm mb-2 group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} isInView={isInView} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function StatCard({ stat, isInView }: { stat: typeof stats[0]; isInView: boolean }) {
  const colorMap = {
    cyan: { border: 'hover:border-cyan-500/30', glow: 'text-cyan-400', bg: 'from-cyan-500/10' },
    purple: { border: 'hover:border-purple-500/30', glow: 'text-purple-400', bg: 'from-purple-500/10' },
    blue: { border: 'hover:border-blue-500/30', glow: 'text-blue-400', bg: 'from-blue-500/10' },
    green: { border: 'hover:border-emerald-500/30', glow: 'text-emerald-400', bg: 'from-emerald-500/10' },
  }[stat.color] || { border: '', glow: 'text-cyan-400', bg: '' }

  const Icon = stat.icon

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      className={`glass rounded-2xl p-6 border border-white/5 ${colorMap.border} transition-all duration-300 group text-center`}
    >
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${colorMap.bg} to-transparent mb-4 mx-auto`}>
        <Icon size={18} className={colorMap.glow} />
      </div>
      <div className={`text-3xl font-bold ${colorMap.glow} tabular-nums`}>
        {isInView ? (
          <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
        ) : (
          `0${stat.suffix}`
        )}
      </div>
      <div className="text-xs text-slate-500 mt-1 font-mono">{stat.label}</div>
    </motion.div>
  )
}
