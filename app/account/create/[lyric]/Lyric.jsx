"use client"

import React, { useEffect, useCallback } from 'react';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import ReorderGroup from './ReorderGroup';
import Title from './Title';
import NewLine from './NewLine';

function Lyric({ session, lyricid }) {

    const supabase = createClientComponentClient()
    const user = session?.user

    const [items, setItems] = useState([]);
    const [title, setTitle] = useState(null)

    const [loading, setLoading] = useState()
    const [updateTimeout, setUpdateTimeout] = useState(null);
    
    // Dummy update function
    const updateLyric = async (items) => {
    //     try {
    //   setLoading(true)

    //   let { error } = await supabase.from('lyrics').upsert({
    //     id: user?.id,
    //     username,
    //     updated_at: new Date().toISOString(),
    //   })
    //   if (error) throw error
    //   alert('Profile updated!')
    // } catch (error) {
    //   alert('Error updating the data!')
    // } finally {
    //   setLoading(false)
    // }
    };

   

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
    }, [])
    
    useEffect(() => {
        if (items.length > 0) {

            
            
            // Clear previous timeout
        if (updateTimeout) {
            clearTimeout(updateTimeout);
        }

        //call the update function after 500ms
            setUpdateTimeout(setTimeout(() => {
            console.log(items)
            updateLyric(items);
        }, 500));
       }
    },[items])

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

    const addLine = async () => {
        console.log("adding line...")
        setItems([...items, "hey"])
    }

    return (
        <div className='flex flex-col justify-center items-center'>
           
            <Title
                title={title} />
            <ReorderGroup
                items={items}
                handleReorder={handleReorder}
                handleTextChange={handleTextChange} />
            <NewLine
                    addLine={addLine} />
    
        </div>
        
    )
}

export default Lyric;
