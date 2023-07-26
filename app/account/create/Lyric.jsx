"use client"

import React, { useEffect } from 'react';
import { Reorder } from "framer-motion";
import { useState } from 'react';

function Lyric({ initialItems }) {

    const [items, setItems] = useState(initialItems);
    
    useEffect(() => {
        console.log("loaded")
    }, [])

    const handleTextChange = () => {console.log("ok")}

    return (
        <Reorder.Group axis="y" values={items} onReorder={setItems} className='flex flex-col justify-center items-center'>
            {items.map((item) => {
                return (
          <Reorder.Item
              key={item}
              value={item}>
              <div className='bg-gray-200 w-screen m-2'>
                  <input
                                value={item}
                                onChange={(e)=>{handleTextChange(item, e.target.value)}}
  type="text"
  id="input"
  className="w-full p-2 text-gray-900 border border-gray-300 bg-gray-50"
  
/>
              </div>
          
        </Reorder.Item>
      )})}
    </Reorder.Group>
  )
}

export default Lyric;