"use client"

import React, { useEffect, useCallback } from 'react';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import ReorderGroup from './ReorderGroup';
import Title from './Title';

function Lyric({ session, lyricid }) {

    const supabase = createClientComponentClient()
    const user = session?.user

    const [items, setItems] = useState([]);
    const [title, setTitle] = useState(null)

    const [loading, setLoading] = useState()
    const [updateTimeout, setUpdateTimeout] = useState(null);
    
    // Dummy update function
    const updateLyric = async (items) => {
    };

    // useEffect(() => {
    //    console.log(lyric) 
    // },[lyric])

    useEffect(() => {
        // console.log(user)
        if(items.length===0){
        let lyricFromDb = {};
        const getLyricFromDb = async () => {
            try {
                let { data, error } = await supabase
                .from('lyrics')
                .select()
                    .match({ id: lyricid })
                if (error) throw error;
                lyricFromDb = data
            }
            finally {
                const l = lyricFromDb[0];
                setItems(l.lyrics);
                setTitle(l.title);
            }
            
        }
        getLyricFromDb()}
    },[])

//      async function updateProfile({ username}) {
//     try {
//       setLoading(true)

//       let { error } = await supabase.from('profiles').upsert({
//         id: user?.id,
//         username,
//         updated_at: new Date().toISOString(),
//       })
//       if (error) throw error
//       alert('Profile updated!')
//     } catch (error) {
//       alert('Error updating the data!')
//     } finally {
//       setLoading(false)
//     }
//   }

    const handleReorder = (items) => {
        setItems(items);

        // Clear previous timeout
        if (updateTimeout) {
            clearTimeout(updateTimeout);
        }

        // Set a new timeout to call the update function after 500ms
        setUpdateTimeout(setTimeout(() => {
            updateLyric(items);
        }, 500));
    };

  const handleTextChange = (itemToUpdate, newValue) => {
        if (itemToUpdate === newValue) {
            return; // If they are the same, no update is necessary
        }

        const itemIndex = items.indexOf(itemToUpdate);

        if (itemIndex !== -1) {
            const updatedItems = [...items];
            updatedItems[itemIndex] = newValue;
            setItems(updatedItems);
        }
    };

    return (
        <div>
            <Title
                title={title} />
            <ReorderGroup
                items={items}
                handleReorder={handleReorder}
                handleTextChange={handleTextChange} />
        </div>
        
    )
}

export default Lyric;
