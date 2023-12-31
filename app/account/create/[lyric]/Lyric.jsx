"use client";

import React, { useEffect, useCallback } from "react";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import ReorderGroup from "./ReorderGroup";
import Title from "./Title";
import ButtonGroup from "./ButtonGroup";

import { MdArrowBackIosNew } from "react-icons/md";
import { useRouter } from "next/navigation";
import { createNewLine, readLyric } from "../aiCalls";

function Lyric({ session, lyricid, config }) {
  const router = useRouter();

  const supabase = createClientComponentClient();
  const user = session?.user;

  const [items, setItems] = useState([]);
  const [title, setTitle] = useState(null);

  const [wholeLyric, setWholeLyric] = useState(items);

  const [loading, setLoading] = useState();
  const [updateTimeout, setUpdateTimeout] = useState(null);

  const updateLyric = async (items) => {
    try {
      let { error } = await supabase
        .from("lyrics")
        .update({
          lyrics: items,
          title: title,
        })
        .eq("id", lyricid);
      if (error) throw error;
    } catch (error) {
      console.log("Error updating the data!");
    } finally {
    }
  };

  useEffect(() => {
    if (items.length === 0) {
      let lyricFromDb = {};
      const getLyricFromDb = async () => {
        try {
          let { data, error } = await supabase
            .from("lyrics")
            .select()
            .match({ id: lyricid });
          if (error) throw error;
          lyricFromDb = data;
        } finally {
          const l = lyricFromDb[0];
          setItems(l?.lyrics);
          setTitle(l?.title);
        }
      };
      getLyricFromDb();
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      // Clear previous timeout
      if (updateTimeout) {
        clearTimeout(updateTimeout);
      }
      //call the update function after 500ms
      setUpdateTimeout(
        setTimeout(() => {
          updateLyric(items);
        }, 500)
      );
    }

    setWholeLyric(
      items.map((item) => {
        return item.line;
      })
    );
  }, [items, title]);

  const handleReorder = (items) => {
    setItems(items);
  };

  const handleTextChange = (itemToUpdate, newValue) => {
    if (itemToUpdate.line === newValue) {
      return; // If they are the same, no update is necessary
    }

    const itemIndex = items.indexOf(itemToUpdate);

    if (itemIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[itemIndex] = { line: newValue, id: itemToUpdate.id };
      setItems(updatedItems);
    }
  };

  const handleTitleChange = (oldTitle, newValue) => {
    if (oldTitle === newValue) {
      return; // If they are the same, no update is necessary
    } else {
      setTitle(newValue);
    }
  };

  const addEmptyLine = async () => {
    setItems([...items, { id: Date.now(), line: "another line..." }]);
  };

  const handleButton = async (button) => {
    if (button.button === "delete") {
      setItems((items) => items.filter((item) => item.id !== button.id));
    } else if (button.button === "create") {
    }
  };

  const addAiLine = async () => {
    try {
      setLoading(true);
      const line = wholeLyric[wholeLyric.length - 1];
      const data = await createNewLine(
        {
          question: line,
        },
        config
      );
      setItems([...items, { id: Date.now(), line: data }]);
    } catch (error) {
      // Handle the error, if needed
      console.error("Error in creating AI line:", error);
    } finally {
      setLoading(false); // Set loading back to false whether the call succeeds or fails
    }
  };

  const copyToClipboard = () => {
    const formattedText = wholeLyric.join("\n");
    navigator.clipboard.writeText(formattedText);
  };

  const reciteLyric = async () => {
    try {
      setLoading(true);
      const data = await readLyric(wholeLyric, config);
      console.log(data);
    } catch (e) {
      console.log("error reading lyic: " + e);
    } finally {
      console.log("you should hear lyric now...");
    }
  };

  return (
    <div className="w-full md:w-[80%]">
      <button
        className="text-2xl hover:text-gray-500"
        onClick={() => {
          router.push("/account/create");
        }}>
        <MdArrowBackIosNew />
      </button>

      <div className="flex flex-col justify-center items-center gap-8 select-none">
        <Title title={title} handleTitleChange={handleTitleChange} />
        <ButtonGroup
          addEmptyLine={addEmptyLine}
          addAiLine={addAiLine}
          copyToClipboard={copyToClipboard}
          reciteLyric={reciteLyric}
        />
        <ReorderGroup
          items={items}
          handleReorder={handleReorder}
          handleTextChange={handleTextChange}
          handleButton={handleButton}
        />
      </div>
    </div>
  );
}

export default Lyric;
