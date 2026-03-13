'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, Github, Linkedin, Send, CheckCircle } from 'lucide-react'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'ngvalhieu@gmail.com', href: 'mailto:ngvalhieu@gmail.com', color: '#00f5ff' },
  { icon: Phone, label: 'Phone', value: '+84 096247****', href: 'tel:+840962473806', color: '#a855f7' },
  { icon: Github, label: 'GitHub', value: 'Vahain', href: 'https://github.com/Vahain', color: '#3b82f6' },
  { icon: Linkedin, label: 'LinkedIn', value: 'Nguyễn Hiếu', href: 'https://linkedin.com/in/nguyễn-hiếu-456ab3263', color: '#10b981' },
]

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1500)
  }

  return (
    <section id="contact" ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0,245,255,0.03) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 cyber-grid-bg opacity-10 pointer-events-none" />

      <div className="section-container">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono text-cyan-400/60 tracking-[0.4em] uppercase">07. Contact</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">Get In Touch</h2>
          <p className="text-slate-500 mt-4 max-w-md mx-auto text-sm">
            Whether you have an opportunity, a question, or just want to connect — my inbox is always open.
          </p>
          <div className="neon-line w-24 mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Left — Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Let's connect</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                I'm open to internship opportunities, technology collaborations, and learning from experienced professionals. Don't hesitate to reach out!
              </p>
            </div>

            {contactInfo.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                  className="flex items-center gap-4 glass rounded-xl p-4 border border-white/5 hover:border-white/10 transition-all duration-300 group"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300"
                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                  >
                    <Icon size={16} style={{ color: item.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 font-mono">{item.label}</p>
                    <p className="text-sm text-slate-300 group-hover:text-white transition-colors truncate">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              )
            })}
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {status === 'sent' ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center glass rounded-2xl p-8 border border-emerald-500/20 glow-border"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 border border-emerald-500/30">
                  <CheckCircle size={32} className="text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-slate-400 text-sm">Thanks for reaching out. I'll get back to you soon!</p>
                <button
                  onClick={() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }) }}
                  className="mt-6 px-4 py-2 text-xs font-mono text-slate-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-all"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 border border-white/5 space-y-4">
                <h3 className="text-sm font-mono text-slate-400 mb-5">
                  <span className="text-cyan-400">{'// '}</span>
                  Send a message
                </h3>

                {[
                  { id: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                  { id: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
                ].map(field => (
                  <div key={field.id}>
                    <label className="block text-xs font-mono text-slate-500 mb-1.5">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={form[field.id as keyof typeof form]}
                      onChange={e => setForm(prev => ({ ...prev, [field.id]: e.target.value }))}
                      placeholder={field.placeholder}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all duration-200 font-mono"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1.5">Message</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Hi Hieu, I'd like to..."
                    required
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all duration-200 font-mono resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-cyan-500 to-cyan-400 text-black hover:shadow-[0_0_30px_rgba(0,245,255,0.3)] transition-all duration-300 disabled:opacity-60"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === 'sending' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="section-container mt-24">
        <div className="neon-line" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs font-mono text-slate-600">
          <span>© 2025 Nguyen Van Hieu. Built with curiosity.</span>
          <span className="flex items-center gap-1">
            Made with <span className="text-red-500">♥</span> in Vietnam 🇻🇳
          </span>
        </div>
      </div>
    </section>
  )
}
