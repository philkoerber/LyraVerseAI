import React from "react";

function Header(props) {
  return (
    <header className="bg-neutral-400 py-2 px-8 flex justify-between items-center border-black border-b-2">
      <div className="flex items-center">
        <span className="text-lg font-bold flex justify-center items-center gap-2">
          <img className="w-12" src="/logo.svg" />
          <div className="text-2xl">
            LyraVerse<p className="font-normal inline">AI</p>
          </div>
        </span>
      </div>

      <div className="space-x-4 text-xl">
        <a
          href="/account/create"
          className="hover:text-gray-400 transition duration-300">
          Create
        </a>
        <a
          href="/account/settings"
          className="hover:text-gray-400 transition duration-300">
          Profile
        </a>
      </div>
    </header>
  );
}

export default Header;
