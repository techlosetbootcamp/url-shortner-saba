import React from 'react';
import Image from 'next/image';
import link from "@/app/assets/images/link.svg";
import short from "@/app/assets/images/ShortenBtn.svg";
import Clip from "@/app/assets/images/Clip.svg";
import ques from "@/app/assets/images/question-circle.svg";

type UrlFormProps = {
  url: string;
  setUrl: (url: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  remainingLinks: number;
};

const UrlForm: React.FC<UrlFormProps> = ({ url, setUrl, handleSubmit, loading, remainingLinks }) => {
  return (
    <>
      <h2 className="text-4xl xs:text-[35px] text-[60px] py-6 px-8 font-extrabold bg-gradient-to-r from-[#144EE3] via-[#EB568E] to-[#144EE3] text-transparent bg-clip-text text-center mb-[20px]">
        Shorten Your Loooong Links :)
      </h2>
      <p className="text-center text-[#C9CED6] mb-8 text-[16px] font-light w-full max-w-[634px]">
        Linkly is an efficient and easy-to-use URL shortening service that streamlines your<br />
        online experience.
      </p>
      <div className="relative flex items-center xl:w-[659px] xs:mx-[20px] ">
        <Image
          src={link}
          alt='link'
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6"
        />
        <input
          type="text"
          placeholder="Enter the link here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full sm:w-[378px] md:w-[400px] lg:w-[500px] xl:w-[659px] h-[76px] xs:h-[64px] pl-[3rem] pr-[178px] rounded-[48px] border-4 border-[#353C4A] bg-[#181E29] focus:outline-none focus:border-purple-400 text-white"
        />
        <button
          onClick={handleSubmit}
          className="absolute right-0 top-0 bottom-0 text-[16px] rounded-[48px] mt-2 shadow-[10px_9px_22px_0px_#144EE361] mr-2 bg-[#144EE3] w-[178px] h-[60px] px-[25.05px] py-[21px] block xs:hidden"
          disabled={loading}
        >
          {loading ? 'Shortening...' : 'Shorten Now!'}
        </button>
        <Image
          src={short}
          alt="Alternate Image"
          className="absolute right-0 top-0 bottom-0 w-[60px] h-[60px] mt-2 mr-2 rounded-[48px] hidden xs:block"
        />
      </div>
      <div className="text-[#C9CED6] font-light text-[14px] flex flex-row items-center mt-[32px] ">
        <Image onClick={() => {
          navigator.clipboard.writeText(url); alert('URL copied to clipboard!');
        }} className='inline ml-1' src={Clip} alt='clip' />  <h1 className='pb-1'>Auto Paste from Clipboard</h1>
      </div>
      <div className="text-[#C9CED6] mt-[25px] font-light text-[14px] text-center mx-[59px]">
        You can create <span className="text-[#EB568E] text-[14px] font-bold">0{remainingLinks}</span> more links.
        <br className="sm:hidden" />
        Register Now to enjoy Unlimited usage <Image className='inline ml-[6px]' src={ques} alt='ques' />
      </div>
    </>
  );
};

export default UrlForm;
