import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLocation, Link } from 'react-router-dom'

const navLinks = [
  { name: 'À propos', href: '/#apropos' },
  { name: 'Expertise', href: '/#expertise' },
  { name: 'Méthodologie', href: '/#methodologie' },
  { name: 'Projets', href: '/#projets' },
  { name: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()
  
  const isHome = location.pathname === '/'

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Listen to scroll to adjust navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    // Always trigger scroll check on mount
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Determine appearance based on route and scroll state
  // On non-home pages, always act as scrolled to prevent huge overlap
  const effectivelyScrolled = scrolled || !isHome

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 pointer-events-none ${
          effectivelyScrolled 
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-4 px-6 md:px-12' 
            : 'pt-6 px-6 md:px-12 bg-transparent'
        }`}
      >
        <div className={`w-full flex ${effectivelyScrolled ? 'flex-row items-center justify-between' : 'flex-col'} pointer-events-auto`}>
          
          <Link to="/" className="block">
            <motion.div 
              initial={{ opacity: typeof window !== 'undefined' && !window.hasPlayedIntro ? 0 : 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: typeof window !== 'undefined' && !window.hasPlayedIntro ? 4.5 : 0 }}
              className={`font-black leading-none tracking-tighter uppercase select-none transition-all duration-700`}
              style={{ 
                color: effectivelyScrolled ? '#10b981' : 'white', // text-green-500 or white
                fontFamily: 'var(--font-heading)', 
                fontSize: effectivelyScrolled ? '2rem' : (isMobile ? '4.5rem' : 'clamp(4rem, 16vw, 18rem)'),
                textAlign: effectivelyScrolled ? 'left' : 'center',
                width: effectivelyScrolled ? 'auto' : '100%',
                marginBottom: effectivelyScrolled ? '0' : '1.5rem',
                // Center vertically in Hero section on mobile when not scrolled
                transform: (!effectivelyScrolled && isMobile) ? 'translateY(35vh)' : 'translateY(0)'
              }}
            >
              HYDRAME
            </motion.div>
          </Link>

          {/* Desktop Links */}
          <div 
            className={`hidden md:flex justify-end gap-10 text-sm font-bold tracking-wide transition-all duration-700 ${
              effectivelyScrolled ? 'w-auto text-ink-900' : 'w-full text-white'
            }`}
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="hover:text-green-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className={`md:hidden flex justify-end ${effectivelyScrolled ? 'w-auto' : 'w-full'}`}>
            <button
              onClick={() => setIsOpen(true)}
              className={`${effectivelyScrolled ? 'text-ink-950' : 'text-white'} hover:text-green-500 transition-colors`}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[#f8f8f6]/95 backdrop-blur-md flex flex-col p-6"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="text-ink-950 hover:text-green-500 transition-colors p-2"
              >
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-black text-ink-950 tracking-wide uppercase hover:text-green-500"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
