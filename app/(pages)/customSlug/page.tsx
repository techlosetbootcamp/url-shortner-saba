


"use client"
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Image from 'next/image';
import link from "@/app/assets/images/link.svg"
import ProfileButton from "@/components/profileButton/ProfileButton"


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
    <div className="min-h-screen bg-[#0b0e14] flex flex-col items-center">
    <header className="w-full flex flex-col md:flex-row justify-between items-center pt-[44px] px-[20px] md:px-[52px] lg:px-[55px] lg:h-[104px]">
      <h1 className="bg-gradient-to-r from-[#EB568E] to-[#144EE3] text-transparent bg-clip-text font-extrabold text-[24px] md:text-[36.91px] leading-[30px] md:leading-[45.44px]">
        Linkly
      </h1>
      <div className="flex items-center mt-4 md:mt-0">
        <ProfileButton />
      </div>
    </header>
  
    <main className="flex flex-col items-center text-center mt-[80px] md:mt-[352px]">
      <div className="flex flex-col items-center w-full px-4 md:px-0">
        <div className="flex items-center w-full relative mb-[24px]">
          <span className="absolute left-4 text-white">
            <Image src={link} alt="link" />
          </span>
          <input
            type="text"
            placeholder="Enter the link to shorten here"
            className="py-[16px] md:py-[24px] pl-[3rem] w-full md:w-[700px] lg:w-[1100px] bg-[#181E29] border border-[#353C4A] text-white rounded-full focus:outline-none"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
  
        <div className="flex items-center w-full relative mb-[24px]">
          <span className="absolute left-4 text-white">
            <Image src={link} alt="link" />
          </span>
          <input
            type="text"
            placeholder="Enter custom slug"
            className="py-[16px] md:py-[24px] pl-[3rem] w-full md:w-[700px] lg:w-[1100px] bg-[#181E29] border border-[#353C4A] text-white rounded-full focus:outline-none"
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value)}
          />
          <button
            className="bg-[#144EE3] text-[#FFFFFF] rounded-[48px] w-[140px] md:w-[183px] h-[40px] md:h-[60px] sm:w-[100px] font-semibold text-[14px] md:text-[16px] absolute right-2 border border-solid border-[#144EE3] shadow-[10px_9px_22px_0px_#144EE361]"
            onClick={() => setCustomSlug(nanoid(6))}
          >
            Auto Generate
          </button>
        </div>
  
        <button
          className="bg-[#144EE3] text-[#FFFFFF] w-[200px] md:w-[268px] h-[50px] md:h-[60px] rounded-[48px] font-semibold text-[14px] md:text-[16px] focus:outline-none mt-[24px] border border-solid border-[#144EE3] shadow-[10px_9px_22px_0px_#144EE361]"
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
