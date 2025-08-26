<template>
  <div class="fixed inset-0 -z-10">
    <canvas ref="canvasRef" class="w-full h-full"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  originalSize: number
}

interface Mouse {
  x: number
  y: number
  active: boolean
  radius: number
}

// Canvas references
const canvasRef = ref<HTMLCanvasElement | null>(null)
const particles = ref<Particle[]>([])
const mouse = ref<Mouse>({ x: 0, y: 0, active: false, radius: 120 })
let animationFrame: number
let ctx: CanvasRenderingContext2D | null = null
let frameCount = 0

// Modern tech color palette with transparency
const primaryColors = [
  'rgba(59, 130, 246, 0.8)',  // Blue
  'rgba(16, 182, 129, 0.7)',  // Green
  'rgba(139, 92, 246, 0.7)',  // Purple
  'rgba(6, 182, 212, 0.7)',   // Cyan
  'rgba(245, 158, 11, 0.6)'   // Orange
]

// Subtle accent colors for variety
const accentColors = [
  'rgba(99, 102, 241, 0.6)',  // Indigo
  'rgba(236, 72, 153, 0.5)',  // Pink
  'rgba(14, 165, 233, 0.7)',  // Sky
  'rgba(20, 184, 166, 0.6)'   // Teal
]

const bgGradient = {
  startColor: '#0B1120', // Dark blue-black
  midColor: '#131B2E',   // Midnight blue
  endColor: '#101526'    // Deep space
}

