"use client";

import React from "react";

const buttonStyles =
  "flex items-center justify-center text-lg text-white rounded h-6 w-6 text-gray-400 ";

function ButtonGroup({ handleButton }) {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => handleButton("delete")}
        className={buttonStyles + "hover:text-white"}>
        x
      </button>
    </div>
  );
}

export default ButtonGroup;
