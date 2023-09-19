import Link from "next/link";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const containerStyles = "p-4 flex justify-center item-center flex-col";

async function Account(props) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data, errors } = await supabase.from("lyrics").select();

  let featuredLyric = { title: "", lyrics: [] };
  if (!errors) {
    const length = data.length;
    const randomIndex = Math.floor(Math.random() * length);
    featuredLyric = data[randomIndex];
  }
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className={containerStyles}>
          <div className="text-5xl text-center">WELCOME!</div>
          <div className="text-xl text-right">...to LyraVerseAI</div>
        </div>
        <div className={containerStyles}>
          <Link href="/account/create">
            <div className="px-4 py-2 w-fit bg-green-500 hover:bg-green-200 transition duration-200 rounded">
              Create some lyrics...
            </div>
          </Link>
        </div>
        <div className={containerStyles}>
          <div className="p-2 flex flex-col gap-4">
            <div className="text-3xl text-center">{featuredLyric.title}</div>
            <div>
              {featuredLyric.lyrics.map(({ line }, i) => {
                return (
                  <div className="text-lg w-fit" key={line.id}>
                    {line}
                  </div>
                );
              })}
            </div>
            <div className="text-[12px] text-right flex flex-col break-keep">
              <div>{featuredLyric.id}</div>
              <div>{featuredLyric.created_at}</div>
            </div>
          </div>
        </div>
        <div className={containerStyles}>welcome!</div>
      </div>
    </div>
  );
}

export default Account;
