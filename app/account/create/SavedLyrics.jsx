"use client"

import React, { useEffect } from 'react';
import CreateNewLyric from './CreateNewLyric';
import { motion } from 'framer-motion';

import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';


function formatDateString(dateString) {
        

  const dateObj = new Date(dateString);

  // Function to pad single-digit numbers with leading zeros
  const pad = (num) => (num < 10 ? "0" + num : num);

  // Formatting the date to a more readable format (e.g., "August 1, 2023 05:27:59 AM")
  const formattedDate = `${dateObj.toLocaleString("en-US", {
    month: "long",
  })} ${dateObj.getUTCDate()}, ${dateObj.getUTCFullYear()} ${pad(
    dateObj.getUTCHours()
  )}:${pad(dateObj.getUTCMinutes())}:${pad(dateObj.getUTCSeconds())} ${
    dateObj.getUTCHours() >= 12 ? "PM" : "AM"
  }`;

  return formattedDate;
}

function SavedLyrics({ usersLyrics, session }) {

    const router = useRouter();
    
    useEffect(() => {
        console.log(usersLyrics)
    }, [])

    async function handleClick(id) {
        router.push(`/account/create/${id}`)
    }
    
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {usersLyrics?.map((lyric, index) => {
                const lyricsLength = lyric.lyrics.length
                return (
                    <div
                        key={lyric.id}
                        onClick={()=>{handleClick(lyric.id)}}
                        className='w-[200px] h-[150px] relative bg-orange-500 hover:bg-orange-200 shadow-lg overflow-hidden rounded cursor-pointer transition duration-100'>
                        <div className='font-extrabold z-30 text-xl w-full text-center absolute bg-black text-gray-200 uppercase'>
                            {lyric.title}
                            </div>
                        <div className='flex-col gap-1 h-full w-full flex justify-center items-center'>{
                            lyric.lyrics.map((line) => {
                                return (<motion.div
                                    className='h-fit'
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
                        <RiDeleteBinLine />
                    </div>
                )
            })}
            <CreateNewLyric session={session} />

        </div>
    );
}

export default SavedLyrics;