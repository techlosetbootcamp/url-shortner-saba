"use client";
import React from "react";
import Image from "next/image";
import IMAGES from "@/src/constants/constants";
import { UrlFormProps } from "@/src/types/types";
import { copyToClipboard } from "@/src/utils/copyurl";

const UrlForm: React.FC<UrlFormProps> = ({
  url,
  setUrl,
  handleSubmit,
  loading,
  remainingLinks,
}) => {
  return (
    <>
      <h2 className=" xs:text-[35px]  text-[60px] py-6 px-8 font-extrabold bg-gradient-to-r from-gradBlue via-gradPink to-gradBlue text-transparent bg-clip-text text-center mb-[20px]">
        Shorten Your Loooong Links :)
      </h2>
      <p className="text-center text-secondaryText mb-8 text-[16px] font-light w-full max-w-[634px]">
        Linkly is an efficient and easy-to-use URL shortening service that
        streamlines your
        <br />
        online experience.
      </p>
      <div className="relative flex items-center xl:w-[659px] xs:mx-[20px]">
        <Image
          src={IMAGES.link}
          alt="link"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6"
        />
        <input
          type="text"
          placeholder="Enter the link here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full sm:w-[378px] md:w-[400px] lg:w-[500px] xl:w-[659px] h-[76px] xs:h-[64px] pl-[3rem] pr-[178px] tm:pr-[60px] rounded-[48px] border-4 border-inputBorder bg-darkGrey focus:outline-none focus:border-focusInput text-primary"
        />
        <button
          onClick={handleSubmit}
          className="absolute right-0 top-0 bottom-0 text-[16px] rounded-[48px] mt-2 shadow-[10px_9px_22px_0px_#144EE361] mr-2 bg-gradBlue w-[178px] h-[60px] px-[25px]  block xs:hidden"
          disabled={loading}
        >
          Shorten Now
        </button>
        <Image
          src={IMAGES.short}
          alt="Alternate Image"
          className="absolute right-0 top-0 bottom-0 w-[60px] h-[60px] mt-2 mr-2 rounded-[48px] hidden xs:block"
        />
      </div>
      <div className="text-secondaryText font-light text-[14px] flex flex-row items-center mt-[32px]">
        <Image
          onClick={(e) => copyToClipboard(e, url)}
          className="inline ml-1"
          src={IMAGES.clip}
          alt="clip"
          style={{ width: "auto", height: "auto" }}
        />
        <h1 className="pb-1">Auto Paste from Clipboard</h1>
      </div>
      <div className="text-secondaryText mt-[25px] font-light text-[14px] text-center mx-[59px]">
        You can create
        <span className="text-gradPink text-[14px] font-bold">
          &nbsp;0{remainingLinks}
        </span>
        &nbsp;more links.
        <br className="sm:hidden" />
        Register Now to enjoy Unlimited usage
        <Image className="inline ml-[6px]" src={IMAGES.ques} alt="ques" />
      </div>
    </>
  );
};

export default UrlForm;
