import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
      if (!session) {
        navigate('/admin/login', { replace: true });
      }
    });

    // Listen for auth state changes to reactively handle logouts
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate('/admin/login', { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ink-950 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-green-500" />
      </div>
    );
  }

  if (!session) {
    return null; // The useEffect will handle the redirect
  }

  // Render child routes if authenticated
  return <Outlet />;
}
