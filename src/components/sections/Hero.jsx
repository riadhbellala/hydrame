import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const containerRef = useRef(null)

  // Setup parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // The background image will move downwards slower than the scroll, creating a parallax storytelling effect
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  // Content slightly fades out on scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      id="accueil"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-ink-900"
    >
      {/* 1. Parallax Background Image */}
      <motion.div 
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ 
          y: backgroundY,
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Subtle dark gradient overlay at the bottom so the white text remains readable, top remains mostly clear for the logo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </motion.div>

      {/* 2. Bottom Left Text & Button */}
      <motion.div 
        style={{ opacity: contentOpacity }}
        className="absolute bottom-20 md:bottom-32 left-6 md:left-12 max-w-4xl z-10"
      >
        <h1 
          className="text-4xl md:text-6xl lg:text-[5.5rem] font-medium text-white leading-[1.05] tracking-tight mb-8"
        >
          L'ingénierie au service<br />de l'eau et de la nature
        </h1>
        <a 
          href="#expertise" 
          className="inline-block border border-white text-white px-8 py-3 text-sm font-medium hover:bg-white hover:text-ink-900 transition-colors"
        >
          Découvrir nos services
        </a>
      </motion.div>

    </section>
  )
}
