import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import { projects } from '../../data/projects'
import ScrollReveal from '../ui/ScrollReveal'

export default function Projects() {
  return (
    <section id="projets" className="bg-[#f8f8f6] py-32 rounded-[2.5rem] mt-12 mx-4 md:mx-8 mb-12 shadow-sm overflow-hidden border border-slate-200">
      <div className="container-custom">
        {/* Header */}
        <div className="flex justify-between items-end mb-24 border-b border-slate-200 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-green-500"></div>
              <p className="text-green-600 tracking-[0.2em] uppercase text-sm font-bold">Notre Travail</p>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-ink-950" style={{ fontFamily: 'var(--font-heading)' }}>
              Projets Récents
            </h2>
          </div>
        </div>

        {/* Projects List */}
        <div className="flex flex-col gap-32">
          {projects.map((project, index) => (
            <div key={project.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center`}>
              
              {/* Content */}
              <div className="w-full lg:w-[45%]">
                <ScrollReveal>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-ink-950 leading-[1.1] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    {project.title}
                  </h3>
                  <p className="text-green-600 font-bold uppercase tracking-[0.2em] text-sm mb-8">
                    {project.subtitle}
                  </p>
                  
                  <p className="text-lg text-slate-600 font-medium leading-relaxed mb-12 max-w-xl">
                    {project.desc}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-8 mb-12 border-t border-slate-200 pt-8">
                    {project.metrics.map((m, i) => (
                      <div key={i}>
                        <p className="text-xl md:text-2xl font-black text-ink-950 mb-2">
                          {m.label === 'RATED' ? (
                            <span className="flex items-center gap-1"><Star className="w-5 h-5 fill-green-500" /> 5.0</span>
                          ) : (
                            m.value
                          )}
                        </p>
                        <p className="text-xs text-slate-500 tracking-[0.1em] uppercase font-bold">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex flex-wrap gap-4">
                    <Link to={`/project/${project.id}`} className="inline-flex items-center justify-center px-8 py-4 bg-ink-950 text-white rounded-full font-bold transition-transform hover:scale-105">
                      Voir le projet <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                    <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-slate-300 text-ink-950 rounded-full font-bold transition-colors hover:border-ink-950">
                      Démarrer un projet <ArrowRight className="w-5 h-5 ml-2" />
                    </a>
                  </div>
                </ScrollReveal>
              </div>

              {/* Image */}
              <div className="w-full lg:w-[55%]">
                <ScrollReveal delay={0.2}>
                  <Link to={`/project/${project.id}`} className="block relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl group">
                    <div className="absolute inset-0 bg-ink-950/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                </ScrollReveal>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
