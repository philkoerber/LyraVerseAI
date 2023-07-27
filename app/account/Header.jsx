import React from 'react';

function Header(props) {

  return (
    <header className="bg-gray-800 py-4 px-8 flex justify-between items-center">
     
      <div className="flex items-center">
        <span className="text-white text-lg font-bold">Your Logo</span>
      </div>

      <div className="space-x-4">
        <a
          href="/account/create"
          className="text-white hover:text-gray-400 transition duration-300"
        >
          Create
        </a>
        <a
          href="/account/settings"
          className="text-white hover:text-gray-400 transition duration-300"
        >
          Profile
        </a>
      </div>
    </header>
  );
}

export default Header;