import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

import { GrAdd } from 'react-icons/gr';
import Spinner from '@/app/utils/Spinner';

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
    <div className='w-[200px] h-[150px] flex justify-center items-center rounded-full'>
      <button
        className='w-[75px] h-[75px] bg-lime-500 hover:bg-lime-400 rounded-full border-black border-[1px] flex justify-center items-center shadow-lg transition duration-100'
        onClick={handleClick}
        disabled={loading} // Disable the button when loading is true
      >
        {/* Conditionally render the Spinner or GrAdd icon */}
        {showSpinner ? <Spinner /> : <p className='text-xl text-white'><GrAdd /></p>}
      </button>
    </div>
  );
}

export default CreateNewLyric;