import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Intro({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    document.body.style.overflow = 'hidden'
    
    // Total intro duration
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 4500)
    
    return () => {
      document.body.style.overflow = ''
      clearTimeout(timer)
    }
  }, [])

  if (!mounted) return null

  // We render the intro via a Portal directly to document.body 
  // to guarantee it sits above all other z-indexes (like the Navbar)
  return createPortal(
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          key="intro-overlay"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f8f8f6] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Main liquid fill sequence */}
          <div className="relative flex flex-col items-center justify-center w-full h-full">
            
            {/* The SVG Water Drop Outline & Fill */}
            <div className="relative w-24 h-32 md:w-32 md:h-40 mb-12">
              {/* Background Outline */}
              <svg 
                viewBox="0 0 24 24" 
                className="absolute inset-0 w-full h-full text-slate-200 stroke-current"
                fill="none" 
                strokeWidth="0.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
              </svg>

              {/* Masked Liquid Fill */}
              <div className="absolute inset-0 overflow-hidden" style={{
                clipPath: 'path("M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z")'
              }}>
                <motion.div 
                  className="absolute bottom-0 w-full bg-green-500"
                  initial={{ height: "0%" }}
                  animate={{ 
                    height: ["0%", "40%", "40%", "100%"],
                  }}
                  transition={{ 
                    duration: 2.5, 
                    times: [0, 0.4, 0.6, 1],
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
                {/* Subtle wave effect on top of the liquid */}
                <motion.div 
                  className="absolute w-[200%] h-4 bg-white/30 rounded-[50%]"
                  initial={{ y: 0, x: "-50%", opacity: 0 }}
                  animate={{ 
                    y: [-10, 5, -10], 
                    x: ["-50%", "0%"],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ bottom: "50%" }}
                />
              </div>
            </div>

            {/* Premium Typography Reveal */}
            <div className="overflow-hidden h-16 md:h-24 flex items-center justify-center">
              <motion.div
                className="flex gap-1 md:gap-2"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 1.5,
                    }
                  }
                }}
              >
                {Array.from("HYDRAME").map((letter, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { y: "100%", opacity: 0 },
                      visible: { y: 0, opacity: 1 }
                    }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl md:text-5xl font-black text-ink-950 tracking-widest uppercase"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>
            </div>
            
            {/* Tagline fade in */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.5 }}
              className="mt-6 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-slate-400"
            >
              Ingénierie & Écosystèmes
            </motion.p>
          </div>

          {/* Sweeping Exit Wave */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: [0, 0, 1] }}
            transition={{ duration: 4.5, times: [0, 0.85, 1], ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-green-500 origin-bottom z-10"
          />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
