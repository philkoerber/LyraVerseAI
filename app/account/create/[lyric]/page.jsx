import React from 'react';

import Lyric from './Lyric';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

async function Create({ params }) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { session }, } = await supabase.auth.getSession()

    return (
      <div className='w-screen flex justify-center items-center p-8'>
        <Lyric session={session} lyricid={params.lyric} />
        </div>
    );
}

export default Create;