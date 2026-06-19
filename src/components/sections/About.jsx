import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import AnimatedCounter from '../ui/AnimatedCounter'

const services = [
  {
    num: '1',
    title: 'Excellence Technique',
    desc: 'Une rigueur scientifique adossée à des outils de modélisation de dernière génération.',
  },
  {
    num: '2',
    title: 'Intégrité des Données',
    desc: 'Des recommandations basées exclusivement sur des données mesurées et validées.',
  },
  {
    num: '3',
    title: 'Engagement Durable',
    desc: 'Une vision long-terme pour préserver les écosystèmes et les générations futures.',
  },
]

const stats = [
  { value: 120, suffix: '+', label: 'Projets réalisés' },
  { value: 15, suffix: '', label: "Ans d'expérience" },
  { value: 8, suffix: '', label: 'Régions couvertes' },
]

export default function About() {
  const containerRef = useRef(null)
  
  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Different speeds for the staggered cards
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80])
  const y2 = useTransform(scrollYProgress, [0, 1], [120, -120])
  const y3 = useTransform(scrollYProgress, [0, 1], [160, -160])
  const cardY = [y1, y2, y3]

  // Spin the decorative background circle
  const rotateCircle = useTransform(scrollYProgress, [0, 1], [0, 180])

  return (
    <section
      id="apropos"
      ref={containerRef}
      className="relative section-padding overflow-hidden bg-[#f8f8f6] z-20 -mt-8 md:-mt-20 rounded-t-[40px] md:rounded-t-[80px]"
      style={{ boxShadow: '0 -20px 40px rgba(0,0,0,0.1)' }}
    >
      {/* Decorative Background Elements (Left) */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full z-0"
        style={{ 
          background: 'linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%)',
          filter: 'blur(40px)',
          opacity: 0.6
        }}
      />
      
      {/* Decorative Background Elements (Right) - Rotating Ring */}
      <motion.div 
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] rounded-full border border-green-200 z-0 pointer-events-none"
        style={{ rotate: rotateCircle }}
      >
        {/* Orbiting Dots */}
        <div className="absolute top-[15%] left-[10%] w-6 h-6 rounded-full bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.5)]" />
        <div className="absolute top-[50%] -left-12 w-24 h-24 rounded-full bg-green-600 shadow-[0_20px_40px_rgba(22,163,74,0.3)]" />
        <div className="absolute bottom-[20%] left-[15%] w-4 h-4 rounded-full bg-green-300" />
      </motion.div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Staggered Parallax Cards */}
          <div className="relative py-20 flex flex-col gap-8 md:gap-12">
            {services.map((item, i) => (
              <motion.div
                key={i}
                style={{ y: cardY[i] }}
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`relative bg-white rounded-2xl p-8 max-w-sm w-full transition-shadow duration-300 hover:shadow-[0_30px_60px_rgba(22,163,74,0.12)] shadow-[0_20px_40px_rgba(0,0,0,0.06)] ${
                  i === 1 ? 'md:ml-24' : i === 2 ? 'md:ml-12' : ''
                }`}
              >
                {/* Background Watermark Number with slight parallax */}
                <motion.div 
                  className="absolute -top-8 -left-8 text-[9rem] font-black leading-none select-none pointer-events-none z-0"
                  style={{ color: '#f8fafc', fontFamily: 'var(--font-heading)' }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: i * 0.2 + 0.3 }}
                >
                  {item.num}
                </motion.div>
                
                <div className="relative z-10">
                  <h4 className="text-xl font-bold text-ink-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                    {item.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side: Text Content with Staggered Fade Up */}
          <div className="lg:pl-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  className="h-px bg-green-500" 
                />
                <span className="text-sm font-bold tracking-widest uppercase text-green-500">
                  Qui sommes-nous
                </span>
              </div>
              
              <h2
                className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-ink-950 leading-tight mb-8"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                L'expertise de pointe<br/>
                <span className="text-green-500">pour vos projets</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            >
              <p className="text-slate-600 text-lg leading-relaxed mb-16 max-w-lg">
                Fondé par des ingénieurs passionnés, HYDRAME est un bureau d'études 
                dédié à la maîtrise de l'eau et à la préservation de l'environnement. 
                Nous accompagnons nos clients à chaque étape de leurs projets avec 
                une exigence absolue.
              </p>
            </motion.div>

            {/* Stats Row with Animated Counters */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex flex-wrap gap-12 md:gap-20"
            >
              {stats.map((s, i) => (
                <div key={i}>
                  <div 
                    className="text-4xl md:text-5xl font-bold text-ink-950 mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    <AnimatedCounter end={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-sm text-slate-500 font-medium">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
