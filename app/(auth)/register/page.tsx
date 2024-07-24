import React from "react";
import firstImage from "@/app/assets/images/Cubes.svg"
import secondImage from "@/app/assets/images/Swirl.svg"
import Link from "next/link";
import RegisterForm from "@/components/registerForm/RegisterForm"; 

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B101B] relative overflow-hidden">
    <div
      className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat animate-bg"
      style={{
        backgroundImage: `url(${secondImage.src}), url(${firstImage.src})`,
        animation: 'bg-animation 10s infinite alternate',
      }}
    />
    <div className="z-10 text-center relative">
      <div className="">
        <p>®</p>
      <h2 className="bg-gradient-to-r from-[#EB568E] to-[#144EE3] text-transparent bg-clip-text font-extrabold text-[36.91px] leading-[45.44px]">
        Linkly
      </h2>
      </div>
      <h1 className="text-[60px] font-extrabold bg-gradient-to-r from-[#EB568E] to-[#144EE3] text-transparent bg-clip-text leading-[80.01px] mb-6 sm:text-[35px] sm:leading-[41.48px]">
        Shorten Your Loooong Links :)
      </h1>
      <p className="text-gray-400 mb-8 text-[16px] font-light leading-[23.5px]">
        Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience.
      </p>
    

      <RegisterForm />

      <div className="flex text-center text-[#C9CED6] mt-[248px]">
          <Link href="/login">
            <h1 className="text-[#144EE3] underline mr-[5px]">login</h1>
          </Link>
          if not already login
        </div>


    </div>
  </div>
     
 
  );
};

export default App;