import React from 'react';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import CreateNewLyric from './CreateNewLyric';

async function Create() {

    const supabase = createRouteHandlerClient({ cookies })
    
    const {data: { session }} = await supabase.auth.getSession()

    return (
        <div className='flex justify-center items-center mt-20'>
            <CreateNewLyric session={session} />
        </div>
    );
}

export default Create;