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
    
    const updateLyric = async (items) => {
        try {
            let { error } = await supabase
                .from('lyrics')
                .update({
                    lyrics: items,
                    title: title
                })
                .eq("id", lyricid)
      if (error) throw error
      console.log('Lyric updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
    }
    };
    
    useEffect(() => {
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
    },[items, title])

    const handleReorder = (items) => {
        console.log(items)
        setItems(items);
    };

  const handleTextChange = (itemToUpdate, newValue) => {
        if (itemToUpdate.line === newValue) {
            return; // If they are the same, no update is necessary
        }

        const itemIndex = items.indexOf(itemToUpdate);

        if (itemIndex !== -1) {
            const updatedItems = [...items];
            updatedItems[itemIndex] = {line: newValue, id: itemToUpdate.id};
            setItems(updatedItems);
        }
    };

    const handleTitleChange = (oldTitle, newValue) => {
        if (oldTitle === newValue) {
            return; // If they are the same, no update is necessary
        }
        else {
            setTitle(newValue)
        }
    };

    const addLine = async () => {
        setItems([...items, {id: Date.now(), line: "yeah yeah ok"}])
    }

    const handleButton = (button) => {
        if (button.button === "delete") {
            setItems(items => items.filter(item => item.id !== button.id));
        }
    }

    return (
        <div className='flex flex-col justify-center items-center'>
           
            <Title
                title={title}
                handleTitleChange={handleTitleChange}/>
            <NewLine
                    addLine={addLine} />
            <ReorderGroup
                items={items}
                handleReorder={handleReorder}
                handleTextChange={handleTextChange}
                handleButton={handleButton}/>
            
    
        </div>
        
    )
}

export default Lyric;
