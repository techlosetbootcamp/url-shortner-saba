import React from "react";
import ForgotPasswordForm from "@/src/components/forgetPasswordForm/ForgetPasswordForm";
import IMAGES from "@/src/constants/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Reset your password to regain access and continue managing your URLs.",
  icons: {
    icon: `${process.env.NEXTAUTH_URL}/assets/images/Password.svg`,
  },
};

const Page = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGES.cube.src}), url(${IMAGES.swirl.src})`,
      }}
      className="min-h-screen bg-background text-primary"
    >
      <title>Forgot Password</title>
      <header className="p-4 flex justify-between items-center pt-[40px] pl-[52px] pr-[55px] ">
        <h2 className=" bg-gradient-to-r from-gradPink to-gradBlue text-transparent bg-clip-text font-extrabold text-[36.91px] leading-[45.44px]">
          Linkly
        </h2>
      </header>
      <ForgotPasswordForm />
    </div>
  );
};

export default Page;
