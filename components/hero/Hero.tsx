// src/components/Header/Header.tsx
import React from 'react';
import Image from 'next/image';

import short from "@/app/assets/images/ShortenBtn.svg";
import Clip from "@/app/assets/images/Clip.svg";
import ProfileButton from "@/components/profileButton/ProfileButton";

interface HeaderProps {
  url: string;
  setUrl: (url: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const Header: React.FC<HeaderProps> = ({ url, setUrl, handleSubmit, loading }) => {
  return (
    <header className="flex items-center justify-between w-full h-[185px] pb-[81px] pt-[44px] pl-[52px] pr-[55px]">
      <h1 className="xs:hidden pb-[2px] mr-[20px] bg-gradient-to-r from-pink-500 to-blue-600 text-gradient bg-clip-text text-transparent font-extrabold text-4xl">
        Linkly
      </h1>

      <div className="flex-1 flex flex-col items-center justify-center mt-[60px]">
        <div className="relative w-full max-w-[1100px]">
          <input
            type="text"
            placeholder="Enter the link here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full h-[76px] pl-4 pr-[190px] rounded-[48px] border-4 border-[#353C4A] bg-[#181E29] focus:outline-none focus:border-purple-400 text-white"
          />

          <button
            onClick={handleSubmit}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[16px] rounded-[48px] shadow-[10px_9px_22px_0px_#144EE361] bg-[#144EE3] w-[178px] h-[60px] px-[25.05px] py-[21px] block xs:hidden"
            disabled={loading}
          >
            {loading ? 'Shortening...' : 'Shorten Now!'}
          </button>

          <Image
            onClick={handleSubmit}
            src={short}
            alt="Alternate Image"
            className="absolute right-0 top-0 bottom-0 w-[60px] h-[60px] mt-2 mr-2 rounded-[48px] hidden xs:block"
          />
        </div>

        <div className="text-[#C9CED6] font-light text-[14px] flex items-center mt-[16px]">
          <Image
            onClick={() => {
              navigator.clipboard.writeText(url);
              alert('URL copied to clipboard!');
            }}
            className="inline ml-1"
            src={Clip}
            alt="clip"
          />
          <h1 className="pb-1 ml-2 items-center">Auto Paste from Clipboard</h1>
        </div>
      </div>

      <div className="xs:hidden lm:hidden">
        <ProfileButton />
      </div>
    </header>
  );
};

export default Header;
