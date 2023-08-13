"use client";

import React, { useEffect, useState } from "react";
import CreateNewLyric from "./CreateNewLyric";
import { AnimatePresence, motion } from "framer-motion";

import { RiDeleteBinLine } from "react-icons/ri";
import { BiDuplicate } from "react-icons/bi";
import { useRouter } from "next/navigation";
import formatDateString from "@/app/utils/formatDateString";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Spinner from "@/app/utils/Spinner";

function SavedLyrics({ session }) {
  const [lyrics, setLyrics] = useState(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClientComponentClient();

  const router = useRouter();

  async function duplicateLyric(id) {
    let lyricToDuplicate = {};
    try {
      //first find lyirc
      let { data, error } = await supabase
        .from("lyrics")
        .select()
        .eq("id", id)
        .select();
      if (error) throw error;
      lyricToDuplicate = data[0];
    } catch (error) {
      console.log("Error duplicating lyric");
    } finally {
      //then add this lyric to db
      try {
        let { data, error } = await supabase
          .from("lyrics")
          .insert({
            lyrics: lyricToDuplicate.lyrics,
            title: lyricToDuplicate.title,
            user_id: lyricToDuplicate.user_id,
          })
          .select();

        if (error) throw error;
      } catch (error) {
        console.log("Error duplicating lyric");
      } finally {
        let fetchData = [];
        const fetchLyrics = async () => {
          try {
            const { data: usersLyrics } = await supabase
              .from("lyrics")
              .select();
            fetchData = usersLyrics;
          } finally {
            setLyrics(fetchData);
          }
        };
        fetchLyrics();
      }
    }
  }

  async function deleteLyric(id) {
    try {
      let { data, error } = await supabase
        .from("lyrics")
        .delete()
        .eq("id", id)
        .select();
      if (error) throw error;
      setLyrics((prevLyrics) => prevLyrics.filter((lyric) => lyric.id !== id));
    } catch (error) {
      console.log("Error deleting lyric");
    } finally {
      console.log("ok");
    }
  }

  useEffect(() => {
    if (!lyrics) {
      let fetchData = [];
      const fetchLyrics = async () => {
        try {
          const { data: usersLyrics } = await supabase.from("lyrics").select();
          fetchData = usersLyrics;
        } finally {
          setLyrics(fetchData);
        }
      };
      fetchLyrics();
    } else {
      console.log(lyrics);
    }
  }, [lyrics]);

  function handleClick(id) {
    console.log(id);
    setLoading(true);
    router.push(`/account/create/${id}`);
  }

  const handleDuplicateButton = async (lyricId) => {
    await duplicateLyric(lyricId);
  };

  const handleDeleteButton = async (lyricId) => {
    await deleteLyric(lyricId);
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center">
        <Spinner />
      </motion.div>
    );
  } else if (lyrics) {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 content-evenly gap-y-10 gap-x-14">
          <AnimatePresence>
            {lyrics?.map((lyric, index) => {
              const lyricsLength = lyric.lyrics.length;

              return (
                <motion.div
                  className="w-fit h-fit"
                  key={lyric.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}>
                  <div
                    onClick={() => {
                      handleClick(lyric.id);
                    }}
                    className="w-[200px] h-[150px] relative bg-neutral-500 hover:bg-green-300 shadow-lg overflow-hidden rounded cursor-pointer border-[1px] border-black transition duration-200">
                    <div className="font-extrabold z-30 text-xl w-full text-center absolute bg-black text-gray-200 uppercase">
                      {lyric.title}
                    </div>
                    <div className="flex-col gap-1 h-full w-full flex justify-center items-center">
                      {lyric.lyrics.map((line) => {
                        return (
                          <motion.div
                            className="h-fit p-2"
                            key={line.id}
                            animate={
                              lyricsLength > 4
                                ? {
                                    y: [
                                      lyricsLength * 10,
                                      lyricsLength * -10,
                                      lyricsLength * 10,
                                    ],
                                  }
                                : {}
                            }
                            transition={{
                              duration: 20,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: index / 4,
                            }}>
                            <p>{line.line}</p>
                          </motion.div>
                        );
                      })}
                    </div>
                    <div className="absolute bottom-0 pr-1 text-right text-sm w-full bg-black text-gray-200">
                      {formatDateString(lyric.created_at)}
                    </div>
                  </div>
                  <div className="text-xl flex z-100 w-full mt-2 fill-white">
                    <button
                      className="flex-1 flex justify-center hover:text-green-600 transition duration-200"
                      onClick={() => {
                        handleDuplicateButton(lyric.id);
                      }}>
                      <BiDuplicate />
                    </button>
                    <button
                      className="flex-1 flex justify-center hover:text-red-600 transition duration-200"
                      onClick={() => {
                        handleDeleteButton(lyric.id);
                      }}>
                      <RiDeleteBinLine />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <div className="flex w-full justify-center items-center">
          <CreateNewLyric session={session} />
        </div>
      </div>
    );
  } else {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center">
        Loading lyrics...
      </motion.div>
    );
  }
}

export default SavedLyrics;
