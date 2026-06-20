import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, LayoutDashboard } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#f8f8f6] flex relative overflow-hidden text-ink-900 font-body">
      {/* Subtle background decoration for glassmorphism pop */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-green-200 rounded-full opacity-40 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-100 rounded-full opacity-50 blur-[150px] pointer-events-none" />

      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-64 p-6 shrink-0 flex flex-col relative z-20"
      >
        <div className="glass-card w-full h-full p-6 flex flex-col justify-between border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div>
            <div className="mb-10 text-center">
              <h2 className="font-heading text-3xl font-bold tracking-wider text-ink-900">
                HYDRA<span className="text-green-600">ME</span>
              </h2>
              <p className="text-[0.65rem] text-slate-500 font-body uppercase tracking-[0.2em] mt-1 font-semibold">
                Panneau d'administration
              </p>
            </div>

            <nav className="flex flex-col gap-2">
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-green-500/10 text-green-700 border border-green-500/20 shadow-inner'
                      : 'text-slate-600 hover:bg-white/60 hover:text-ink-900 border border-transparent'
                  }`
                }
              >
                <LayoutDashboard className="w-5 h-5" />
                Projets
              </NavLink>
            </nav>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 text-sm font-semibold font-body text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            Se déconnecter
          </button>
        </div>
      </motion.aside>

      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="flex-1 p-6 pl-0 h-screen overflow-y-auto relative z-10"
      >
        <div className="h-full w-full rounded-[2rem] bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-8 overflow-y-auto">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
}
