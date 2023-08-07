"use client"

import React, { useEffect, useState } from 'react';
import CreateNewLyric from './CreateNewLyric';
import { AnimatePresence, motion } from 'framer-motion';

import { RiDeleteBinLine } from 'react-icons/ri';
import { BiDuplicate, BiCopy } from "react-icons/bi"
import { useRouter } from 'next/navigation';
import formatDateString from '@/app/utils/formatDateString';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Spinner from '@/app/utils/Spinner';

function SavedLyrics({ session }) {

    const [lyrics, setLyrics] = useState(null)

    const supabase = createClientComponentClient()


    async function deleteLyric(id) {
    try {
        let { data, error } = await supabase
            .from('lyrics')
            .delete()
            .eq("id", id)
            .select()
        if (error) throw error
        console.log(data)
        setLyrics(prevLyrics => prevLyrics.filter(lyric => lyric.id !== id));

    } catch (error) {
      console.log('Error deleting lyric')
    } finally {
      console.log("ok")
    }
  }

    const router = useRouter();
    
    useEffect(() => {
        if (!lyrics) {
        let fetchData = [];
        const fetchLyrics = async () => {
            try {
                const { data: usersLyrics } = await supabase
                    .from("lyrics")
                    .select();
                fetchData = usersLyrics;
            }
            finally {
                setLyrics(fetchData)
            }

        }
        fetchLyrics()
        }

        else {
            console.log(lyrics)
        }
    }, [lyrics])

    async function handleClick(id) {
        router.push(`/account/create/${id}`)
    }

    const handleDuplicateButton = (lyricId) => {
        console.log(lyricId)
    }

    const handleCopyButton = (lyricId) => {
        console.log(lyricId)
    }

    const handleDeleteButton = async (lyricId) => {
        await deleteLyric(lyricId)
    }

    if (lyrics)
        {
    return (
    
        <div
            className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 content-evenly gap-y-10 gap-x-14'>
            <AnimatePresence>
            {lyrics?.map((lyric, index) => {
                const lyricsLength = lyric.lyrics.length
                
                return (
                    
                    <motion.div
                        className='w-fit h-fit'
                        key={lyric.id}
                        initial={{ opacity: 0}}
                        animate={{ opacity: 1}}
                        exit={{ opacity: 0}}>
                        <div
                        onClick={()=>{handleClick(lyric.id)}}
                        className='w-[200px] h-[150px] relative bg-orange-500 hover:bg-orange-200 shadow-lg overflow-hidden rounded cursor-pointer border-[1px] border-black transition duration-200'>
                        <div className='font-extrabold z-30 text-xl w-full text-center absolute bg-black text-gray-200 uppercase'>
                            {lyric.title}
                            </div>
                        <div className='flex-col gap-1 h-full w-full flex justify-center items-center'>{
                            lyric.lyrics.map((line) => {
                                return (
                                    <motion.div
                                    className='h-fit'
                                    key={line.id}
                                    animate={
                                    lyricsLength>4?
                                            { y: [lyricsLength * 10, lyricsLength * -10, lyricsLength * 10], }
                                            :
                                        {}}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: index/4}}
    >
      <p>{line.line}</p>
    </motion.div>)
                        })
                        }</div>
                        <div className='absolute bottom-0 pr-1 text-right text-sm w-full bg-black text-gray-200'>
                            {formatDateString(lyric.created_at)}
                            </div>
                            
                        
                        
                        </div>
                        <div
                            className='text-white text-xl flex z-100 w-full mt-2 fill-white'
                        >
                            <button
                                className='flex-1 flex justify-center hover:text-orange-500 transition duration-200'
                                onClick={()=>{handleCopyButton(lyric.id)}}>
                                <BiCopy/>
                            </button>
                            <button
                                className='flex-1 flex justify-center hover:text-orange-500 transition duration-200'
                                onClick={()=>{handleDuplicateButton(lyric.id)}}>
                                <BiDuplicate/>
                            </button>
                            <button
                                className='flex-1 flex justify-center hover:text-red-600 transition duration-200'
                                onClick={()=>{handleDeleteButton(lyric.id)}}>
                                <RiDeleteBinLine/>
                            </button>
                            
                            </div>
                        </motion.div>
                )
            })}
                            </AnimatePresence>
            <CreateNewLyric session={session} />

            </div>

        );
    }
    
    else {
        return (<motion.div
            initial={{ opacity: 0 }}
            animate={{opacity: 1}}
            className='flex justify-center items-center'>
            Loading lyrics...
                </motion.div>)
    }
}

export default SavedLyrics;