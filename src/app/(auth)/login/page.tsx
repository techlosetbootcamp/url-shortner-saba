import React from "react";
import Link from "next/link";
import IMAGES from "@/src/constants/constants";
import LoginForm from "@/src/components/loginForm/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to shorten and manage your URLs",
  icons: {
    icon: `${process.env.NEXTAUTH_URL}/assets/images/Profile.svg`,
  },
};

const Page = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${IMAGES.cube.src}), url(${IMAGES.swirl.src})`,
        }}
        className="  items-center justify-center min-h-screen bg-background overflow-x-hidden "
      >
        <div className=" pl-[52px] pr-[55px] pt-[40px]  w-full  mb-[216px]  lg:h-[100px] flex items-center justify-center ">
          <p className="text-logoBackground font-light text-[14px] text-left flex-none  ">
            ®
          </p>
          <h2 className=" text-center flex-1 bg-gradient-to-r from-gradPink to-gradBlue text-transparent bg-clip-text font-extrabold text-[36.91px] leading-[45.44px]">
            Linkly
          </h2>
        </div>

        <div className="text-center flex  flex-col items-center  ">
          <h1 className="text-[60px] py-[20px] bg-gradient-to-r from-gradPink to-gradBlue text-transparent bg-clip-text  lg:h-[81px] lg:w-[966px] mb-[20px] xs:text-[35px] font-extrabold  sm:text-[35px] lg:text-[60px] lg:leading-[41.48px]">
            Shorten Your Loooong Links :)
          </h1>
          <p className="text-secondaryText mb-[46px] text-[16px] font-light leading-[23.5px] xs:px-[20px]">
            Linkly is an efficient and easy-to-use URL shortening service that
            streamlines your <br /> online experience.
          </p>
          <LoginForm />
          <div className="flex text-center font-light text-[14px] mt-[80px] text-secondaryText lg:mt-[248px] md:mt-[40px] sm:mt-[200px]">
            <Link href="/register">
              <h1 className="text-gradBlue underline mr-[5px]">Register</h1>
            </Link>
            if not already registered
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
