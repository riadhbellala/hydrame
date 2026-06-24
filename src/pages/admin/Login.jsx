import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data) {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f6] flex items-center justify-center relative overflow-hidden px-4 font-body">
      {/* Decorative blurred radial orbs behind the glass card for contrast */}
      <div className="absolute top-1/2 left-1/2 -translate-x-[80%] -translate-y-[80%] w-[400px] h-[400px] bg-green-300 rounded-full opacity-40 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 translate-x-[20%] translate-y-[20%] w-[400px] h-[400px] bg-blue-300 rounded-full opacity-30 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md z-10"
      >
        <div className="glass-card p-10 flex flex-col items-center border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          <h1 className="font-heading text-4xl font-bold text-ink-900 mb-2 text-center">
            HYDRA<span className="text-green-600">ME</span>
          </h1>
          <p className="font-body text-slate-500 text-sm mb-8 text-center uppercase tracking-widest font-medium">
            Portail Administrateur
          </p>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-body text-sm font-semibold text-ink-900" htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all bg-white/60 backdrop-blur-sm border border-white/40 text-ink-900 placeholder-slate-400 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 shadow-inner"
                placeholder="admin@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-body text-sm font-semibold text-ink-900" htmlFor="password">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all bg-white/60 backdrop-blur-sm border border-white/40 text-ink-900 placeholder-slate-400 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 shadow-inner"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm font-body text-center bg-red-100 py-3 px-4 rounded-xl border border-red-200 shadow-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full justify-center py-3.5 px-4 mt-4 rounded-xl text-base shadow-lg shadow-green-500/20 hover:shadow-green-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
