import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) alert(error.message)
    setLoading(false)
  }

  const handleSignUp = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password
    })
    if (error) alert(error.message)
    else alert('Check your email to confirm sign up.')
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', textAlign: 'center' }}>
      <h2>Login to Clarity Canvas</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: '8px', margin: '8px', width: '100%' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: '8px', margin: '8px', width: '100%' }}
      />
      <div>
        <button onClick={handleSignIn} disabled={loading}>Log In</button>
        <button onClick={handleSignUp} disabled={loading} style={{ marginLeft: '10px' }}>Sign Up</button>
      </div>
    </div>
  )
}
