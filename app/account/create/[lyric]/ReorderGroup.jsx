import React from 'react';
import { Reorder, motion } from 'framer-motion';
import ButtonGroup from './ButtonGroup';

function ReorderGroup({ items, handleReorder, handleTextChange, handleButton }) {

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    
    return (
                <Reorder.Group axis="y" values={items} onReorder={handleReorder} className='flex flex-col'>
            {items.map((item) => {
                return (
                    <Reorder.Item
                        key={item.id}
                        value={item}
                        className='flex items-center gap-x-2 cursor-move'
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}

                    >
                        
                        <motion.div
                            className='w-[500px]'
                          >
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <input
                                    defaultValue={item.line}
                                    onBlur={(e) => { handleTextChange(item, e.target.value) }}
                                    type="text"
                                    id={`input-${item}`}
                                    autoComplete="off"
                                    className="w-full mt-1 px-4 text-white bg-transparent"
                                />
                            </form>
                        </motion.div>
                        <ButtonGroup handleButton={(button)=>handleButton({button: button, id: item.id})} />
                        </Reorder.Item>
                )
            })}
        </Reorder.Group>
    );
}

export default ReorderGroup;