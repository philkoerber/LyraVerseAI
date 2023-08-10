"use client";

import React from "react";

const buttonStyles =
  "flex items-center justify-center text-lg text-grey-300 rounded h-6 w-6 text-gray-400 ";

function LineButtons({ handleButton }) {
  return (
    <div className="flex space-x-2 ">
      <button
        onClick={() => handleButton("delete")}
        className={buttonStyles + "hover:text-black"}>
        x
      </button>
    </div>
  );
}

export default LineButtons;
