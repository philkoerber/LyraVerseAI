"use client"
import React from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';


function CreateNewLyric({ session }) {

    const supabase = createClientComponentClient()
    
    const user = session?.user

    const router = useRouter();
    


    async function insertNewLyric() {
      console.log("inserting new lyric")
      let lyricId = null
    try {
        let { data, error } = await supabase
            .from('lyrics')
            .insert({
          user_id: user?.id
            })
            .select()
      if (error) throw error
      lyricId = data[0].id;
    } catch (error) {
      alert('Error creating new lyric')
    } finally {
      router.push(`/account/create/${lyricId}`)
    }
  }

    const handleClick = async () => {
        await insertNewLyric();
    }

    return (
        <button
            className='w-[180px] h-[100px] flex flex-col justify-center items-center p-1 bg-green-700 hover:bg-green-800 text-white rounded'
            onClick={handleClick}>
            <div>Create something new...</div>
            <div className='text-3xl'>+</div>
        </button>
    );
}

export default CreateNewLyric;