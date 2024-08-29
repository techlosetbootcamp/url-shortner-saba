import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import IMAGES from "@/src/constants/constants";
import { Metadata } from "next";
const ChangePasswordForm = dynamic(
  () => import("@/src/components/changePasswordForm/ChangePasswordForm"),
  {
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "Change Password",
  description:
    "Change your password to regain access and continue managing your URLs.",
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
      className="min-h-screen bg-background text-primary overflow-hidden"
    >
      <title>Change Password</title>

      <header className="p-4 flex justify-between items-center pt-[40px] pl-[52px] pr-[55px]">
        <h2 className="bg-gradient-to-r from-gradPink to-gradBlue text-gradient bg-clip-text text-transparent font-extrabold text-[36.91px] leading-[45.44px] text-center">
          Linkly
        </h2>
      </header>

      <main className="flex flex-col items-center justify-center mt-20">
        <Suspense fallback={<div>Loading...</div>}>
          <ChangePasswordForm />
        </Suspense>
      </main>
    </div>
  );
};

export default Page;
