import { forwardRef } from 'react'
import { motion } from 'framer-motion'
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

/* ── Animation config ────────────────────────────────── */
const SPRING = {
  type: 'spring',
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
}

const blurVariants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: { opacity: 1, filter: 'blur(0px)' },
}

/* Bento grid area classes — asymmetric staggered layout */
const areaClasses = [
  'col-start-2 col-end-3 row-start-1 row-end-3',  // top-right
  'col-start-1 col-end-2 row-start-2 row-end-4',  // mid-left
  'col-start-1 col-end-2 row-start-4 row-end-6',  // bottom-left
  'col-start-2 col-end-3 row-start-3 row-end-5',  // mid-right
]

/* ── Stagger wrapper ─────────────────────────────────── */
const ContainerStagger = forwardRef(function ContainerStagger(
  { transition, children, className = '', style, ...rest },
  ref
) {
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        staggerChildren: 0.2,
        delayChildren: 0.15,
        duration: 0.3,
        ...transition,
      }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </motion.div>
  )
})

/* ── Animated child ──────────────────────────────────── */
const ContainerAnimated = forwardRef(function ContainerAnimated(
  { transition, children, className = '', style, ...rest },
  ref
) {
  return (
    <motion.div
      ref={ref}
      variants={blurVariants}
      transition={{ ...SPRING, duration: 0.3, ...transition }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </motion.div>
  )
})

/* ── Gallery grid cell ───────────────────────────────── */
function GalleryGridCell({ index, children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.18 }}
      className={`relative overflow-hidden rounded-2xl shadow-lg ${areaClasses[index]} ${className}`}
    >
      {children}
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════
   ENVIRONMENTAL / NOTRE DÉMARCHE SECTION
   ══════════════════════════════════════════════════════════ */
export default function Environmental() {
  return (
    <section id="environnement" className="section-padding bg-[#f8f8f6]">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-24">

          {/* ── Left column: Title, intro, stats ──────── */}
          <ContainerStagger>
            <ContainerAnimated>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-[2px] bg-green-500" />
                <span className="text-xs font-bold tracking-[0.22em] uppercase text-green-500">
                  Notre Démarche
                </span>
              </div>
            </ContainerAnimated>

            <ContainerAnimated>
              <h2
                className="text-4xl md:text-5xl font-bold text-ink-950 leading-tight mb-8"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                La nature n'est pas une contrainte, c'est notre{' '}
                <span className="block mt-2 text-green-500">partenaire d'ingénierie.</span>
              </h2>
            </ContainerAnimated>

            <ContainerAnimated>
              <p className="text-slate-600 text-lg leading-relaxed mb-12">
                Chez HYDRAME, l'engagement environnemental est une conviction technique.
                Chacune de nos études est conçue pour minimiser l'impact sur les écosystèmes,
                non seulement pour répondre à la réglementation, mais pour contribuer à un
                développement d'infrastructure véritablement pérenne.
              </p>
            </ContainerAnimated>

            <ContainerAnimated>
              <div className="pt-8 border-t border-slate-200">
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
            </ContainerAnimated>
          </ContainerStagger>

          {/* ── Right column: Bento gallery grid of cards ─ */}

          {/* Desktop — asymmetric bento grid */}
          <div
            className="hidden md:grid grid-cols-2 gap-4"
            style={{ gridTemplateRows: '50px 150px 50px 150px 50px' }}
          >
            {commitments.map((item, i) => (
              <GalleryGridCell key={item.index} index={i}>
                <div className="flex flex-col justify-between h-full p-7 bg-white border border-slate-200 rounded-2xl transition-all duration-300 hover:border-green-300 hover:shadow-xl group">
                  {/* Top: number */}
                  <span
                    className="text-xs font-bold tracking-widest text-green-500 mb-4"
                  >
                    {item.index}
                  </span>

                  {/* Middle: title + desc */}
                  <div className="flex-1">
                    <h4
                      className="text-lg font-bold text-ink-950 mb-3 leading-snug group-hover:text-green-700 transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom-right: decorative arrow */}
                  <div className="mt-4 flex justify-end">
                    <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-green-400 group-hover:bg-green-50 transition-all duration-300">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-green-600 transition-colors duration-300">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </div>
                  </div>
                </div>
              </GalleryGridCell>
            ))}
          </div>

          {/* Mobile — simple 2-col flat grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {commitments.map((item, i) => (
              <motion.div
                key={item.index}
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ ...SPRING, delay: i * 0.1 }}
                className="flex flex-col justify-between p-6 bg-white border border-slate-200 rounded-2xl transition-all duration-300 hover:border-green-300 hover:shadow-xl group"
              >
                <span className="text-xs font-bold tracking-widest text-green-500 mb-3">
                  {item.index}
                </span>
                <h4
                  className="text-lg font-bold text-ink-950 mb-3 leading-snug"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {item.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
