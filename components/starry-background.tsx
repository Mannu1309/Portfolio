"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  twinklePhase: number
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  opacity: number
  life: number
  maxLife: number
}

interface AuroraWave {
  points: { x: number; y: number; baseY: number; amplitude: number; frequency: number; phase: number }[]
  color: string
  opacity: number
  speed: number
}

export function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const shootingStarsRef = useRef<ShootingStar[]>([])
  const auroraWavesRef = useRef<AuroraWave[]>([])
  const animationFrameRef = useRef<number>()
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createStars = () => {
      const stars: Star[] = []
      const numStars = Math.floor((canvas.width * canvas.height) / 8000) // More stars for black background

      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.7, // Keep stars in upper 70% of screen
          size: Math.random() * 1.2 + 0.3,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
        })
      }

      starsRef.current = stars
    }

    const createAuroraWaves = () => {
      const waves: AuroraWave[] = []
      const colors = [
        "rgba(0, 255, 150, 0.3)", // Green
        "rgba(100, 200, 255, 0.25)", // Blue
        "rgba(255, 100, 200, 0.2)", // Pink
        "rgba(150, 255, 100, 0.25)", // Light green
        "rgba(200, 150, 255, 0.2)", // Purple
      ]

      for (let i = 0; i < 5; i++) {
        const points = []
        const baseY = canvas.height * 0.2 + i * 40

        for (let x = 0; x <= canvas.width + 100; x += 20) {
          points.push({
            x,
            y: baseY,
            baseY,
            amplitude: Math.random() * 60 + 30,
            frequency: Math.random() * 0.02 + 0.01,
            phase: Math.random() * Math.PI * 2,
          })
        }

        waves.push({
          points,
          color: colors[i % colors.length],
          opacity: Math.random() * 0.4 + 0.2,
          speed: Math.random() * 0.005 + 0.002,
        })
      }

      auroraWavesRef.current = waves
    }

    const createShootingStar = () => {
      const baseAngle = Math.PI / 4 // 45 degrees
      const angleVariation = Math.PI / 20 // Smaller variation for more consistent direction

      const shootingStar: ShootingStar = {
        x: Math.random() < 0.7 ? Math.random() * canvas.width : canvas.width + 150,
        y: Math.random() < 0.7 ? -150 : Math.random() * canvas.height * 0.3, // Keep in upper space area
        length: Math.random() * 300 + 200, // Much longer tails
        speed: Math.random() * 6 + 4, // Slightly slower for elegance
        angle: baseAngle + (Math.random() - 0.5) * angleVariation,
        opacity: 1,
        life: 0,
        maxLife: Math.random() * 150 + 120, // Longer lasting
      }

      shootingStarsRef.current.push(shootingStar)
    }

    const drawStars = () => {
      starsRef.current.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed
        const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7

        ctx.save()
        ctx.globalAlpha = star.opacity * twinkle

        // Simple white stars
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 1.5)
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
        gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.4)")
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        // Add subtle sparkle for larger stars
        if (star.size > 1.0) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity * twinkle * 0.5})`
          ctx.lineWidth = 0.3
          ctx.beginPath()
          ctx.moveTo(star.x - star.size * 1.2, star.y)
          ctx.lineTo(star.x + star.size * 1.2, star.y)
          ctx.moveTo(star.x, star.y - star.size * 1.2)
          ctx.lineTo(star.x, star.y + star.size * 1.2)
          ctx.stroke()
        }

        ctx.restore()
      })
    }

    const drawAurora = () => {
      timeRef.current += 0.01

      auroraWavesRef.current.forEach((wave) => {
        // Update wave points
        wave.points.forEach((point) => {
          point.phase += wave.speed
          point.y = point.baseY + Math.sin(point.phase + timeRef.current * point.frequency) * point.amplitude
        })

        ctx.save()
        ctx.globalAlpha = wave.opacity * (0.8 + Math.sin(timeRef.current * 2) * 0.2)

        // Create gradient for aurora effect
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.6)
        gradient.addColorStop(0, wave.color)
        gradient.addColorStop(0.5, wave.color.replace(/0\.\d+\)/, "0.1)"))
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = gradient

        // Draw smooth aurora wave
        ctx.beginPath()
        ctx.moveTo(wave.points[0].x, wave.points[0].y)

        for (let i = 1; i < wave.points.length - 2; i++) {
          const xc = (wave.points[i].x + wave.points[i + 1].x) / 2
          const yc = (wave.points[i].y + wave.points[i + 1].y) / 2
          ctx.quadraticCurveTo(wave.points[i].x, wave.points[i].y, xc, yc)
        }

        // Complete the shape
        ctx.lineTo(canvas.width, canvas.height * 0.6)
        ctx.lineTo(0, canvas.height * 0.6)
        ctx.closePath()
        ctx.fill()

        // Add subtle glow effect
        ctx.globalAlpha = wave.opacity * 0.3
        ctx.strokeStyle = wave.color.replace(/0\.\d+\)/, "0.6)")
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(wave.points[0].x, wave.points[0].y)

        for (let i = 1; i < wave.points.length - 2; i++) {
          const xc = (wave.points[i].x + wave.points[i + 1].x) / 2
          const yc = (wave.points[i].y + wave.points[i + 1].y) / 2
          ctx.quadraticCurveTo(wave.points[i].x, wave.points[i].y, xc, yc)
        }
        ctx.stroke()

        ctx.restore()
      })
    }

    const drawShootingStars = () => {
      shootingStarsRef.current.forEach((shootingStar, index) => {
        shootingStar.life++
        shootingStar.x -= Math.cos(shootingStar.angle) * shootingStar.speed
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed

        const fadeProgress = shootingStar.life / shootingStar.maxLife
        shootingStar.opacity = Math.max(0, 1 - Math.pow(fadeProgress, 2))

        if (
          shootingStar.life >= shootingStar.maxLife ||
          shootingStar.x < -400 ||
          shootingStar.y > canvas.height + 400
        ) {
          shootingStarsRef.current.splice(index, 1)
          return
        }

        ctx.save()
        ctx.globalAlpha = shootingStar.opacity

        // Calculate trail end point
        const trailEndX = shootingStar.x + Math.cos(shootingStar.angle) * shootingStar.length
        const trailEndY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length

        // Create thin, elegant gradient trail
        const gradient = ctx.createLinearGradient(shootingStar.x, shootingStar.y, trailEndX, trailEndY)
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
        gradient.addColorStop(0.1, "rgba(255, 250, 240, 0.9)")
        gradient.addColorStop(0.3, "rgba(240, 240, 255, 0.7)")
        gradient.addColorStop(0.6, "rgba(200, 220, 255, 0.4)")
        gradient.addColorStop(0.8, "rgba(180, 200, 255, 0.2)")
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        // Draw main thin trail
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.5 // Much thinner
        ctx.lineCap = "round"

        ctx.beginPath()
        ctx.moveTo(shootingStar.x, shootingStar.y)
        ctx.lineTo(trailEndX, trailEndY)
        ctx.stroke()

        // Add subtle secondary trail for depth
        ctx.globalAlpha = shootingStar.opacity * 0.5
        ctx.lineWidth = 0.8
        ctx.beginPath()
        ctx.moveTo(shootingStar.x, shootingStar.y)
        ctx.lineTo(trailEndX, trailEndY)
        ctx.stroke()

        // Draw small, bright head
        ctx.globalAlpha = shootingStar.opacity
        const headGradient = ctx.createRadialGradient(
          shootingStar.x,
          shootingStar.y,
          0,
          shootingStar.x,
          shootingStar.y,
          3,
        )
        headGradient.addColorStop(0, "rgba(255, 255, 255, 1)")
        headGradient.addColorStop(0.5, "rgba(255, 255, 240, 0.8)")
        headGradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.fillStyle = headGradient
        ctx.beginPath()
        ctx.arc(shootingStar.x, shootingStar.y, 1.5, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      })
    }

    const animate = () => {
      // Clear with pure black background
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawAurora()
      drawStars()
      drawShootingStars()

      // Reduced shooting star frequency for elegance
      if (Math.random() < 0.008) {
        createShootingStar()
      }

      // Rare meteor shower bursts
      if (Math.random() < 0.0005) {
        for (let i = 0; i < 2 + Math.floor(Math.random() * 3); i++) {
          setTimeout(() => createShootingStar(), i * 200)
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      resizeCanvas()
      createStars()
      createAuroraWaves()
    }

    // Initialize
    resizeCanvas()
    createStars()
    createAuroraWaves()
    animate()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      {/* Black space background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />
    </div>
  )
}
