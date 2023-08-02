'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AccountForm({ session }) {
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const user = session?.user

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        // .select(`username, website, avatar_url`)
        .select('username')
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({ username}) {
    try {
      setLoading(true)

      let { error } = await supabase.from('profiles').upsert({
        id: user?.id,
        username,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
    } catch (error) {
      console.log('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center'>
      <div className="w-fit flex flex-col items-end justify-center mt-3 gap-4">
      <div >
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session?.user.email} disabled />
      </div>
      
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      
      <div>
        <button
          className=""
          onClick={() => updateProfile({ username })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
    </div>
    
  )
}