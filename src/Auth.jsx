import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (type) => {
    setLoading(true)
    let result

    if (type === 'signin') {
      result = await supabase.auth.signInWithPassword({ email, password })
    } else {
      result = await supabase.auth.signUp({ email, password })
    }

    if (result.error) alert(result.error.message)
    else alert('Check your email to confirm login.')

    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '420px', margin: '96px auto' }}>
      <h2>Clarity Canvas Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', marginBottom: '12px', width: '100%' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: '12px', width: '100%' }}
      />
      <button onClick={() => handleLogin('signin')} disabled={loading}>Log In</button>
      <button onClick={() => handleLogin('signup')} disabled={loading} style={{ marginLeft: '8px' }}>Sign Up</button>
    </div>
  )
}
