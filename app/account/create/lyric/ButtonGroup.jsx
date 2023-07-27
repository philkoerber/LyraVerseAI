"use client"

import React from 'react';
import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';
import { FaFeatherAlt } from 'react-icons/fa';

const buttonStyles = "flex items-center justify-center text-sm text-white rounded h-5 w-5 "

function ButtonGroup(props) {
  const { onEdit, onDelete } = props;

  return (
      <div className="flex space-x-2">
          <button
        onClick={onEdit}
        className={buttonStyles + "hover:text-green-500"}
      >
        <FaFeatherAlt />
        
      </button>
      <button
        onClick={onEdit}
        className={buttonStyles + "hover:text-blue-500"}
      >
        <RiEdit2Line />
        
      </button>
      <button
        onClick={onDelete}
        className={buttonStyles + "hover:text-red-500"}
      >
        <RiDeleteBinLine />
        
      </button>
    </div>
  );
}

export default ButtonGroup;
