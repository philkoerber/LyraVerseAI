import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

import { GrAdd } from 'react-icons/gr';
import Spinner from '@/app/utils/Spinner';

import { motion } from 'framer-motion';

function CreateNewLyric({ session }) {
  const supabase = createClientComponentClient();
  const user = session?.user;
  const router = useRouter();
  const [loading, setLoading] = useState(false); // State to manage button status
  const [showSpinner, setShowSpinner] = useState(false); // State to show spinner

  async function insertNewLyric() {
    let lyricId = null;
    try {
      setLoading(true); // Disable the button and show spinner
      const { data, error } = await supabase.from('lyrics').insert({
        user_id: user?.id,
      }).select();
      if (error) throw error;
      lyricId = data[0].id;
    } catch (error) {
      alert('Error creating new lyric');
    } finally {
      router.push(`/account/create/${lyricId}`);
    }
  }

  const handleClick = async () => {
    setShowSpinner(true); // Show the spinner when button is clicked
    await insertNewLyric();
  };

  return (
    <motion.div
      className='w-[200px] h-[150px] flex justify-center items-center rounded-full'
      initial={{ opacity: 0 }}
      animate={{opacity: 1}}>
      <button
        className='w-[75px] h-[75px] bg-transparent hover:bg-orange-200 rounded-full border-black border-2 flex justify-center items-center shadow-lg transition duration-100'
        onClick={handleClick}
        disabled={loading} // Disable the button when loading is true
      >
        {/* Conditionally render the Spinner or GrAdd icon */}
        {showSpinner ? <Spinner /> : <p className='text-xl text-white'><GrAdd /></p>}
      </button>
    </motion.div>
  );
}

export default CreateNewLyric;