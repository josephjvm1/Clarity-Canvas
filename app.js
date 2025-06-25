import { useEffect, useState } from 'react'
import { supabase } from './src/supabaseClient'
import Auth from './src/Auth'
import Canvas from './src/Canvas' // Update this if you named it differently

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div>
      {session ? <Canvas key={session.user.id} /> : <Auth />}
    </div>
  )
}

export default App
