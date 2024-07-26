// import React from 'react';

// const Home: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-[#0b0e14] flex flex-col items-center justify-center py-20">
//       <header className="absolute top-4 right-4 flex items-center space-x-4">
//         <div className="relative">
//           <button className="bg-[#181E29] text-white px-4 py-2 rounded-full flex items-center space-x-2">
//             <span>Welcome Mohammed</span>
//             <svg
//               className="w-4 h-4"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M6 9l6 6 6-6" />
//             </svg>
//           </button>
//           <div className="hidden absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-48">
//             <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</a>
//             <a href="/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</a>
//           </div>
//         </div>
//         <button className="bg-blue-600 rounded-full p-2 relative">
//           <span className="text-white">2</span>
//         </button>
//       </header>
      
//       <main className="flex flex-col items-center space-y-4">
//         <div className="flex flex-col items-center space-y-4 w-full max-w-md">
//           <div className="flex items-center w-full">
//             <input
//               type="text"
//               placeholder="Enter the link to shorten here"
//               className="flex-grow p-4 bg-[#181E29] border border-[#353C4A] text-white rounded-full focus:outline-none"
//             />
//           </div>
//           <div className="flex items-center w-full">
//             <input
//               type="text"
//               placeholder="Enter custom slug"
//               className="flex-grow p-4 bg-[#181E29] border border-[#353C4A] text-white rounded-full focus:outline-none"
//             />
//             <button className="bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none">
//               Auto Generate
//             </button>
//           </div>
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none">
//             Shorten Now!
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Home;


"use client"
import React, { useState } from 'react';
import { nanoid } from 'nanoid';

const Home: React.FC = () => {
  const [url, setUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async () => {
    const response = await fetch('/api/shortUrl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, customSlug }),
    });

    const data = await response.json();
    if (response.ok) {
      setShortUrl(data.shortUrl);
    //   window.location.href = data.shortUrl;
    window.location.assign("/main");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] flex flex-col items-center justify-center py-20">
      <header className="absolute top-4 right-4 flex items-center space-x-4">
        <div className="relative">
          <button className="bg-[#181E29] text-white px-4 py-2 rounded-full flex items-center space-x-2">
            <span>Welcome Saba</span>
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <div className="hidden absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-48">
            <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</a>
            <a href="/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</a>
          </div>
        </div>
        <button className="bg-blue-600 rounded-full p-2 relative">
          <span className="text-white">2</span>
        </button>
      </header>

      <main className="flex flex-col items-center space-y-4">
        <div className="flex flex-col items-center space-y-4 w-full max-w-md">
          <div className="flex items-center w-full">
            <input
              type="text"
              placeholder="Enter the link to shorten here"
              className="flex-grow p-4 bg-[#181E29] border border-[#353C4A] text-white rounded-full focus:outline-none"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="flex items-center w-full">
            <input
              type="text"
              placeholder="Enter custom slug"
              className="flex-grow p-4 bg-[#181E29] border border-[#353C4A] text-white rounded-full focus:outline-none"
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none"
              onClick={() => setCustomSlug(nanoid(6))}
            >
              Auto Generate
            </button>
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none"
            onClick={handleSubmit}
          >
            Shorten Now!
          </button>
        </div>
        {shortUrl && (
          <div className="mt-4 text-white">
            Short URL: <a href={shortUrl} className="underline">{shortUrl}</a>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
