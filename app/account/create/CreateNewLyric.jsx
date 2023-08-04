"use client"
import React from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

import {GrAdd} from "react-icons/gr"



function CreateNewLyric({ session }) {

    const supabase = createClientComponentClient()
    const user = session?.user
    const router = useRouter();
    
    async function insertNewLyric() {
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
        <div
            className='w-[200px] h-[150px] flex justify-center items-center rounded-full'
        >
        <button
          className='w-[75px] h-[75px] bg-lime-500 hover:bg-lime-400 rounded-full border-black border-[1px] flex justify-center items-center shadow-lg transition duration-100'
          onClick={handleClick}>
          <p className='text-xl text-white'><GrAdd/></p>
        </button>
            
        </div>
    );
}

export default CreateNewLyric;