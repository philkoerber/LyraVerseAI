import React from "react";

import Lyric from "./Lyric";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const config = {
  FLOWISE_URI: process.env.FLOWISE_URI,
  FLOWISE_BEARER: process.env.FLOWISE_BEARER,
};

async function Create({ params }) {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="w-screen flex justify-center items-center p-8">
      <Lyric session={session} lyricid={params.lyric} config={config} />
    </div>
  );
}

export default Create;
