import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Loader2 } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import { supabase } from '../../lib/supabase'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })
        
        if (error) throw error
        setProjects(data || [])
      } catch (error) {
        console.error('Error fetching projects:', error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

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

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-green-500" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            Aucun projet publié pour le moment.
          </div>
        ) : (
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
                      {project.description}
                    </p>

                    {/* Metrics */}
                    {Array.isArray(project.stats || project.metrics) && (project.stats || project.metrics).length > 0 && (
                      <div className="grid grid-cols-3 gap-8 mb-12 border-t border-slate-200 pt-8">
                        {(project.stats || project.metrics).map((m, i) => (
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
                    )}

                    {/* CTA */}
                    <div className="flex flex-wrap gap-4">
                      <Link 
                        to={`/project/${project.id}`} 
                        className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
                        style={{
                          background: 'rgba(34, 197, 94, 0.2)',
                          backdropFilter: 'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)',
                          border: '1px solid rgba(34, 197, 94, 0.4)',
                          boxShadow: '0 8px 32px rgba(34, 197, 94, 0.15)',
                          color: '#15803d'
                        }}
                      >
                        Voir le projet <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                      <a 
                        href="#contact" 
                        className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
                        style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)',
                          border: '1px solid rgba(34, 197, 94, 0.3)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
                          color: '#16a34a'
                        }}
                      >
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
                        src={project.cover_image || 'https://picsum.photos/id/1015/1600/900'} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 bg-slate-100"
                      />
                    </Link>
                  </ScrollReveal>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
