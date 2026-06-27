import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Inbox, Mail, CheckCheck, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const STATUS_CONFIG = {
  unread: {
    label: 'Non lu',
    className: 'bg-green-100 text-green-700 border border-green-200',
  },
  read: {
    label: 'Lu',
    className: 'bg-blue-100 text-blue-700 border border-blue-200',
  },
  handled: {
    label: 'Traité',
    className: 'bg-slate-100 text-slate-500 border border-slate-200',
  },
};

function formatDateFr(dateString) {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function DemandCard({ demand, onUpdate, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const status = STATUS_CONFIG[demand.status] || STATUS_CONFIG.unread;

  return (
    <motion.div
      layout
      className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 flex flex-col gap-4"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="font-bold text-ink-900 text-base">{demand.full_name}</p>
          <p className="text-sm text-slate-500">{demand.email}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {demand.subject && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
              {demand.subject}
            </span>
          )}
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${status.className}`}>
            {status.label}
          </span>
        </div>
      </div>

      {/* Project details */}
      {demand.project_details && (
        <div>
          <p
            className={`text-sm text-slate-600 leading-relaxed ${!expanded ? 'line-clamp-3' : ''}`}
          >
            {demand.project_details}
          </p>
          {demand.project_details.length > 180 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1 flex items-center gap-1 text-xs font-semibold text-green-600 hover:text-green-700 transition-colors"
            >
              {expanded ? (
                <><ChevronUp className="w-3 h-3" /> Voir moins</>
              ) : (
                <><ChevronDown className="w-3 h-3" /> Voir plus</>
              )}
            </button>
          )}
        </div>
      )}

      {/* Bottom row */}
      <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-slate-100">
        <p className="text-xs text-slate-400 font-medium">{formatDateFr(demand.created_at)}</p>
        <div className="flex items-center gap-2">
          {demand.status !== 'read' && demand.status !== 'handled' && (
            <button
              onClick={() => onUpdate(demand.id, 'read')}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              Marquer comme lu
            </button>
          )}
          {demand.status !== 'handled' && (
            <button
              onClick={() => onUpdate(demand.id, 'handled')}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Marquer comme traité
            </button>
          )}
          <button
            onClick={() => onDelete(demand.id)}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Supprimer
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Demands() {
  const [demands, setDemands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDemands = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('demands')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDemands(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDemands();
  }, []);

  const handleUpdate = async (id, status) => {
    try {
      const { error } = await supabase
        .from('demands')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
      fetchDemands();
    } catch (err) {
      alert(`Erreur : ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) return;
    try {
      const { error } = await supabase.from('demands').delete().eq('id', id);
      if (error) throw error;
      fetchDemands();
    } catch (err) {
      alert(`Erreur : ${err.message}`);
    }
  };

  const total = demands.length;
  const unread = demands.filter((d) => !d.status || d.status === 'unread').length;
  const handled = demands.filter((d) => d.status === 'handled').length;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-4xl mx-auto w-full font-body">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-4xl font-bold text-ink-900">Demandes</h1>
      </div>

      {/* Summary bar */}
      {!isLoading && !error && demands.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-xl border border-white/60 shadow-sm text-sm font-semibold text-slate-600">
            <span>Total</span>
            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full text-xs font-bold">{total}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-xl border border-white/60 shadow-sm text-sm font-semibold text-slate-600">
            <span>Non lus</span>
            <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">{unread}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-xl border border-white/60 shadow-sm text-sm font-semibold text-slate-600">
            <span>Traités</span>
            <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">{handled}</span>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-xl text-red-600 text-sm">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-green-500" />
        </div>
      ) : demands.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <Inbox className="w-8 h-8 text-slate-300" />
          </div>
          <p className="text-lg font-medium text-ink-900">Aucune demande pour le moment</p>
          <p className="text-sm mt-1">Les demandes reçues via le formulaire de contact apparaîtront ici.</p>
        </div>
      ) : (
        <motion.div
          className="flex flex-col gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {demands.map((demand) => (
              <motion.div key={demand.id} variants={itemVariants}>
                <DemandCard
                  demand={demand}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
