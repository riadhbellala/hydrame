import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Intro({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true)

  // Prevent scrolling while intro is playing
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    
    // Start exit animation after 2.2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2200)
    
    return () => {
      document.body.style.overflow = ''
      clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          key="intro-overlay"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950"
        >
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 100, opacity: 0, letterSpacing: '0em' }}
              animate={{ y: 0, opacity: 1, letterSpacing: '0.15em' }}
              transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
              className="text-4xl md:text-7xl lg:text-[10rem] font-black text-white uppercase text-center"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              HYDRAME
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
