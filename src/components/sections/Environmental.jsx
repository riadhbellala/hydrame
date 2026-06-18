import ScrollReveal from '../ui/ScrollReveal'
import AnimatedCounter from '../ui/AnimatedCounter'

const commitments = [
  {
    index: '01',
    title: 'Préservation des écosystèmes',
    desc: "Intégration systématique d'une analyse des milieux naturels. Proposition et mise en œuvre de mesures d'évitement, de réduction et de compensation.",
  },
  {
    index: '02',
    title: 'Gestion de la ressource',
    desc: "Promotion d'une utilisation raisonnée et cyclique de l'eau. Conception d'ouvrages minimisant les prélèvements et optimisant les rejets.",
  },
  {
    index: '03',
    title: 'Impact territorial',
    desc: "Contribution à des projets d'aménagement qui améliorent le cadre de vie des populations tout en respectant strictement les équilibres naturels locaux.",
  },
  {
    index: '04',
    title: 'Bilan carbone',
    desc: "Optimisation de nos déplacements, utilisation d'outils numériques avancés et conception de solutions techniques à faible empreinte carbone.",
  },
]

const impactStats = [
  { value: 35, suffix: ' km²', label: 'de zones humides analysées' },
  { value: 8, suffix: ' M m³', label: "d'eau économisée annuellement" },
  { value: 100, suffix: '%', label: 'des projets avec volet environnemental' },
]

export default function Environmental() {
  return (
    <section id="environnement" className="section-padding border-t border-slate-200/70">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-24">
          {/* Left: Title & Intro */}
          <div>
            <ScrollReveal>
              <p className="eyebrow mb-5 text-green-500">Notre démarche</p>
              <h2
                className="text-4xl md:text-5xl font-bold text-ink-950 leading-tight mb-8"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                La nature n'est pas une contrainte, c'est notre 
                <span className="block mt-2 text-green-500">partenaire d'ingénierie.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-slate-600 text-lg leading-relaxed mb-12">
                Chez HYDRAME, l'engagement environnemental est une conviction technique.
                Chacune de nos études est conçue pour minimiser l'impact sur les écosystèmes,
                non seulement pour répondre à la réglementation, mais pour contribuer à un
                développement d'infrastructure véritablement pérenne.
              </p>
            </ScrollReveal>

            {/* Stats Block */}
            <ScrollReveal delay={0.2}>
              <div 
                className="pt-8 border-t border-slate-200"
              >
                <div className="space-y-6">
                  {impactStats.map((s, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                      <div 
                        className="text-3xl font-bold text-ink-950 min-w-[140px]" 
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        <AnimatedCounter end={s.value} suffix={s.suffix} />
                      </div>
                      <div className="text-slate-500 uppercase tracking-widest text-xs font-semibold">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Commitments Grid (Text Only) */}
          <div className="grid sm:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
            {commitments.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="p-8 h-full bg-white transition-colors duration-300 hover:bg-slate-50">
                  <span
                    className="text-xs font-bold tracking-widest mb-4 block text-green-500"
                  >
                    {item.index}
                  </span>
                  <h4 
                    className="text-xl font-bold text-ink-950 mb-4"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
