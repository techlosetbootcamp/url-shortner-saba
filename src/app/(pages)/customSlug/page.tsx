import React from "react";
import ProfileButton from "@/src/components/profileButton/ProfileButton";
import ShortenUrlForm from "@/src/components/generateSlug/GenerateSlug";
import IMAGES from "@/src/constants/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Slug",
  description: "Add custom slugs to your shortened URLs.",
  icons: {
    icon: `${process.env.NEXTAUTH_URL}/assets/images/Add.svg`,
  },
};
const Home: React.FC = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGES.cube.src}), url(${IMAGES.swirl.src})`,
      }}
      className="min-h-screen bg-background flex flex-col items-center"
    >
      <header className="w-full flex flex-col md:flex-row justify-between items-center pt-[44px] px-[20px] md:px-[52px] lg:px-[55px] lg:h-[104px]">
        <h1 className="bg-gradient-to-r from-gradPink to-gradBlue text-transparent bg-clip-text font-extrabold text-[24px] md:text-[36.91px] leading-[30px] md:leading-[45.44px]">
          Linkly
        </h1>
        <div className="flex items-center mt-4 md:mt-0">
          <ProfileButton />
        </div>
      </header>

      <main className="flex flex-col items-center text-center mt-[80px] md:mt-[352px]">
        <ShortenUrlForm />
      </main>
    </div>
  );
};

export default Home;
