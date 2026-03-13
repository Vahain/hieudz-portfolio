'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react'

const KNOWLEDGE_BASE: Record<string, string> = {
  background: "Hi! I'm Hieu, an Information Technology student from Vietnam. I'm passionate about exploring how technology and engineering intersect. I've been learning about digital systems, AutoCAD, AI tools, and modern web technologies. I'm currently building this portfolio as a learning project!",
  skills: "My honest skill levels: I'm proficient in Microsoft Office and Google Workspace. I'm learning AutoCAD (I have a certificate!), Google Gemini AI (also certified), HTML/CSS basics, and computer hardware. I'm exploring web development and networking fundamentals. I believe in honest self-assessment!",
  projects: "My main projects include: (1) PC Hardware Optimizer — a research project on component compatibility and performance. (2) AutoCAD Technical Drawings — 2D drafting practice for my certification. (3) AI Tools Exploration — systematic study of Google Gemini AI. (4) This portfolio website — my biggest web development project!",
  contact: "You can reach me at ngval****@gmail.com, find me on GitHub at github.com/Vahain, or connect on LinkedIn. I'm based in Vietnam and open to opportunities!",
  career: "I'm interested in technology roles that combine software and engineering. I'm open to internships, entry-level positions in IT support, or technology roles where I can continue learning. I'm especially curious about digital systems, engineering software, and AI applications.",
  education: "I'm currently studying Information Technology. I've earned an AutoCAD certification and a Google Gemini AI certificate in 2024. I'm continuously self-learning through online resources and hands-on projects.",
  autocad: "I completed an AutoCAD certification covering 2D drafting, technical drawings, and engineering blueprints. I created floor plans, mechanical parts drawings, and engineering schematics during the training. Here's my certificate: https://drive.google.com/file/d/1zUxcJPhy8fa-Qc9_0bgKa6Kd4xtNII38/view",
  ai: "I'm fascinated by AI! I completed a Google Gemini AI certification and have been exploring how AI tools can enhance productivity and learning. I'm curious about how AI will transform technology and engineering fields in the future.",
}

function findResponse(msg: string): string {
  const lower = msg.toLowerCase()
  if (lower.includes('skill') || lower.includes('know') || lower.includes('learn')) return KNOWLEDGE_BASE.skills
  if (lower.includes('project') || lower.includes('build') || lower.includes('work')) return KNOWLEDGE_BASE.projects
  if (lower.includes('contact') || lower.includes('email') || lower.includes('reach')) return KNOWLEDGE_BASE.contact
  if (lower.includes('career') || lower.includes('job') || lower.includes('opportunit') || lower.includes('intern')) return KNOWLEDGE_BASE.career
  if (lower.includes('educat') || lower.includes('school') || lower.includes('stud') || lower.includes('cert')) return KNOWLEDGE_BASE.education
  if (lower.includes('autocad') || lower.includes('drawing') || lower.includes('cad')) return KNOWLEDGE_BASE.autocad
  if (lower.includes('ai') || lower.includes('gemini') || lower.includes('artificial')) return KNOWLEDGE_BASE.ai
  if (lower.includes('about') || lower.includes('who') || lower.includes('hieu') || lower.includes('yourself')) return KNOWLEDGE_BASE.background
  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) return "Hello! 👋 I'm Hieu's AI assistant. I can tell you about his background, skills, projects, or career interests. What would you like to know?"
  return "I can help with questions about Hieu's background, skills, projects, career interests, AutoCAD work, or AI exploration. What would you like to know? 🤔"
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const quickQuestions = ['Who is Hieu?', 'What are his skills?', 'Show projects', 'Contact info']

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm Hieu's AI assistant. Ask me anything about his background, skills, projects, or how to get in touch! 🚀" }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = (text?: string) => {
    const msg = text || input.trim()
    if (!msg) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: msg }])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, { role: 'assistant', content: findResponse(msg) }])
    }, 800 + Math.random() * 600)
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: 'linear-gradient(135deg, #00f5ff, #a855f7)' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: open ? 0 : 1 }}
        transition={{ type: 'spring', damping: 15 }}
      >
        <MessageCircle size={22} className="text-black" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full text-[9px] text-black flex items-center justify-center font-bold">1</span>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 flex flex-col rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            style={{ maxHeight: '520px', boxShadow: '0 0 60px rgba(0,245,255,0.1), 0 25px 50px rgba(0,0,0,0.5)' }}
            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-slate-900 to-slate-900 border-b border-white/5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Hieu's Assistant</p>
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  Online
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#060b18]" style={{ maxHeight: '300px' }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'assistant' ? 'bg-gradient-to-br from-cyan-500 to-purple-600' : 'bg-slate-700'
                  }`}>
                    {msg.role === 'assistant' ? <Bot size={12} className="text-white" /> : <User size={12} className="text-white" />}
                  </div>
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-cyan-500/20 text-cyan-100 border border-cyan-500/20'
                      : 'bg-white/5 text-slate-300 border border-white/5'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                    <Bot size={12} className="text-white" />
                  </div>
                  <div className="bg-white/5 rounded-xl px-3 py-2 border border-white/5 flex gap-1">
                    {[0,1,2].map(i => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick questions */}
            <div className="flex flex-wrap gap-1.5 px-4 py-2 bg-slate-900/50 border-t border-white/5">
              {quickQuestions.map(q => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-xs px-2 py-1 rounded-lg bg-white/5 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/20 transition-all font-mono"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 p-3 bg-slate-900 border-t border-white/5">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 outline-none focus:border-cyan-500/50 transition-colors font-mono"
              />
              <button
                onClick={() => send()}
                disabled={!input.trim()}
                className="w-8 h-8 rounded-xl bg-cyan-500 disabled:bg-slate-800 flex items-center justify-center transition-colors hover:bg-cyan-400 disabled:cursor-not-allowed"
              >
                <Send size={13} className="text-black disabled:text-slate-600" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
