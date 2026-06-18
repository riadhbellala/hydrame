import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'À propos', href: '#apropos' },
  { name: 'Expertise', href: '#expertise' },
  { name: 'Méthodologie', href: '#methodologie' },
  { name: 'Projets', href: '#projets' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Listen to scroll to adjust navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 pointer-events-none ${
          scrolled ? 'bg-ink-900/95 backdrop-blur-md border-b border-white/10 py-4 px-6 md:px-12' : 'pt-6 px-6 md:px-12 bg-transparent'
        }`}
      >
        <div className={`w-full flex ${scrolled ? 'flex-row items-center justify-between' : 'flex-col'} pointer-events-auto`}>
          
          {/* Logo */}
          <div 
            className="font-black text-white leading-none tracking-tighter uppercase select-none transition-all duration-700"
            style={{ 
              fontFamily: 'var(--font-heading)', 
              // When not scrolled, it's massive and full width. When scrolled, it's normal size.
              fontSize: scrolled ? '2rem' : 'clamp(4rem, 16vw, 18rem)',
              textAlign: scrolled ? 'left' : 'center',
              width: scrolled ? 'auto' : '100%',
              marginBottom: scrolled ? '0' : '1.5rem',
            }}
          >
            HYDRAME
          </div>

          {/* Desktop Links */}
          <div 
            className={`hidden md:flex justify-end gap-10 text-sm font-medium text-white tracking-wide transition-all duration-700 ${
              scrolled ? 'w-auto' : 'w-full'
            }`}
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="hover:opacity-70 transition-opacity"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className={`md:hidden flex justify-end ${scrolled ? 'w-auto' : 'w-full'}`}>
            <button
              onClick={() => setIsOpen(true)}
              className="text-white hover:opacity-70 transition-opacity"
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
            className="fixed inset-0 z-[60] bg-ink-900/95 backdrop-blur-md flex flex-col p-6"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:opacity-70 transition-opacity p-2"
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
                  className="text-2xl font-medium text-white tracking-wide uppercase"
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
