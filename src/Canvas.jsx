import { supabase } from './supabaseClient';

export default function Canvas() {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Welcome to Clarity Canvas 🎨</h2>
      <p>You’re logged in!</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
