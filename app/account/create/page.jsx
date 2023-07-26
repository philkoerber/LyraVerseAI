import React from 'react';
import Lyric from './Lyric';

const initialItems = [
  "Come as you are, as you were, as I want you to be.",
  "With the lights out, it's less dangerous, here we are now, entertain us.",
  "I'm worse at what I do best, and for this gift, I feel blessed.",
  "In the sun, I feel as one.",
  "I found it hard, was hard to find, oh well, whatever, never mind.",
  "Teenage angst has paid off well, now I'm bored and old.",
  "Load up on guns, bring your friends, it's fun to lose and to pretend.",
  "Hey, wait, I've got a new complaint.",
  "Just because you're paranoid doesn't mean they're not after you.",
  "The sun is gone, but I have a light.",
  "And I forget just why I taste, oh yeah, I guess it makes me smile.",
  "A denial, a denial, a denial, a denial."
];

function Create(props) {

  
    return (
      <div className='w-screen flex justify-center items-center p-8'>
        <Lyric initialItems={initialItems} />
        </div>
    );
}

export default Create;