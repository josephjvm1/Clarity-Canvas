import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Auth({ onLogin }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const currentSession = supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) onLogin(data.session.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        if (newSession) onLogin(newSession.user);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1>Clarity Canvas</h1>
      <p>A space to organize your thoughts.</p>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}
