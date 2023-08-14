"use client";

import React from "react";
import { FaFeatherAlt } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

function ButtonGroup({
  addEmptyLine,
  addAiLine,
  copyToClipboard,
  reciteLyric,
}) {
  return (
    <div className="flex gap-4">
      <button
        className="flex text-white bg-gray-500 hover:bg-green-400 w-10 h-10  justify-center items-center mt-2 text-3xl rounded"
        onClick={addEmptyLine}>
        +
      </button>
      <button
        className="flex text-white bg-gray-500 hover:bg-green-400 w-10 h-10  justify-center items-center mt-2 text-2xl rounded"
        onClick={addAiLine}>
        <FaFeatherAlt />
      </button>
      <button
        className="flex text-white bg-gray-500 hover:bg-green-400 w-10 h-10  justify-center items-center mt-2 text-2xl rounded"
        onClick={copyToClipboard}>
        <FaRegCopy />
      </button>
      <button
        className="flex text-white bg-gray-500 hover:bg-green-400 w-10 h-10  justify-center items-center mt-2 text-2xl rounded"
        onClick={reciteLyric}>
        <IoChatbubbleEllipsesOutline />
      </button>
      <audio
        className="h-10 flex justify-center items-center mt-2"
        controls
        id="audioPlayer">
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default ButtonGroup;
