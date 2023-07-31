import React from 'react';

import Lyric from './Lyric';
import supabase from '@/app/utils/supabase';

async function Create({ params }) {
  const { data: { session }, } = await supabase.auth.getSession()

    return (
      <div className='w-screen flex justify-center items-center p-8'>
        <Lyric session={session} lyricid={params.lyric} />
        </div>
    );
}

export default Create;