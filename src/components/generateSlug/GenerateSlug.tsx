"use client";
import React from "react";
import Image from "next/image";
import IMAGES from "@/src/constants/constants";
import { nanoid } from "nanoid";
import useShortenUrl from "./useGenerateSlug";

const ShortenUrlForm: React.FC = () => {
  const { url, setUrl, customSlug, setCustomSlug, handleSubmit } =
    useShortenUrl();

  return (
    <div className="flex flex-col items-center w-full px-4 md:px-0">
      <div className="flex items-center w-full relative mb-[24px]">
        <span className="absolute left-4 text-primary">
          <Image src={IMAGES.link} alt="link" />
        </span>
        <input
          type="text"
          placeholder="Enter the link to shorten here"
          className="py-[16px] md:py-[24px] pl-[3rem] xs:w-[340px] w-full md:w-[700px] lg:w-[1100px] bg-inputBackground border border-inputBorder text-primary rounded-full focus:outline-none"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>

      <div className="flex items-center w-full relative mb-[24px]">
        <span className="absolute left-4 text-primary">
          <Image src={IMAGES.link} alt="link" />
        </span>
        <input
          type="text"
          placeholder="Enter custom slug"
          className="py-[16px] md:py-[24px] pl-[3rem] w-full md:w-[700px] lg:w-[1100px] bg-inputBackground border border-inputBorder text-primary rounded-full focus:outline-none"
          value={customSlug}
          onChange={(e) => setCustomSlug(e.target.value)}
        />
        <button
          className="bg-gradBlue text-primary rounded-[48px] w-[140px] md:w-[183px] h-[40px] md:h-[60px] sm:w-[100px] font-semibold text-[14px] md:text-[16px] absolute right-2 border border-solid border-gradBlue shadow-custom"
          onClick={() => setCustomSlug(nanoid(6))}
        >
          Auto Generate
        </button>
      </div>

      <button
        className="bg-gradBlue text-primary w-[200px] md:w-[268px] h-[50px] md:h-[60px] rounded-[48px] font-semibold text-[14px] md:text-[16px] focus:outline-none mt-[24px] border border-solid border-gradBlue shadow-custom"
        onClick={handleSubmit}
      >
        Shorten Now!
      </button>
    </div>
  );
};

export default ShortenUrlForm;
