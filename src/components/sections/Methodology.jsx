import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const steps = [
  {
    index: '01',
    title: 'Analyse',
    desc: 'Collecte des données existantes — topographie, hydrologie, réglementation. Diagnostic rigoureux du site et identification des contraintes environnementales.',
  },
  {
    index: '02',
    title: 'Modélisation',
    desc: "Simulation numérique et dimensionnement. Nous utilisons les meilleurs logiciels du marché pour projeter les différents scénarios d'aménagement.",
  },
  {
    index: '03',
    title: 'Conception',
    desc: 'Élaboration des plans, notices techniques et dossiers réglementaires. Une conception optimisée, durable et parfaitement intégrée au milieu naturel.',
  },
  {
    index: '04',
    title: 'Supervision',
    desc: "Suivi rigoureux de l'exécution. Nous veillons au parfait respect des prescriptions techniques et environnementales sur le terrain.",
  },
]

const N = steps.length
// STEP = how many vw/vh between each panel centre
// 70 means next card starts 70vw right & 70vh down → small gap, next card just peeks in
const STEP = 70

// Track dimensions
const TRACK_W = 100 + (N - 1) * STEP  // e.g. 100 + 210 = 310 vw
const TRACK_H = 100 + (N - 1) * STEP  // e.g. 310 vh

// We translate from 0 → -(N-1)*STEP vw using % of track width
const END_PCT_X = (((N - 1) * STEP) / TRACK_W) * 100
const END_PCT_Y = (((N - 1) * STEP) / TRACK_H) * 100

export default function Methodology() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${END_PCT_X}%`])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `-${END_PCT_Y}%`])

  return (
    <section
      id="methodologie"
      ref={sectionRef}
      style={{
        position: 'relative',
        // Enough height so user scrolls ~90vh per step
        height: `${(N - 1) * 90 + 100}vh`,
        background: '#f8f8f6',
      }}
    >
      {/* ── Sticky viewport: explicit height + overflow:hidden clips the track ── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          background: '#f8f8f6',
        }}
      >
        {/* Label */}
        <div style={{
          position: 'absolute', top: 32, left: 40, zIndex: 50,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ width: 32, height: 2, background: '#22c55e' }} />
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#22c55e',
          }}>
            Notre Méthodologie
          </span>
        </div>

        {/* ── Diagonal track ── */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: `${TRACK_W}vw`,
            height: `${TRACK_H}vh`,
            x, y,
          }}
        >
          {steps.map((step, i) => (
            <div
              key={step.index}
              style={{
                position: 'absolute',
                left: `${i * STEP}vw`,
                top: `${i * STEP}vh`,
                width: '100vw',
                height: '100vh',
              }}
            >
              {/* Giant GREEN number – bottom left, like reference photos */}
              <div style={{
                position: 'absolute',
                bottom: 24, left: 32,
                pointerEvents: 'none', userSelect: 'none',
              }}>
                <span style={{
                  fontFamily: 'Urbanist, var(--font-heading)',
                  fontSize: 'clamp(7rem, 18vw, 20rem)',
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  // Green tint like the reference photos
                  color: 'rgba(16, 185, 129, 0.15)',
                  display: 'block',
                }}>
                  {step.index}
                </span>
              </div>

              {/* ── Layout: glass card LEFT-CENTER, text RIGHT ── */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '8vw',
                gap: '4vw',
              }}>
                {/* Glassmorphism Card */}
                <div style={{
                  flexShrink: 0,
                  width: 'min(38vw, 420px)',
                  aspectRatio: '1 / 1',
                  minWidth: 240,
                  // Glassmorphism effect as requested
                  background: 'rgba(255, 255, 255, 0.15)', // Increased transparency for deeper glass effect
                  backdropFilter: 'blur(24px)', // Stronger blur
                  WebkitBackdropFilter: 'blur(24px)',
                  borderRadius: 16,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.4)', // Softer edge
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2.5rem',
                  zIndex: 2,
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Soft green radial glow inside card */}
                  <div style={{
                    position: 'absolute',
                    top: '-20%', right: '-20%',
                    width: '60%', height: '60%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }} />

                  <span style={{
                    color: '#10b981', fontWeight: 700,
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    fontSize: 11, marginBottom: 20,
                    position: 'relative', zIndex: 1,
                  }}>
                    Étape {step.index}
                  </span>
                  <h3 style={{
                    fontFamily: 'Urbanist, var(--font-heading)',
                    fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                    fontWeight: 800,
                    color: '#0f172a',
                    textAlign: 'center',
                    lineHeight: 1.1,
                    margin: 0,
                    position: 'relative', zIndex: 1,
                  }}>
                    {step.title}
                  </h3>
                  <div style={{
                    width: 48, height: 3,
                    background: 'linear-gradient(90deg, #10b981, #34d399)',
                    borderRadius: 999, marginTop: 24,
                    position: 'relative', zIndex: 1,
                  }} />
                </div>

                {/* Description text – sits naturally to the RIGHT of the card */}
                <div style={{
                  flex: 1,
                  maxWidth: 360,
                  paddingRight: '2vw',
                }}>
                  <p style={{
                    color: '#64748b',
                    fontSize: 'clamp(0.95rem, 1.3vw, 1.2rem)',
                    lineHeight: 1.85,
                    margin: 0,
                  }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
