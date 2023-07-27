"use client"

import React, { useEffect } from 'react';
import { Reorder } from "framer-motion";
import { useState } from 'react';
import ButtonGroup from './ButtonGroup';

function Lyric({ initialItems }) {
    const [items, setItems] = useState(initialItems);

    useEffect(() => {
        console.log(items)
    }, [items])

  const handleTextChange = (itemToUpdate, newValue) => {
        if (itemToUpdate === newValue) {
            return; // If they are the same, return early, and no update is necessary
        }

        const itemIndex = items.indexOf(itemToUpdate);

        if (itemIndex !== -1) {
            const updatedItems = [...items];
            updatedItems[itemIndex] = newValue;
            setItems(updatedItems);
        }
    };

    return (
        <Reorder.Group axis="y" values={items} onReorder={setItems} className='flex flex-col justify-center items-center'>
            {items.map((item) => {
                return (
                    <Reorder.Item
                        key={item}
                        value={item}
                        className='flex items-center'
                    >
                        <div className='bg-gray-200 w-[500px] m-2'>
                            <form>
                                <input
                                    defaultValue={item}
                                    onBlur={(e) => { handleTextChange(item, e.target.value) }}
                                    type="text"
                                    id={`input-${item}`}
                                    className="w-full p-4 text-gray-900 border border-gray-300 bg-gray-50"
                                />
                            </form>
                        </div>
                        <ButtonGroup/>
                    </Reorder.Item>
                )
            })}
        </Reorder.Group>
    )
}

export default Lyric;
