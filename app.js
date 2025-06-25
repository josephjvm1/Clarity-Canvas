import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Auth from './Auth';
import Canvas from './Canvas'; // or whatever your main app file is called

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check for existing session on load
    const currentSession = supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
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
