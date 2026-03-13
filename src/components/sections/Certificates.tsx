'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Award, ExternalLink, Download, X, Shield, Zap } from 'lucide-react'

const certificates = [
  {
    title: 'AutoCAD Certification',
    issuer: 'Professional Training Program',
    date: '2024',
    description: 'Completed AutoCAD training covering 2D drafting, technical drawings, and engineering documentation fundamentals.',
    skills: ['2D Drafting', 'Technical Drawing', 'Engineering Blueprints', 'AutoCAD Tools'],
    icon: Shield,
    color: '#a855f7',
    previewLink: 'https://drive.google.com/file/d/1zUxcJPhy8fa-Qc9_0bgKa6Kd4xtNII38/view?usp=sharing',
    downloadLink: 'https://drive.google.com/uc?export=download&id=1zUxcJPhy8fa-Qc9_0bgKa6Kd4xtNII38',
    id: 'autocad',
  },
  {
    title: 'Google Gemini AI Certificate',
    issuer: 'Google / Gemini Program',
    date: '2024',
    description: 'Completed Google Gemini AI training covering AI fundamentals, prompt engineering, and practical AI tool applications.',
    skills: ['AI Fundamentals', 'Prompt Engineering', 'Gemini API', 'AI Applications'],
    icon: Zap,
    color: '#00f5ff',
    previewLink: 'https://drive.google.com/file/d/1zaEQXpDEuErF1_fQMUoZ432Ebv51gRdR/view?usp=sharing',
    downloadLink: 'https://drive.google.com/uc?export=download&id=1zaEQXpDEuErF1_fQMUoZ432Ebv51gRdR',
    id: 'gemini',
  },
]

export default function Certificates() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const activeCert = certificates.find(c => c.id === activeModal)

  return (
    <section id="certificates" ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      <div className="section-container">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono text-cyan-400/60 tracking-[0.4em] uppercase">04. Certificates</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">Certifications</h2>
          <div className="neon-line w-24 mx-auto mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {certificates.map((cert, i) => {
            const Icon = cert.icon
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="glass rounded-2xl overflow-hidden border border-white/5 group hover:border-white/10 transition-all duration-500"
              >
                {/* Top gradient bar */}
                <div className="h-1" style={{ background: `linear-gradient(90deg, ${cert.color}, ${cert.color}50, transparent)` }} />

                <div className="p-6">
                  {/* Icon + header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
                    >
                      <Award size={22} style={{ color: cert.color }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white group-hover:text-white/90 transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 font-mono">{cert.issuer} · {cert.date}</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{cert.description}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {cert.skills.map(skill => (
                      <span
                        key={skill}
                        className="text-xs px-2 py-0.5 rounded font-mono"
                        style={{
                          background: `${cert.color}10`,
                          border: `1px solid ${cert.color}20`,
                          color: cert.color,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveModal(cert.id)}
                      className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                    >
                      <ExternalLink size={12} />
                      Preview
                    </button>
                    <span className="text-slate-700">·</span>
                    <a
                      href={cert.downloadLink}
                      download
                      className="flex items-center gap-1.5 text-xs font-mono transition-colors"
                      style={{ color: cert.color }}
                    >
                      <Download size={12} />
                      Download
                    </a>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeModal && activeCert && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setActiveModal(null)} />
            <motion.div
              className="relative glass-dark rounded-2xl overflow-hidden max-w-lg w-full border border-white/10"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white">{activeCert.title}</h3>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="text-slate-500 hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="bg-slate-900 rounded-xl p-4 mb-4 text-center">
                  <p className="text-xs text-slate-500 font-mono mb-3">Certificate Preview</p>
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex flex-col items-center justify-center border border-white/5">
                    <Award size={48} style={{ color: activeCert.color }} className="mb-3 opacity-60" />
                    <p className="text-white font-semibold text-sm">{activeCert.title}</p>
                    <p className="text-slate-500 text-xs mt-1">{activeCert.issuer}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <a
                    href={activeCert.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-mono border border-white/10 text-slate-300 hover:border-white/20 hover:text-white transition-all"
                  >
                    <ExternalLink size={14} />
                    Open in Drive
                  </a>
                  <a
                    href={activeCert.downloadLink}
                    download
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-mono transition-all"
                    style={{ background: `${activeCert.color}20`, border: `1px solid ${activeCert.color}40`, color: activeCert.color }}
                  >
                    <Download size={14} />
                    Download
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
