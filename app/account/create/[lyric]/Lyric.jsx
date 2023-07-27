"use client"

import React, { useEffect, useCallback } from 'react';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import ReorderGroup from './ReorderGroup';

function Lyric({ lyric, session, lyricfromdb }) {
    const supabase = createClientComponentClient()

    const user = session?.user

    const [items, setItems] = useState(lyric.lyrics);
    const [username, setUsername] = useState()
    const [loading, setLoading] = useState()
        const [updateTimeout, setUpdateTimeout] = useState(null);
    
    // Dummy update function
    const updateLyric = async (items) => {
        
        console.log("updating lyrics...")
        const { error } = supabase
            .from("lyrics")
            .insert([{}])
    };

    useEffect(() => {
        console.log(lyricfromdb)
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
        <ReorderGroup
            items={items}
            handleReorder={handleReorder}
            handleTextChange={handleTextChange} />
    )
}

export default Lyric;
