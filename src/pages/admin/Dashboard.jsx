import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, Plus, Pencil, Trash2, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleTogglePublish = async (project) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ published: !project.published })
        .eq('id', project.id);

      if (error) throw error;
      fetchProjects();
    } catch (err) {
      alert(`Erreur lors de la mise à jour : ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible.')) {
      return;
    }
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchProjects();
    } catch (err) {
      alert(`Erreur lors de la suppression : ${err.message}`);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-6xl mx-auto w-full font-body">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-4xl font-bold text-ink-900">Projets</h1>
        <button 
          onClick={() => navigate('/admin/projects/new')}
          className="btn-primary py-2.5 px-5 rounded-xl text-sm shadow-md shadow-green-500/20"
        >
          <Plus className="w-4 h-4" />
          Nouveau projet
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-xl text-red-600 font-body text-sm">
          {error}
        </div>
      )}

      <div className="w-full flex flex-col min-h-[400px]">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-green-500" />
          </div>
        ) : projects.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 font-body py-20">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <ImageIcon className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-lg font-medium text-ink-900">Aucun projet trouvé</p>
            <p className="text-sm mt-1">Cliquez sur "Nouveau projet" pour créer votre première entrée.</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white/60 backdrop-blur-sm rounded-2xl border border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-body text-[0.7rem] uppercase tracking-wider bg-slate-50/50">
                  <th className="px-6 py-4 font-semibold rounded-tl-2xl">Image</th>
                  <th className="px-6 py-4 font-semibold">Titre</th>
                  <th className="px-6 py-4 font-semibold">Catégorie</th>
                  <th className="px-6 py-4 font-semibold">Mots-clés</th>
                  <th className="px-6 py-4 font-semibold">Statut</th>
                  <th className="px-6 py-4 font-semibold">Créé le</th>
                  <th className="px-6 py-4 font-semibold text-right rounded-tr-2xl">Actions</th>
                </tr>
              </thead>
              <motion.tbody 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="divide-y divide-slate-100 font-body text-sm text-ink-900"
              >
                {projects.map((project) => (
                  <motion.tr 
                    key={project.id} 
                    variants={itemVariants}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      {project.cover_image ? (
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
                          <img 
                            src={project.cover_image} 
                            alt={project.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400 shadow-sm">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-semibold text-ink-900">
                      {project.title}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {project.category || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(project.tags) && project.tags.length > 0 ? (
                          project.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="tag text-[0.65rem] py-0.5 px-2 bg-slate-100 border-slate-200 text-slate-600">
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                        {Array.isArray(project.tags) && project.tags.length > 2 && (
                          <span className="text-slate-400 text-xs font-medium">+{project.tags.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {project.published ? (
                        <span className="tag tag-green inline-flex items-center gap-1 shadow-sm">
                          Publié
                        </span>
                      ) : (
                        <span className="tag bg-slate-100 border-slate-200 text-slate-500 inline-flex items-center gap-1">
                          Brouillon
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs font-medium">
                      {new Date(project.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleTogglePublish(project)}
                          className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-100"
                          title={project.published ? "Dépublier" : "Publier"}
                        >
                          {project.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button 
                          onClick={() => navigate(`/admin/projects/edit/${project.id}`)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                          title="Modifier"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(project.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
