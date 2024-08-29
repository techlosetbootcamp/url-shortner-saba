import React from "react";
import MainSection from "@/src/components/mainSection/MainSection";
import Link from "next/link";
import IMAGES from "@/src/constants/constants";
import Image from "next/image";
import sign from "@/public/assets/images/SignIn.svg";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Shortner App",
  description: "Shorten Yours Long Links.",
  icons: {
    icon: `${process.env.NEXTAUTH_URL}/assets/images/Linkly.svg`,
  },
};

const HomePage: React.FC = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGES.cube.src}), url(${IMAGES.swirl.src})`,
      }}
      className="min-h-screen bg-background text-primary relative"
    >
      <header className="pl-[52px] xs:px-[25px] pr-[55px] pt-[40px] flex justify-between items-center">
        <h2 className="bg-gradient-to-r from-gradPink to-gradBlue text-gradient bg-clip-text text-transparent font-extrabold text-[36.91px] leading-[45.44px] text-center">
          Linkly
        </h2>
        <div>
          <button className="w-[123.19px] xs:h-[45px] xs:py-[13px] h-[60px] text-primary mr-5 xs:mr-[0px] px-[25.19px]  font-semibold text-[16px] rounded-[48px] border border-solid border-inputBorder bg-darkGrey shadow-[0_4px_10px_0px_rgba(0,0,0,0.1a)]">
            <Link href="/login">Login</Link>
            <Image className="inline ml-1" src={sign} alt="login" />
          </button>
          <button className="bg-gradBlue xs:hidden w-[178px] text-primary font-semibold text-[16px] h-[60px]  px-[25.05px] border border-solid border-gradBlue shadow-[10px_9px_22px_0px_#144EE361] rounded-[48px]">
            <Link href="/register">Register Now</Link>
          </button>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center mt-[130px] relative">
        <MainSection />
      </main>
      <div className="sticky bottom-0 h-[70px] flex justify-center items-center text-secondaryText w-full py-4  backdrop-blur-[10px] ">
        <Link href="/register">
          <h1 className="text-gradBlue underline mr-[5px]">Register Now</h1>
        </Link>
        to enjoy Unlimited History
      </div>
    </div>
  );
};

export default HomePage;