// Responsive particle settings
const particleSettings = computed(() => {
  // Adjust settings based on screen size
  const width = window.innerWidth
  return {
    count: width < 768 ? 40 : width < 1280 ? 60 : 80,
    baseSize: width < 768 ? 1 : 1.5,
    maxConnections: width < 768 ? 3 : 5,
    connectionDistance: width < 768 ? 150 : 200
  }
})

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  ctx = canvas.getContext('2d')
  if (!ctx) return

  // Set canvas size with high DPR support
  const updateSize = () => {
    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`
    
    if (ctx) {
      ctx.scale(dpr, dpr)
    }

    // Reinitialize particles on resize for best distribution
    initParticles()
  }
  
  updateSize()
  window.addEventListener('resize', updateSize)
}

const initParticles = () => {
  particles.value = []
  const allColors = [...primaryColors, ...accentColors]
  
  // Create particles with improved distribution
  for (let i = 0; i < particleSettings.value.count; i++) {
    // Use golden ratio for better distribution
    const phi = Math.PI * (3 - Math.sqrt(5))
    const y = 1 - (i / (particleSettings.value.count - 1)) * 2
    const radius = Math.sqrt(1 - y * y)
    const theta = phi * i
    
    const x = (Math.cos(theta) * radius * 0.5 + 0.5) * window.innerWidth
    const py = (y * 0.5 + 0.5) * window.innerHeight
    
    // Vary sizes with some larger focal points
    const isFocal = Math.random() > 0.9
    const size = isFocal 
      ? Math.random() * 3 + particleSettings.value.baseSize * 2
      : Math.random() * particleSettings.value.baseSize + particleSettings.value.baseSize * 0.5
    
    // Create particle with different properties
    particles.value.push({
      x,
      y: py,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size,
      originalSize: size,
      color: allColors[Math.floor(Math.random() * allColors.length)],
      alpha: Math.random() * 0.5 + 0.5
    })
  }
}

const drawBackground = () => {
  if (!ctx || !canvasRef.value) return
  
  // Create gradient background
  const gradient = ctx.createRadialGradient(
    window.innerWidth / 2, 
    window.innerHeight / 2, 
    0,
    window.innerWidth / 2,
    window.innerHeight / 2,
    Math.max(window.innerWidth, window.innerHeight)
  )
  
  gradient.addColorStop(0, bgGradient.midColor)
  gradient.addColorStop(0.5, bgGradient.startColor)
  gradient.addColorStop(1, bgGradient.endColor)
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
  
  // Add subtle grid pattern for tech feel
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'
  ctx.lineWidth = 0.3
  
  // Draw horizontal lines
  const gridSpacing = 40
  for (let y = 0; y < window.innerHeight; y += gridSpacing) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(window.innerWidth, y)
    ctx.stroke()
  }
  
  // Draw vertical lines with slight perspective
  for (let x = 0; x < window.innerWidth; x += gridSpacing) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, window.innerHeight)
    ctx.stroke()
  }
}

const drawParticles = () => {
  if (!ctx || !canvasRef.value) return

  // Draw background
  drawBackground()
  
  frameCount++
  
  // Process particles in two passes - first update positions
  particles.value.forEach((particle, i) => {
    // Smoother movement with inertia
    particle.x += particle.vx
    particle.y += particle.vy
    
    // Add slight drift with sin wave for organic motion
    const drift = Math.sin(frameCount * 0.01 + i) * 0.02
    particle.vx += drift
    particle.vy += Math.cos(frameCount * 0.01 + i) * 0.02
    
    // Natural dampening
    particle.vx *= 0.99
    particle.vy *= 0.99
    
    // Limit velocity
    const maxVel = 0.5
    particle.vx = Math.max(Math.min(particle.vx, maxVel), -maxVel)
    particle.vy = Math.max(Math.min(particle.vy, maxVel), -maxVel)

    // Wrap around screen edges with slight offset for natural feel
    if (particle.x < -50) particle.x = window.innerWidth + 50
    if (particle.x > window.innerWidth + 50) particle.x = -50
    if (particle.y < -50) particle.y = window.innerHeight + 50
    if (particle.y > window.innerHeight + 50) particle.y = -50

    // Mouse interaction - create repulsion effect
    if (mouse.value.active) {
      const dx = particle.x - mouse.value.x
      const dy = particle.y - mouse.value.y
      const mouseDistance = Math.sqrt(dx * dx + dy * dy)

      if (mouseDistance < mouse.value.radius) {
        // Push particles away from cursor with easing
        const force = Math.min((mouse.value.radius - mouseDistance) / mouse.value.radius * 0.2, 0.8)
        const angle = Math.atan2(dy, dx)
        particle.vx += Math.cos(angle) * force
        particle.vy += Math.sin(angle) * force
        
        // Increase size slightly when affected by mouse
        particle.size = particle.originalSize * 1.5
      } else {
        // Return to original size
        particle.size += (particle.originalSize - particle.size) * 0.1
      }
    } else {
      particle.size += (particle.originalSize - particle.size) * 0.1
    }
    
    // Subtle size pulsing for liveliness
    particle.size += Math.sin(frameCount * 0.05 + i) * 0.2
    particle.size = Math.max(particle.size, 0.5)
  })

  // Second pass - draw connections and particles
  particles.value.forEach((particle, i) => {
    // Track connections to limit per particle for cleaner look
    let connections = 0
    
    // Draw connections
    particles.value.forEach((p2, j) => {
      if (i === j || connections >= particleSettings.value.maxConnections) return

      const dx = particle.x - p2.x
      const dy = particle.y - p2.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Dynamic connection distance
      const maxDistance = particleSettings.value.connectionDistance
      
      if (distance < maxDistance) {
        connections++
        
        // Calculate opacity based on distance
        const opacity = Math.pow(1 - distance / maxDistance, 2) * 0.5
        
        // Draw line with gradient
        ctx!.beginPath()
        
        const gradient = ctx!.createLinearGradient(
          particle.x, particle.y, p2.x, p2.y
        )
        
        // Extract base colors for gradient
        const color1 = particle.color
        const color2 = p2.color
        
        gradient.addColorStop(0, color1)
        gradient.addColorStop(1, color2)
        
        ctx!.strokeStyle = gradient
        ctx!.lineWidth = Math.min(particle.size, p2.size) * 0.2
        ctx!.globalAlpha = opacity * particle.alpha * p2.alpha
        ctx!.moveTo(particle.x, particle.y)
        ctx!.lineTo(p2.x, p2.y)
        ctx!.stroke()
        ctx!.globalAlpha = 1
      }
    })

    // Draw particles with glow effect
    const drawGlow = (radius: number, alpha: number) => {
      ctx!.beginPath()
      ctx!.arc(particle.x, particle.y, radius, 0, Math.PI * 2)
      ctx!.fillStyle = particle.color
      ctx!.globalAlpha = alpha * particle.alpha
      ctx!.fill()
      ctx!.globalAlpha = 1
    }
    
    // Core particle
    drawGlow(particle.size * 0.7, 1)
    
    // Outer glow layers
    drawGlow(particle.size * 1.2, 0.4)
    drawGlow(particle.size * 2, 0.1)
  })

  // Request next frame
  animationFrame = requestAnimationFrame(drawParticles)
}

// Enhanced mouse interaction
const handleMouseMove = (e: MouseEvent) => {
  mouse.value = {
    x: e.clientX,
    y: e.clientY,
    active: true,
    radius: mouse.value.radius
  }
  
  // Keep active state longer for smoother effect
  clearTimeout(mouseTimeout)
  mouseTimeout = setTimeout(() => {
    mouse.value.active = false
  }, 300)
}

let mouseTimeout: number

// Handle mouse enter/leave for edge cases
const handleMouseEnter = () => {
  mouse.value.active = true
}

const handleMouseLeave = () => {
  mouse.value.active = false
}

onMounted(() => {
  initCanvas()
  initParticles()
  drawParticles()
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseenter', handleMouseEnter)
  window.addEventListener('mouseleave', handleMouseLeave)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrame)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseenter', handleMouseEnter)
  window.removeEventListener('mouseleave', handleMouseLeave)
  window.removeEventListener('resize', initCanvas)
  clearTimeout(mouseTimeout)
})
</script>