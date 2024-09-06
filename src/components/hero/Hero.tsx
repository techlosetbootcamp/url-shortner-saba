"use client";
import React from "react";
import Image from "next/image";
import ProfileButton from "@/src/components/profileButton/ProfileButton";
import IMAGES from "@/src/constants/constants";
import { HeaderProps } from "../../types/types";
import { copyToClipboard } from "@/src/utils/copyurl";

const Header: React.FC<HeaderProps> = ({
  url,
  setUrl,
  handleSubmit,
  loading,
}) => {
  return (
    <header className="flex items-center bg-background bg-opacity-25 justify-between w-full h-[185px] pb-[81px] pt-[44px] pl-[52px] pr-[55px]">
      <h1 className="xs:hidden pb-[2px] mr-[20px] bg-gradient-to-r from-gradPink to-gradBlue text-gradient bg-clip-text text-transparent font-extrabold text-4xl">
        Linkly
      </h1>

      <div className="flex-1 flex flex-col items-center justify-center mr-[15px] mt-[60px]">
        <div className="relative w-full max-w-[1100px]">
          <input
            type="text"
            placeholder="Enter the link here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full h-[76px] pl-4 pr-[190px] xs:pr-[30px]  rounded-[48px] tm:pl-[5px] tm:pr-[10px] border-4 border-inputBorder bg-darkGrey focus:outline-none focus:border-focusInput text-primary"
          />

          <button
            onClick={handleSubmit}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[16px]   rounded-[48px] shadow-custom bg-gradBlue w-[178px] h-[60px] px-[25.05px] py-[21px] block xs:hidden"
            disabled={loading}
          >
            {loading ? "Shortening..." : "Shorten Now!"}
          </button>

          <Image
            onClick={handleSubmit}
            src={IMAGES.short}
            alt="Alternate Image"
            className="absolute right-0 top-0 bottom-0 rounded-[48px] hidden xs:block tm:pl-[30px] tm:pt-[14px] tm:top-[3px] "
          />
        </div>

        <div className="text-secondaryText font-light text-[14px] flex items-center mt-[16px]">
          <Image
            onClick={(e) => copyToClipboard(e, url)}
            className="inline ml-1"
            src={IMAGES.clip}
            alt="clip"
            style={{ width: "auto", height: "auto" }}
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
