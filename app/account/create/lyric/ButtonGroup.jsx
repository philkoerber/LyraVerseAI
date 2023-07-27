"use client"

import React from 'react';
import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';
import { FaFeatherAlt } from 'react-icons/fa';

function ButtonGroup(props) {
  const { onEdit, onDelete } = props;

  return (
      <div className="flex space-x-2">
          <button
        onClick={onEdit}
        className="flex items-center justify-center px-3 py-2 bg-green-500 text-white rounded hover:bg-blue-600"
      >
        <FaFeatherAlt className="mr-2" />
        Create
      </button>
      <button
        onClick={onEdit}
        className="flex items-center justify-center px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        <RiEdit2Line className="mr-2" />
        Edit
      </button>
      <button
        onClick={onDelete}
        className="flex items-center justify-center px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        <RiDeleteBinLine className="mr-2" />
        Delete
      </button>
    </div>
  );
}

export default ButtonGroup;
