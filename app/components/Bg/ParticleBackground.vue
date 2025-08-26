<template>
  <div class="fixed inset-0 -z-10">
    <canvas ref="canvasRef" class="w-full h-full"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
}

interface Mouse {
  x: number
  y: number
  active: boolean
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const particles = ref<Particle[]>([])
const mouse = ref<Mouse>({ x: 0, y: 0, active: false })
let animationFrame: number
let ctx: CanvasRenderingContext2D | null = null

// Tech-focused color palette
const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#06B6D4', '#F59E0B']
const bgColor = '#0F172A' // Darker blue for tech feel

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  ctx = canvas.getContext('2d')
  if (!ctx) return

  // Set canvas size to match window size with device pixel ratio for sharp rendering
  const updateSize = () => {
    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`
    
    if (ctx) {
      ctx.scale(dpr, dpr)
    }
  }
  
  updateSize()
  window.addEventListener('resize', updateSize)

  // Initialize particles - fewer for cleaner look
  const particleCount = 50
  for (let i = 0; i < particleCount; i++) {
    particles.value.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3, // Slower movement
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1, // Varied sizes
      color: colors[Math.floor(Math.random() * colors.length)]
    })
  }
}

const drawParticles = () => {
  if (!ctx || !canvasRef.value) return

  // Clear canvas
  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

  // Update and draw particles
  particles.value.forEach((particle, i) => {
    // Update position with slight drift for tech feel
    particle.x += particle.vx
    particle.y += particle.vy
    
    // Add slight drift to create a more dynamic feel
    particle.vx += (Math.random() - 0.5) * 0.01
    particle.vy += (Math.random() - 0.5) * 0.01
    
    // Limit velocity for stability
    particle.vx = Math.max(Math.min(particle.vx, 0.8), -0.8)
    particle.vy = Math.max(Math.min(particle.vy, 0.8), -0.8)

    // Wrap around edges
    if (particle.x < 0) particle.x = window.innerWidth
    if (particle.x > window.innerWidth) particle.x = 0
    if (particle.y < 0) particle.y = window.innerHeight
    if (particle.y > window.innerHeight) particle.y = 0

    // Mouse interaction - stronger effect and only when mouse is moving
    if (mouse.value.active) {
      const mx = mouse.value.x
      const my = mouse.value.y
      const mouseDistance = Math.sqrt(
        Math.pow(particle.x - mx, 2) + Math.pow(particle.y - my, 2)
      )

      if (mouseDistance < 150) {
        const force = (150 - mouseDistance) / 1000
        particle.vx += (particle.x - mx) * force
        particle.vy += (particle.y - my) * force
      }
    }

    // Draw connections - more modern with gradient
    particles.value.forEach((p2, j) => {
      if (i === j) return

      const dx = particle.x - p2.x
      const dy = particle.y - p2.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 120) { // Shorter connection distance for cleaner look
        // Calculate opacity based on distance
        const opacity = 1 - distance / 120
        
        // Draw line between particles
        ctx!.beginPath()
        
        // Create gradient for modern look
        const gradient = ctx!.createLinearGradient(
          particle.x, particle.y, p2.x, p2.y
        )
        gradient.addColorStop(0, particle.color.replace(')', `, ${opacity})`).replace('rgb', 'rgba'))
        gradient.addColorStop(1, p2.color.replace(')', `, ${opacity})`).replace('rgb', 'rgba'))
        
        ctx!.strokeStyle = gradient
        ctx!.lineWidth = 0.5 // Thinner lines for cleaner look
        ctx!.moveTo(particle.x, particle.y)
        ctx!.lineTo(p2.x, p2.y)
        ctx!.stroke()
      }
    })

    // Draw particle
    ctx!.beginPath()
    ctx!.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx!.fillStyle = particle.color
    ctx!.fill()
  })

  // Request next frame
  animationFrame = requestAnimationFrame(drawParticles)
}

// Track mouse movement and add active state
const handleMouseMove = (e: MouseEvent) => {
  mouse.value = {
    x: e.clientX,
    y: e.clientY,
    active: true
  }
  
  // Reset active state after short delay for better effect
  setTimeout(() => {
    mouse.value.active = false
  }, 100)
}

onMounted(() => {
  initCanvas()
  drawParticles()
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrame)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('resize', initCanvas)
})
</script>