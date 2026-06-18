import { useState, useEffect } from 'react';
import { MdOutlineWaterDrop, MdNaturePeople, MdDomain, MdWaterfallChart, MdEngineering } from 'react-icons/md';

const domains = [
  {
    title: 'Hydraulique',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85',
    icon: <MdOutlineWaterDrop size={20} className="text-white" />,
    tags: ['AEP', 'Assainissement', 'Modélisation 1D/2D', 'Irrigation'],
    detail:
      "Étude et dimensionnement des réseaux d'eau potable, d'assainissement et d'irrigation. Modélisation hydraulique avancée pour la gestion des crues et la protection des ouvrages.",
  },
  {
    title: 'Environnement',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1400&q=85',
    icon: <MdNaturePeople size={20} className="text-white" />,
    tags: ["Étude d'impact", 'Faune & Flore', 'ICPE', "Loi sur l'Eau"],
    detail:
      "Évaluation rigoureuse des incidences environnementales : dossiers réglementaires, études de danger, notices d'impact et définition de mesures compensatoires conformes aux normes.",
  },
  {
    title: 'Aménagement',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=85',
    icon: <MdDomain size={20} className="text-white" />,
    tags: ['VRD', "Bassins d'orage", 'Topographie', 'Génie civil'],
    detail:
      "Intégration paysagère et dimensionnement des ouvrages de protection : digues, bassins de rétention, aménagements VRD. Conception respectueuse de la dynamique naturelle.",
  },
  {
    title: 'Ressources en Eau',
    image: 'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?auto=format&fit=crop&w=1400&q=85',
    icon: <MdWaterfallChart size={20} className="text-white" />,
    tags: ['Hydrogéologie', 'Captage AEP', "Qualité de l'eau", 'Forage'],
    detail:
      "Caractérisation et exploitation durable des ressources souterraines et superficielles. Études hydrogéologiques, conception des ouvrages de captage et diagnostics qualité.",
  },
  {
    title: 'Conseil & Ingénierie',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1400&q=85',
    icon: <MdEngineering size={20} className="text-white" />,
    tags: ['AMO', "Maîtrise d'œuvre", 'SIG', 'Formation'],
    detail:
      "Assistance à maîtrise d'ouvrage, pilotage de projets complexes et formation technique. Nous accompagnons les institutions avec une expertise multidisciplinaire de terrain.",
  },
];

export default function Expertise() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    const timers = domains.map((_, i) =>
      setTimeout(() => setVisible(prev => [...prev, i]), 120 * i)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % domains.length);
    }, 4000); // Change panel every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="expertise"
      className="relative flex flex-col border-t border-slate-200/70"
      style={{ height: '100svh', minHeight: '600px' }}
    >
      {/* ── Top Header Bar ──────────────────────────────────── */}
      <div className="flex items-end justify-between px-10 pt-10 pb-6 flex-shrink-0">
        {/* Eyebrow + Title */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-green-500" />
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-green-500">
              Nos Domaines
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-ink-950 leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            L'ingénierie au service de{' '}
            <span className="text-green-500">vos défis</span>
          </h2>
        </div>

        {/* Counter */}
        <p className="hidden md:block text-slate-400 text-sm text-right max-w-xs leading-relaxed">
          Cinq domaines complémentaires pour toutes les problématiques liées à l'eau et au territoire.
        </p>
      </div>

      {/* ── Panels ─────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0 px-10 pb-10 gap-0 overflow-hidden" style={{ borderRadius: '20px' }}>
        {domains.map((domain, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              style={{
                backgroundImage: `url('${domain.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: visible.includes(index) ? 1 : 0,
                transform: visible.includes(index) ? 'translateY(0)' : 'translateY(30px)',
                transition:
                  'flex 0.65s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease, transform 0.5s ease',
                flex: isActive ? '5 1 0%' : '1 1 0%',
                minWidth: '54px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                borderRadius: index === 0
                  ? '16px 0 0 16px'
                  : index === domains.length - 1
                  ? '0 16px 16px 0'
                  : '0',
                borderRight: index < domains.length - 1
                  ? '2px solid rgba(248,248,246,0.5)'
                  : 'none',
              }}
            >
              {/* Gradient overlay */}
              <div
                style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: isActive
                    ? 'linear-gradient(to top, rgba(2,44,34,0.90) 0%, rgba(6,78,59,0.45) 45%, transparent 70%)'
                    : 'linear-gradient(to top, rgba(2,44,34,0.65) 0%, rgba(2,20,15,0.4) 60%, transparent 100%)',
                  transition: 'background 0.6s ease',
                }}
              />

              {/* Collapsed: vertical title */}
              <div
                style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  pointerEvents: 'none',
                  opacity: isActive ? 0 : 1,
                  transition: 'opacity 0.3s ease',
                }}
              >
                <span
                  className="text-white font-semibold text-[11px] tracking-[0.25em] uppercase whitespace-nowrap"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    transform: 'rotate(180deg)',
                  }}
                >
                  {domain.title}
                </span>
              </div>

              {/* Collapsed: icon dot */}
              <div
                style={{
                  position: 'absolute', bottom: 20, left: 0, right: 0,
                  display: 'flex', justifyContent: 'center',
                  opacity: isActive ? 0 : 1,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none',
                }}
              >
                <div
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'rgba(16,185,129,0.22)',
                    border: '1.5px solid rgba(52,211,153,0.45)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {domain.icon}
                </div>
              </div>

              {/* Expanded: bottom content */}
              <div
                style={{
                  position: 'absolute', left: 0, right: 0, bottom: 0,
                  padding: '2rem 2.25rem',
                  pointerEvents: 'none',
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 0.45s ease 0.2s, transform 0.45s ease 0.2s',
                }}
              >
                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.1rem' }}>
                  {domain.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      style={{
                        padding: '4px 10px',
                        fontSize: '9px',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        borderRadius: 100,
                        background: 'rgba(16,185,129,0.18)',
                        border: '1px solid rgba(52,211,153,0.38)',
                        color: '#6ee7b7',
                        backdropFilter: 'blur(6px)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3
                  className="text-white font-bold leading-tight mb-3"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.4rem, 2vw, 2rem)',
                  }}
                >
                  {domain.title}
                </h3>
                <p className="text-green-100/80 text-sm leading-relaxed max-w-xs">
                  {domain.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
