import ScrollReveal from '../ui/ScrollReveal'

const steps = [
  {
    index: '01',
    title: 'Analyse',
    desc: 'Collecte des données existantes — topographie, hydrologie, réglementation. Diagnostic rigoureux du site et identification des contraintes environnementales.',
  },
  {
    index: '02',
    title: 'Modélisation',
    desc: 'Simulation numérique et dimensionnement. Nous utilisons les meilleurs logiciels du marché pour projeter les différents scénarios d\'aménagement.',
  },
  {
    index: '03',
    title: 'Conception',
    desc: 'Élaboration des plans, notices techniques et dossiers réglementaires. Une conception optimisée, durable et parfaitement intégrée au milieu naturel.',
  },
  {
    index: '04',
    title: 'Supervision',
    desc: 'Suivi rigoureux de l\'exécution. Nous veillons au parfait respect des prescriptions techniques et environnementales sur le terrain.',
  },
]

export default function Methodology() {
  return (
    <section id="methodologie" className="section-padding border-t border-slate-200/70">
      <div className="container-custom">
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <ScrollReveal>
            <p className="eyebrow mb-5 text-green-500">Notre Méthodologie</p>
            <h2
              className="text-4xl md:text-5xl font-bold text-ink-950 mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Une approche par étapes
            </h2>
            <p className="text-slate-600">
              Chaque projet bénéficie d'un suivi strict et normé, garantissant 
              la fiabilité de nos études et la durabilité des ouvrages.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 relative">
          {/* Decorative connecting line for desktop */}
          <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-px bg-slate-200 z-0" />

          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="relative z-10 flex flex-col items-center text-center">
                
                {/* Number indicator */}
                <div className="w-14 h-14 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center mb-8 relative">
                  <span className="text-lg font-bold text-ink-950" style={{ fontFamily: 'var(--font-heading)' }}>
                    {step.index}
                  </span>
                  {/* Small accent dot */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
                </div>

                <h3 
                  className="text-xl font-bold text-ink-950 mb-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {step.title}
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
