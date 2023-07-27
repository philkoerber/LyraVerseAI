import React from 'react';
import Lyric from './lyric/Lyric';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const initialItems = [
  "The face in the mirror doesn't belong to me; it's a disguise I wear to navigate this nightmarish dream.",
  "Reality is a kaleidoscope, shifting and fragmenting with every move.",
  "In the junkyard of the mind, words are scattered like broken glass, waiting to draw blood.",
  "We are all trapped in the Interzone, a no man's land between sanity and madness.",
  "Language is a virus, infecting our thoughts and controlling our actions.",
  "The Naked Lunch is the unfiltered truth, a banquet of raw, uncensored experiences.",
  "Control is an illusion; the puppet masters pull the strings from the shadows.",
  "Time is a rubbery construct, bending and twisting with every desire.",
  "The road to excess leads to the palace of wisdom, but we often get lost in the wilderness of indulgence.",
  "I am an alien in my own skin, an observer of the human spectacle.",
  "The cut-up technique reveals the hidden connections, the synchronicities of existence.",
  "In the junk-sick city, the dealers of illusion peddle their wares, and the addicts clamor for more.",
  "Buried beneath the surface of routine lies the chaos of desire.",
  "The typewriter is my weapon, the words my ammunition against the forces of conformity.",
  "The virus of control spreads through the wires, infecting the collective mind.",
  "We are all androids, programmed by society to play our roles.",
  "I have seen the Nova Express, hurtling through the cosmic void, carrying the secrets of the universe.",
  "The language of the dead echoes in the corridors of memory.",
  "In the junky's lament, we find the cry of a lost generation, searching for meaning in the wasteland.",
  "The intersection of reality and dreams is where the truth lies, obscured by the haze of illusion.",
];

const lyric = {
  id: "asdfasdfsaifjosfpoasasi",
  header: "william",
  lyrics: initialItems
}

async function Create(props) {
  const supabase = createRouteHandlerClient({ cookies })


      const {
    data: { session },
    } = await supabase.auth.getSession()

  
    return (
      <div className='w-screen flex justify-center items-center p-8'>

        <Lyric lyric={lyric} session={session} />
        </div>
    );
}

export default Create;