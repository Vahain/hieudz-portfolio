'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import CustomCursor from '@/components/ui/CustomCursor'
import ScrollProgress from '@/components/ui/ScrollProgress'
import Navbar from '@/components/ui/Navbar'
import LoadingScreen from '@/components/ui/LoadingScreen'
import SmoothScroll from '@/components/ui/SmoothScroll'

const Hero = dynamic(() => import('@/components/sections/Hero'), { ssr: false })
const About = dynamic(() => import('@/components/sections/About'), { ssr: false })
const Skills = dynamic(() => import('@/components/sections/Skills'), { ssr: false })
const Projects = dynamic(() => import('@/components/sections/Projects'), { ssr: false })
const Certificates = dynamic(() => import('@/components/sections/Certificates'), { ssr: false })
const Timeline = dynamic(() => import('@/components/sections/Timeline'), { ssr: false })
const Terminal = dynamic(() => import('@/components/sections/Terminal'), { ssr: false })
const Contact = dynamic(() => import('@/components/sections/Contact'), { ssr: false })
const AIAssistant = dynamic(() => import('@/components/ui/AIAssistant'), { ssr: false })

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <SmoothScroll>
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certificates />
          <Timeline />
          <Terminal />
          <Contact />
        </main>
        <AIAssistant />
      </SmoothScroll>
    </>
  )
}
