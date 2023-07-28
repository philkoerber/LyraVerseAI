import React from 'react';
import { AnimatePresence, Reorder, motion } from 'framer-motion';
import ButtonGroup from './ButtonGroup';

function ReorderGroup({items, handleReorder, handleTextChange}) {
    return (
                <Reorder.Group axis="y" values={items} onReorder={handleReorder} className='flex flex-col'>
            {items.map((item, index) => {
                return (
                    <Reorder.Item
                        key={item}
                        value={item}
                        className='flex items-center gap-x-2 cursor-move'
                    >
                        
                        <motion.div
                            className='w-[500px]'
                          >
                            <form>
                                <input
                                    defaultValue={item}
                                    onBlur={(e) => { handleTextChange(item, e.target.value) }}
                                    type="text"
                                    id={`input-${item}`}
                                    className="w-full mt-1 px-4 text-white bg-transparent"
                                />
                            </form>
                        </motion.div>
                        <ButtonGroup/>
                        </Reorder.Item>
                )
            })}
        </Reorder.Group>
    );
}

export default ReorderGroup;