"use client"

import React, { useEffect, useCallback } from 'react';
import { Reorder } from "framer-motion";
import { useState } from 'react';
import ButtonGroup from './ButtonGroup';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import ReorderGroup from './ReorderGroup';

function Lyric({ lyric, session }) {
    const supabase = createClientComponentClient()

    const user = session?.user

    const [items, setItems] = useState(lyric.lyrics);
    const [username, setUsername] = useState()
    const [loading, setLoading] = useState()
        const [updateTimeout, setUpdateTimeout] = useState(null);



    const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        // .select(`username, website, avatar_url`)
        .select('username, lyrics')
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])
    
    // Dummy update function
    const updateLyric = () => {
        console.log("Update function called!");
        // Replace this with your actual update logic
    };

    const handleReorder = (items) => {
        setItems(items);

        // Clear previous timeout
        if (updateTimeout) {
            clearTimeout(updateTimeout);
        }

        // Set a new timeout to call the update function after 500ms
        setUpdateTimeout(setTimeout(() => {
            // Call your update function here
            // Replace the following line with your actual update function call
            updateLyric();
        }, 500));
    };

  const handleTextChange = (itemToUpdate, newValue) => {
        if (itemToUpdate === newValue) {
            return; // If they are the same, return early, and no update is necessary
        }

        const itemIndex = items.indexOf(itemToUpdate);

        if (itemIndex !== -1) {
            const updatedItems = [...items];
            updatedItems[itemIndex] = newValue;
            setItems(updatedItems);
        }
    };

    return (
        <ReorderGroup items={items} handleReorder={handleReorder} handleTextChange={handleTextChange} />
    )
}

export default Lyric;
