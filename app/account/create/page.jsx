import React from 'react';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import SavedLyrics from './SavedLyrics';

async function Create() {

    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()
    
    return (
        <div className='flex flex-col justify-center items-center gap-8 mt-5'>
            <SavedLyrics session={session} />
        </div>
    );
}

export default Create;