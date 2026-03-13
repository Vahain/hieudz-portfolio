'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { Terminal as TerminalIcon, X, Minus, Square } from 'lucide-react'

const commands: Record<string, string[]> = {
  help: [
    '╔══════════════════════════════════════╗',
    '║        NVH TERMINAL v1.0.0           ║',
    '╚══════════════════════════════════════╝',
    '',
    '  Available commands:',
    '',
    '  <cyan>about</cyan>      — About Nguyen Van Hieu',
    '  <cyan>skills</cyan>     — List my skills',
    '  <cyan>projects</cyan>   — View my projects',
    '  <cyan>contact</cyan>    — Get contact info',
    '  <cyan>certs</cyan>      — Show certifications',
    '  <cyan>clear</cyan>      — Clear terminal',
    '  <cyan>banner</cyan>     — Show welcome banner',
    '',
    '  Type any command to get started.',
  ],
  about: [
    '<purple>┌─────────────────────────────────────┐</purple>',
    '<purple>│  PROFILE: Nguyen Van Hieu            │</purple>',
    '<purple>└─────────────────────────────────────┘</purple>',
    '',
    '  <cyan>Name:</cyan>       Nguyen Van Hieu',
    '  <cyan>Location:</cyan>   Vietnam 🇻🇳',
    '  <cyan>Role:</cyan>       IT Student & Technology Explorer',
    '  <cyan>Interests:</cyan>  Software, AutoCAD, AI Tools',
    '  <cyan>Status:</cyan>     <green>Available for opportunities</green>',
    '',
    '  Hi! I\'m a technology-curious IT student',
    '  exploring the intersection of software',
    '  and engineering. Always learning, always',
    '  building something new.',
    '',
    '  Type <cyan>skills</cyan> to see what I know.',
  ],
  skills: [
    '<cyan>SKILL MATRIX — Honest levels only</cyan>',
    '─────────────────────────────────────',
    '',
    '  <purple>[Proficient]</purple>',
    '  ├── Microsoft Office Suite',
    '  ├── Google Workspace',
    '  ├── Communication & Teamwork',
    '  └── Adaptability',
    '',
    '  <blue>[Learning]</blue>',
    '  ├── AutoCAD (Certified)',
    '  ├── Gemini AI (Certified)',
    '  ├── HTML & CSS Basics',
    '  └── Computer Hardware',
    '',
    '  <yellow>[Exploring]</yellow>',
    '  ├── Next.js / React',
    '  ├── Networking Fundamentals',
    '  └── Digital Design Tools',
    '',
    '  Remember: learning > pretending.',
  ],
  projects: [
    '<cyan>PROJECT REGISTRY</cyan>',
    '─────────────────────────────────────',
    '',
    '  01. <white>PC Hardware Optimizer</white>',
    '      Research & documentation project',
    '      Tools: Hardware, Benchmarking',
    '',
    '  02. <white>AutoCAD Technical Drawings</white>',
    '      2D drafting & engineering blueprints',
    '      Tools: AutoCAD, Technical Drawing',
    '',
    '  03. <white>AI Tools Exploration</white>',
    '      Gemini AI study & documentation',
    '      Tools: Gemini AI, Research',
    '',
    '  04. <white>This Portfolio</white>',
    '      Modern web tech exploration',
    '      Tools: Next.js, Three.js, Framer',
    '',
    '  Type <cyan>contact</cyan> to get in touch.',
  ],
  contact: [
    '<cyan>CONTACT INFORMATION</cyan>',
    '─────────────────────────────────────',
    '',
    '  <green>Email:</green>    ngval****@gmail.com',
    '  <green>Phone:</green>    +84 096247****',
    '  <green>GitHub:</green>   github.com/Vahain',
    '  <green>LinkedIn:</green> linkedin.com/in/nguyễn-hiếu',
    '',
    '  Feel free to reach out for:',
    '  · Internship opportunities',
    '  · Technology collaboration',
    '  · Learning & networking',
    '',
    '  <yellow>Response time: usually within 24h</yellow>',
  ],
  certs: [
    '<cyan>CERTIFICATIONS</cyan>',
    '─────────────────────────────────────',
    '',
    '  <purple>✓ AutoCAD Certification</purple>',
    '    Issued: 2024',
    '    Skills: 2D Drafting, Technical Drawing',
    '',
    '  <blue>✓ Google Gemini AI Certificate</blue>',
    '    Issued: 2024',
    '    Skills: AI Tools, Prompt Engineering',
    '',
    '  <yellow>[ More certifications in progress ]</yellow>',
  ],
  banner: [
    '<cyan> _   ___   ___  _   _  </cyan>',
    '<cyan>| \\ | \\ \\ / / || | | | </cyan>',
    '<cyan>|  \\| |\\ V /| || |_| | </cyan>',
    '<cyan>| |\\  | | | |__   _|  </cyan>',
    '<cyan>|_| \\_| |_|    |_|    </cyan>',
    '',
    '  Nguyen Van Hieu — Portfolio Terminal',
    '  Type <cyan>help</cyan> to see available commands.',
  ],
}

