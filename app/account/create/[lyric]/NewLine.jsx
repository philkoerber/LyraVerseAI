"use client";

import React from "react";
import { FaFeatherAlt } from "react-icons/fa";

function NewLine({ addEmptyLine, addAiLine }) {
  return (
    <div className="flex gap-4">
      <button
        className="flex text-white bg-gray-500 hover:bg-gray-600 w-10 h-10  justify-center items-center mt-2 text-3xl rounded"
        onClick={addEmptyLine}>
        +
      </button>
      <button
        className="flex text-white bg-gray-500 hover:bg-gray-600 w-10 h-10  justify-center items-center mt-2 text-2xl rounded"
        onClick={addAiLine}>
        <FaFeatherAlt />
      </button>
    </div>
  );
}

export default NewLine;
