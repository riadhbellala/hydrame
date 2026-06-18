import { ArrowUpRight } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="pt-24 pb-8" style={{ background: 'var(--color-ink-950)' }}>
      <div className="container-custom">
        {/* Top grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          
          <div className="lg:col-span-2">
            <h4 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              HYDRAME
            </h4>
            <p className="text-slate-400 max-w-sm leading-relaxed text-sm">
              Bureau d'études techniques spécialisé en hydraulique, environnement et 
              développement durable. L'ingénierie au service des écosystèmes.
            </p>
          </div>

          <div>
            <div className="text-slate-500 text-xs uppercase tracking-[0.2em] mb-6">Expertises</div>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><a href="#expertise" className="hover:text-green-400 transition-colors">Hydraulique</a></li>
              <li><a href="#expertise" className="hover:text-green-400 transition-colors">Ressources en eau</a></li>
              <li><a href="#expertise" className="hover:text-green-400 transition-colors">Études environnementales</a></li>
              <li><a href="#expertise" className="hover:text-green-400 transition-colors">Aménagement</a></li>
            </ul>
          </div>

          <div>
            <div className="text-slate-500 text-xs uppercase tracking-[0.2em] mb-6">Entreprise</div>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><a href="#apropos" className="hover:text-green-400 transition-colors">À propos</a></li>
              <li><a href="#methodologie" className="hover:text-green-400 transition-colors">Méthodologie</a></li>
              <li><a href="#projets" className="hover:text-green-400 transition-colors">Références</a></li>
              <li><a href="#contact" className="hover:text-green-400 transition-colors flex items-center gap-1">Contact <ArrowUpRight size={14} /></a></li>
            </ul>
          </div>
        </div>

        {/* Huge bottom text watermark */}
        <div 
          className="w-full font-black text-center select-none overflow-hidden"
          style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(3rem, 15vw, 16rem)',
            lineHeight: 0.8,
            color: 'rgba(255,255,255,0.03)',
            transform: 'translateY(10%)'
          }}
        >
          HYDRAME
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-slate-500 text-xs">
            © {currentYear} HYDRAME. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
