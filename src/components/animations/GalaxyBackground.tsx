'use client'

import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Stars() {
  const ref = useRef<THREE.Points>(null!)
  const count = 6000
  
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = 1.5 + Math.random() * 3
    
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)
    
    // Cyan/purple/blue stars
    const colorChoice = Math.random()
    if (colorChoice < 0.4) {
      colors[i * 3] = 0; colors[i * 3 + 1] = 0.9; colors[i * 3 + 2] = 1 // cyan
    } else if (colorChoice < 0.7) {
      colors[i * 3] = 0.6; colors[i * 3 + 1] = 0.2; colors[i * 3 + 2] = 1 // purple
    } else {
      colors[i * 3] = 0.8; colors[i * 3 + 1] = 0.8; colors[i * 3 + 2] = 1 // white-blue
    }
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.02
      ref.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <Points ref={ref} positions={positions} colors={colors}>
      <PointMaterial
        transparent
        vertexColors
        size={0.008}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  )
}

function NebulaParticles() {
  const ref = useRef<THREE.Points>(null!)
  const count = 3000
  
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 6
    positions[i * 3 + 1] = (Math.random() - 0.5) * 4
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.01
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
  })

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        transparent
        color="#a855f7"
        size={0.003}
        sizeAttenuation
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  )
}

function CameraParallax() {
  const { camera } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })
  
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 0.5
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 0.3
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  useFrame(() => {
    camera.position.x += (mouseRef.current.x - camera.position.x) * 0.02
    camera.position.y += (-mouseRef.current.y - camera.position.y) * 0.02
  })

  return null
}

export default function GalaxyBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Stars />
        <NebulaParticles />
        <CameraParallax />
      </Canvas>
    </div>
  )
}
