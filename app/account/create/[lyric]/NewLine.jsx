"use client"

import React from 'react';

function NewLine({addLine}) {
    return (
        <button
            className='flex text-white bg-gray-500 hover:bg-gray-600 w-10 h-10  justify-center items-center mt-2 text-3xl rounded'
            onClick={addLine}>
           +
        </button>
    );
}

export default NewLine;