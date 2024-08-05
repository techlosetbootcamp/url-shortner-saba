// components/Header.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import sign from "@/app/assets/images/sign-in.svg";

const Header: React.FC = () => {
  return (
    <header className="pl-[52px] xs:px-[25px] pr-[55px] pt-[40px] flex justify-between items-center">
      <h2 className="bg-gradient-to-r from-[#EB568E] to-[#144EE3] text-gradient bg-clip-text text-transparent font-extrabold text-[36.91px] leading-[45.44px] text-center">
        Linkly
      </h2>
      <div>
        <button className="w-[123.19px] xs:h-[45px] xs:py-[13px] h-[60px] text-[#FFFFFF] mr-5 xs:mr-[0px] px-[25.19px] py-[21px] font-semibold text-[16px] rounded-[48px] border border-solid border-[#353C4A] bg-[#181E29] shadow-[0_4px_10px_0px_rgba(0,0,0,0.1a)]">
          <Link href="/login">Login</Link><Image className='inline ml-1' src={sign} alt='login' />
        </button>
        <button className="bg-[#144EE3] xs:hidden w-[178px] text-[#FFFFFF] font-semibold text-[16px] h-[60px] py-[21px] px-[25.05px] border border-solid border-[#144EE3] shadow-[10px_9px_22px_0px_#144EE361] rounded-[48px]">
          <Link href="/register">Register Now</Link>
        </button>
      </div>
    </header>
  );
}

export default Header;