interface HistoryItem {
  type: 'input' | 'output' | 'error'
  content: string
}

export default function Terminal() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'output', content: '  NVH Terminal initialized...' },
    { type: 'output', content: '  Type <cyan>help</cyan> to get started.' },
    { type: 'output', content: '' },
  ])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const renderLine = (line: string) => {
    return line
      .replace(/<cyan>(.*?)<\/cyan>/g, '<span style="color:#00f5ff">$1</span>')
      .replace(/<purple>(.*?)<\/purple>/g, '<span style="color:#a855f7">$1</span>')
      .replace(/<blue>(.*?)<\/blue>/g, '<span style="color:#3b82f6">$1</span>')
      .replace(/<green>(.*?)<\/green>/g, '<span style="color:#10b981">$1</span>')
      .replace(/<yellow>(.*?)<\/yellow>/g, '<span style="color:#f59e0b">$1</span>')
      .replace(/<white>(.*?)<\/white>/g, '<span style="color:#f1f5f9">$1</span>')
  }

  const runCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    const newHistory: HistoryItem[] = [
      { type: 'input', content: cmd },
    ]

    if (trimmed === 'clear') {
      setHistory([{ type: 'output', content: '  Terminal cleared.' }, { type: 'output', content: '' }])
      setCmdHistory(prev => [cmd, ...prev])
      setInput('')
      return
    }

    if (commands[trimmed]) {
      commands[trimmed].forEach(line => newHistory.push({ type: 'output', content: line }))
    } else if (trimmed === '') {
      // empty command
    } else {
      newHistory.push({ type: 'error', content: `  Command not found: "${trimmed}". Type <cyan>help</cyan> for available commands.` })
    }

    newHistory.push({ type: 'output', content: '' })
    setHistory(prev => [...prev, ...newHistory])
    setCmdHistory(prev => [cmd, ...prev])
    setInput('')
    setHistIdx(-1)
  }, [])

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      runCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIdx + 1, cmdHistory.length - 1)
      setHistIdx(next)
      setInput(cmdHistory[next] || '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(histIdx - 1, -1)
      setHistIdx(next)
      setInput(next === -1 ? '' : cmdHistory[next])
    }
  }

  return (
    <section id="terminal" ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-10 pointer-events-none" />

      <div className="section-container">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono text-cyan-400/60 tracking-[0.4em] uppercase">06. Terminal</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">Interactive Terminal</h2>
          <p className="text-slate-500 mt-4 text-sm font-mono">Type <span className="text-cyan-400">help</span> to get started</p>
          <div className="neon-line w-24 mx-auto mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          {/* Terminal window */}
          <div className="rounded-2xl overflow-hidden border border-white/10 glow-border" style={{ boxShadow: '0 0 40px rgba(0,245,255,0.05)' }}>
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/80 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" onClick={() => setHistory([])} />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs font-mono text-slate-500">nvh@portfolio: ~</span>
              </div>
              <TerminalIcon size={12} className="text-slate-600" />
            </div>

            {/* Terminal body */}
            <div
              className="p-5 min-h-80 max-h-96 overflow-y-auto bg-[#050a14] font-mono text-sm"
              onClick={() => inputRef.current?.focus()}
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#1e293b transparent' }}
            >
              {history.map((item, i) => (
                <div key={i} className="leading-6">
                  {item.type === 'input' ? (
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">❯</span>
                      <span className="text-cyan-300">{item.content}</span>
                    </div>
                  ) : item.type === 'error' ? (
                    <div
                      className="text-red-400/80 pl-4"
                      dangerouslySetInnerHTML={{ __html: renderLine(item.content) }}
                    />
                  ) : (
                    <div
                      className="text-slate-400 pl-2"
                      dangerouslySetInnerHTML={{ __html: renderLine(item.content) }}
                    />
                  )}
                </div>
              ))}

              {/* Input line */}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-green-400">❯</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  className="flex-1 bg-transparent text-cyan-300 outline-none caret-cyan-400 font-mono text-sm"
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="type a command..."
                />
              </div>
              <div ref={bottomRef} />
            </div>

            {/* Quick commands */}
            <div className="flex flex-wrap gap-2 px-5 py-3 bg-slate-900/50 border-t border-white/5">
              {['help', 'about', 'skills', 'projects', 'contact'].map(cmd => (
                <button
                  key={cmd}
                  onClick={() => runCommand(cmd)}
                  className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/20 transition-all"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
