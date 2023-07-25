import React from 'react';

function Header(props) {
  return (
    <header className="bg-gray-800 py-4 px-8 flex justify-between items-center">
      {/* Logo on the left */}
      <div className="flex items-center">
        {/* <img
          src="/path/to/your/logo.png" // Replace with the path to your logo image
          alt="Logo"
          className="h-8 w-auto mr-4"
        /> */}
        <span className="text-white text-lg font-bold">Your Logo</span>
      </div>

      {/* Links on the right */}
      <div className="space-x-4">
        <a
          href="/link1"
          className="text-white hover:text-gray-400 transition duration-300"
        >
          Link 1
        </a>
        <a
          href="/link2"
          className="text-white hover:text-gray-400 transition duration-300"
        >
          Link 2
        </a>
        {/* Add more links as needed */}
      </div>
    </header>
  );
}

export default Header;