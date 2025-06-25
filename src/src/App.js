import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Auth from './Auth';
import Canvas from './Canvas';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check for session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      {!session ? <Auth /> : <Canvas />}
    </div>
  );
}
