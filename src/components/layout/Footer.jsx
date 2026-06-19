import { Mail } from 'lucide-react'
import { MdOutlineWaterDrop } from 'react-icons/md'
import { FaLinkedin } from 'react-icons/fa'

const navLinks = [
  { label: 'À propos', href: '/#apropos' },
  { label: 'Expertise', href: '/#expertise' },
  { label: 'Méthodologie', href: '/#methodologie' },
  { label: 'Projets', href: '/#projets' },
  { label: 'Contact', href: '/#contact' },
]

const socialLinks = [
  { icon: <FaLinkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
  { icon: <Mail className="w-5 h-5" />, href: 'mailto:contact@hydrame.com', label: 'Email' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <section 
      className="relative w-full overflow-hidden bg-[#f8f8f6] h-[100svh] min-h-[600px]"
      style={{
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
      }}
    >
      {/* Fixed footer revealed via clipPath */}
      <footer className="fixed bottom-0 left-0 w-full flex flex-col justify-end bg-[#f8f8f6] h-[100svh] min-h-[600px]">
        <div className="w-full max-w-7xl flex flex-col justify-between mx-auto flex-grow relative p-6 pt-24 pb-12">

          {/* ── Top content ─────────────────────────────── */}
          <div className="flex flex-col w-full flex-grow justify-center mt-20">
            <div className="w-full flex flex-col items-center">

              {/* Brand name */}
              <div className="space-y-3 flex flex-col items-center">
                <span
                  className="text-ink-950 text-3xl font-black tracking-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  HYDRAME
                </span>
                <p className="text-slate-500 font-medium text-center w-full max-w-sm sm:w-96 px-4 sm:px-0 text-sm leading-relaxed">
                  Bureau d'études techniques spécialisé en hydraulique, environnement et développement durable.
                </p>
              </div>

              {/* Social links */}
              <div className="flex mt-8 mb-10 gap-5">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-slate-400 hover:text-green-600 transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="w-6 h-6 hover:scale-110 duration-300">
                      {link.icon}
                    </div>
                    <span className="sr-only">{link.label}</span>
                  </a>
                ))}
              </div>

              {/* Nav links */}
              <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-slate-500 max-w-full px-4 mb-16">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    className="hover:text-ink-950 duration-300"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom bar ──────────────────────────────── */}
          <div className="flex flex-col gap-4 md:gap-1 items-center justify-center md:flex-row md:items-center md:justify-between px-4 md:px-0 relative z-20 mt-12">
            <p className="text-sm text-slate-400 text-center md:text-left">
              ©{currentYear} HYDRAME. Tous droits réservés.
            </p>
            <nav className="flex gap-5 text-sm text-slate-400">
              <a href="#" className="hover:text-ink-950 transition-colors duration-300">
                Mentions légales
              </a>
              <a href="#" className="hover:text-ink-950 transition-colors duration-300">
                Confidentialité
              </a>
            </nav>
          </div>
        </div>

        {/* ── Giant background text ────────────────────── */}
        <div
          className="bg-gradient-to-b from-green-500/20 via-green-600/10 to-transparent bg-clip-text text-transparent leading-none absolute left-1/2 -translate-x-1/2 bottom-[15vh] md:bottom-[10vh] font-black tracking-tighter pointer-events-none select-none text-center px-4"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(4rem, 18vw, 15rem)',
            maxWidth: '100vw',
          }}
        >
          HYDRAME
        </div>

        {/* ── Center logo badge ────────────────────────── */}
        <div className="absolute bottom-[20vh] md:bottom-[15vh] left-1/2 -translate-x-1/2 z-10">
          <div
            className="backdrop-blur-sm rounded-3xl bg-white/60 border-2 border-slate-200 hover:border-green-400 transition-colors duration-400 flex items-center justify-center p-3"
            style={{
              boxShadow: '0 0 30px rgba(16,185,129,0.12)',
            }}
          >
            <div className="w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 bg-gradient-to-br from-green-600 to-green-800 rounded-2xl flex items-center justify-center shadow-lg">
              <MdOutlineWaterDrop className="w-8 sm:w-10 md:w-14 h-8 sm:h-10 md:h-14 text-white drop-shadow-lg" />
            </div>
          </div>
        </div>

        {/* ── Decorative horizontal line ───────────────── */}
        <div className="absolute bottom-[25vh] md:bottom-[20vh] backdrop-blur-sm h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent w-full left-1/2 -translate-x-1/2" />

        {/* ── Bottom fade ──────────────────────────────── */}
        <div
          className="absolute bottom-0 w-full h-[25vh] pointer-events-none z-0"
          style={{
            background: 'linear-gradient(to top, #f8f8f6 0%, rgba(248,248,246,0.8) 40%, transparent 100%)',
          }}
        />
      </footer>
    </section>
  )
}
