"use client"

import React from 'react';
import { motion } from 'framer-motion';


const pointAnimation = (delay) => {
  const duration = (Math.random() * 0.4) + 0.3;
    return {
    initial: { scale: 1 },
    animate: { scale: 0.2 },
    transition: {duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay}
    }
}

const pointStyles = "w-[10px] h-[10px] bg-gray-800 rounded-full"

const Spinner = () => {
  return (
    <div className="h-10 flex items-center justify-center">
      <div
              className="flex items-center space-x-2"
      >
        <motion.div className={pointStyles} {...pointAnimation(0)}></motion.div>
        <motion.div className={pointStyles} {...pointAnimation(0.4)}></motion.div>
        <motion.div className={pointStyles} {...pointAnimation(0.2)}></motion.div>
        
      </div>
    </div>
  );
};

export default Spinner;