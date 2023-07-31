"use client"

import React, { useEffect } from 'react';

function SavedLyrics({ usersLyrics }) {
    
    useEffect(() => {
        console.log(usersLyrics)
    }, [])
    
    return (
        <div>
            {usersLyrics?.map((lyric) => {
                return (
                    <div
                        key={lyric.id}
                        className='mb-3'>
                        here is lyric <p className='font-extrabold'>{lyric.title}</p>
                    </div>
                )
            })}
        </div>
    );
}

export default SavedLyrics;