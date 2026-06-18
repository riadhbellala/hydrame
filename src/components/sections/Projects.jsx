import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'

const categories = ['Tous', 'Hydraulique', 'Environnement', 'Infrastructure']

const projects = [
  {
    title: 'Aménagement Hydraulique Oued El Harrach',
    category: 'Hydraulique',
    metric: 'Capacité de crue: 1200 m³/s',
    desc: 'Étude de modélisation hydraulique 2D et dimensionnement des ouvrages de protection contre les inondations.',
    location: 'Alger',
  },
  {
    title: 'Z.I. Sidi Abdellah',
    category: 'Infrastructure',
    metric: 'Superficie étudiée: 45 Ha',
    desc: 'Maîtrise d\'œuvre pour l\'aménagement des réseaux humides (AEP, EU, EP) de la nouvelle zone industrielle.',
    location: 'Zéralda',
  },
  {
    title: 'Étude d\'Impact Barrage de transfert',
    category: 'Environnement',
    metric: 'Rétention: 15 Millions m³',
    desc: 'Évaluation environnementale complète, étude faune/flore et définition des mesures compensatoires.',
    location: 'Tizi Ouzou',
  },
  {
    title: 'Station d\'Épuration (STEP)',
    category: 'Environnement',
    metric: 'Capacité: 50 000 EH',
    desc: 'Étude d\'impact sur l\'environnement et dossier de demande d\'autorisation d\'exploitation.',
    location: 'Bouira',
  },
  {
    title: 'Réseau d\'Irrigation Périurbain',
    category: 'Hydraulique',
    metric: 'Linéaire: 18 km',
    desc: 'Conception d\'un réseau de distribution sous pression pour l\'irrigation agricole à partir de la réutilisation des eaux épurées.',
    location: 'Tipaza',
  },
]

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('Tous')

  const filtered = projects.filter(
    (p) => activeFilter === 'Tous' || p.category === activeFilter
  )

  return (
    <section id="projets" className="section-padding">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <ScrollReveal>
            <p className="eyebrow mb-5 text-green-500">Références</p>
            <h2
              className="text-4xl md:text-5xl font-bold text-ink-950"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Projets Récents
            </h2>
          </ScrollReveal>

          {/* Filters */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2 text-sm font-semibold transition-colors border ${
                    activeFilter === cat
                      ? 'bg-ink-950 text-white border-ink-950'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-ink-950 hover:text-ink-950'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group bg-white border border-slate-200 p-8 flex flex-col h-full hover:border-green-400 transition-colors"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <span className="text-xs font-bold tracking-widest uppercase text-green-600 bg-green-50 px-2 py-1 rounded">
                    {project.category}
                  </span>
                </div>
                
                <h3 
                  className="text-xl font-bold text-ink-950 mb-3 group-hover:text-green-600 transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {project.title}
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                  {project.desc}
                </p>

                <div className="pt-6 border-t border-slate-100 mt-auto">
                  <div className="text-sm font-semibold text-ink-900 mb-1">
                    {project.metric}
                  </div>
                  <div className="text-xs text-slate-400 uppercase tracking-widest">
                    {project.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
