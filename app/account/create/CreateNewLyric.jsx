"use client"
import React from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

function CreateNewLyric({ session }) {
    const supabase = createClientComponentClient()
    
    const user = session?.user

    


    async function insertNewLyric() {
        console.log("inserting new lyric")
    try {
        let { data, error } = await supabase
            .from('lyrics')
            .insert([{
          user_id: user?.id
            }])
            .select()
      if (error) throw error
        console.log(data)
    } catch (error) {
      alert('Error creating new lyric')
    } finally {
      console.log("reaching final")
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