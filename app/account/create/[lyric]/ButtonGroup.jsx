"use client"

import React from 'react';
import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';
import { FaFeatherAlt } from 'react-icons/fa';

const buttonStyles = "flex items-center justify-center text-lg text-white rounded h-6 w-6 "

function ButtonGroup({handleButton}) {

  return (
      <div className="flex space-x-2">
          <button
        onClick={()=>handleButton("create")}
        className={buttonStyles + "hover:text-green-500"}
      >
        <FaFeatherAlt />
        
      </button>
      <button
        onClick={()=>handleButton("edit")}
        className={buttonStyles + "hover:text-blue-500"}
      >
        <RiEdit2Line />
        
      </button>
      <button
        onClick={()=>handleButton("delete")}
        className={buttonStyles + "hover:text-red-500"}
      >
        <RiDeleteBinLine />
        
      </button>
    </div>
  );
}

export default ButtonGroup;
