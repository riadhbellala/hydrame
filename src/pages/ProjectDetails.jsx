import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'

export default function ProjectDetails() {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f8f6]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-ink-950 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Projet introuvable</h1>
          <Link to="/" className="btn-primary px-6 py-3 rounded-full">
            <ArrowLeft className="w-5 h-5" /> Retourner à l'accueil
          </Link>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#f8f8f6] pt-32 pb-24"
    >
      <div className="container-custom">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-ink-950 transition-colors mb-12 font-medium">
          <ArrowLeft className="w-5 h-5" /> Retour
        </Link>

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-16 mb-16">
          <div className="w-full lg:w-1/2">
            <p className="eyebrow mb-4">{project.category}</p>
            <h1 className="text-5xl md:text-6xl font-black text-ink-950 leading-tight mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              {project.title}
            </h1>
            <p className="text-xl text-slate-600 font-medium max-w-2xl">
              {project.desc}
            </p>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-end">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Durée</p>
                <p className="text-xl font-bold text-ink-950">{project.duration}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Lieu</p>
                <p className="text-xl font-bold text-ink-950">{project.location}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Partenaire</p>
                <p className="text-lg font-bold text-ink-950 leading-tight">{project.collaboration}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Huge Hero Image */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-[2rem] overflow-hidden aspect-[16/9] md:aspect-[21/9] relative shadow-2xl mb-16"
        >
          <img 
            src={project.image} 
            alt={project.title} 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>

        {/* Content Section (Placeholder for further details) */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-ink-950 mb-6" style={{ fontFamily: 'var(--font-heading)' }}>À propos de ce projet</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            L'aménagement du projet {project.title} s'inscrit dans une démarche globale visant à optimiser les ressources et réduire l'impact environnemental. 
            Les études préliminaires ont permis de définir des solutions techniques adaptées aux contraintes spécifiques du site.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Notre équipe a collaboré étroitement avec {project.collaboration} tout au long des {project.duration} de développement pour garantir la réussite de chaque phase, de l'avant-projet jusqu'au dossier de consultation des entreprises.
          </p>
        </div>

      </div>
    </motion.div>
  )
}
