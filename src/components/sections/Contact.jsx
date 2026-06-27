import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'
import { supabase } from '../../lib/supabase'

export default function Contact() {
  const [form, setForm] = useState({ nom: '', email: '', sujet: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const { error: dbError } = await supabase.from('demands').insert({
        full_name: form.nom,
        email: form.email,
        subject: form.sujet,
        project_details: form.message
      })

      if (dbError) throw dbError;

      setSubmitted(true)
      setForm({ nom: '', email: '', sujet: '', message: '' })
    } catch (err) {
      console.error(err)
      setError("Une erreur est survenue, veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-20">
          
          {/* Left: Huge Title & Info */}
          <div>
            <ScrollReveal>
              <h2
                className="text-5xl md:text-7xl font-bold text-ink-950 leading-[1.1] mb-12"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Démarrons
                <br />
                <span className="text-green-500">votre projet</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-slate-600 text-lg mb-16 max-w-md leading-relaxed">
                Partagez-nous les détails de votre projet. Un ingénieur spécialisé vous 
                contactera sous 48 heures pour une première consultation technique.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-col gap-10">
                <div>
                  <div className="text-slate-400 text-xs uppercase tracking-[0.2em] mb-3">Siège social</div>
                  <div className="text-ink-950 font-medium text-lg">12 Rue des Ingénieurs<br/>Alger — Algérie</div>
                </div>
                
                <div className="flex gap-16">
                  <div>
                    <div className="text-slate-400 text-xs uppercase tracking-[0.2em] mb-3">Contact</div>
                    <div className="text-ink-950 font-medium text-lg">contact@hydrame.com</div>
                    <div className="text-ink-950 font-medium text-lg mt-1">+213 (0) 21 XX XX XX</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs uppercase tracking-[0.2em] mb-3">Horaires</div>
                    <div className="text-ink-950 font-medium text-lg">Dim — Jeu</div>
                    <div className="text-ink-950 font-medium text-lg mt-1">8h00 — 17h00</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Minimalist Form */}
          <div>
            <ScrollReveal delay={0.1}>
              <div className="p-8 md:p-12 bg-white border border-slate-200">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-20 text-center"
                  >
                    <h3 className="text-3xl font-bold text-ink-950 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                      Demande envoyée
                    </h3>
                    <p className="text-slate-600 mb-8">
                      Votre demande a été envoyée avec succès !
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-sm font-semibold tracking-wider uppercase text-ink-950 hover:text-green-500 transition-colors"
                      style={{ borderBottom: '1px solid currentColor', paddingBottom: '4px' }}
                    >
                      Nouveau message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    
                    {error && (
                      <div className="p-4 bg-red-100 border border-red-200 rounded-xl text-red-600 text-sm">
                        {error}
                      </div>
                    )}

                    {/* Inputs with underline only */}
                    <div className="relative">
                      <input
                        type="text"
                        name="nom"
                        id="nom"
                        value={form.nom}
                        onChange={handleChange}
                        required
                        className="peer w-full bg-transparent text-ink-950 pt-4 pb-2 text-lg outline-none border-b border-slate-300 focus:border-green-500 transition-colors placeholder-transparent"
                        placeholder="Nom complet"
                      />
                      <label 
                        htmlFor="nom" 
                        className="absolute left-0 top-0 text-slate-500 text-sm transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-sm peer-focus:text-green-500"
                      >
                        Nom complet
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="peer w-full bg-transparent text-ink-950 pt-4 pb-2 text-lg outline-none border-b border-slate-300 focus:border-green-500 transition-colors placeholder-transparent"
                        placeholder="Adresse email"
                      />
                      <label 
                        htmlFor="email" 
                        className="absolute left-0 top-0 text-slate-500 text-sm transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-sm peer-focus:text-green-500"
                      >
                        Adresse email
                      </label>
                    </div>

                    <div className="relative">
                      <select
                        name="sujet"
                        id="sujet"
                        value={form.sujet}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent text-ink-950 pt-4 pb-2 text-lg outline-none border-b border-slate-300 focus:border-green-500 transition-colors appearance-none cursor-pointer"
                        style={{ color: form.sujet ? 'var(--color-ink-950)' : 'var(--color-slate-500)' }}
                      >
                        <option value="" disabled>Sujet de la demande</option>
                        <option value="hydraulique">Étude hydraulique</option>
                        <option value="environnement">Étude environnementale</option>
                        <option value="infrastructure">Aménagement & infrastructures</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>

                    <div className="relative mt-4">
                      <textarea
                        name="message"
                        id="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="peer w-full bg-transparent text-ink-950 pt-4 pb-2 text-lg outline-none border-b border-slate-300 focus:border-green-500 transition-colors placeholder-transparent resize-none"
                        placeholder="Détails du projet"
                      />
                      <label 
                        htmlFor="message" 
                        className="absolute left-0 top-0 text-slate-500 text-sm transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-sm peer-focus:text-green-500"
                      >
                        Détails du projet
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-6 self-start group flex items-center gap-4 text-ink-950 hover:text-green-500 transition-colors disabled:opacity-50"
                    >
                      <span className="text-sm font-bold tracking-widest uppercase">
                        {loading ? 'Envoi...' : 'Envoyer la demande'}
                      </span>
                      <div className="w-12 h-px bg-ink-950 group-hover:bg-green-500 transition-colors" />
                    </button>

                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  )
}
