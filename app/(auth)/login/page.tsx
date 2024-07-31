import React from "react";
import firstImage from "@/app/assets/images/Cubes.svg";
import secondImage from "@/app/assets/images/Swirl.svg";
import Link from "next/link";
import LoginForm from "@/components/loginForm/LoginForm"; 

const Page = () => {
  return (
    <>
      <div   style={{
            backgroundImage: `url(${firstImage.src}), url(${secondImage.src})`,
            // animation: 'bg-animation 10s infinite alternate',
          }} 
          className="  items-center justify-center min-h-screen bg-[#0B101B] overflow-x-hidden "
          >
        {/* <div
          className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat animate-bg"
        
        /> */}
  
        <div className="relative pl-[52px] pr-[55px] pt-[40px]   mb-[216px] lg:w-[1728px] lg:h-[100px] flex items-center justify-between ">
        <p className="text-[#FFFFFF80] font-light text-[14px] ml-[110px] mt-[6px] mb-[16px] ">®</p> 
          <h2 className="  bg-gradient-to-r from-[#EB568E] to-[#144EE3] text-transparent bg-clip-text font-extrabold text-[36.91px] leading-[45.44px]">
            Linkly
          </h2>
          <p></p>
        </div>

        <div className="text-center flex  flex-col items-center  ">
          <h1 className="text-[60px] py-[20px] lg:h-[81px] lg:w-[966px] mb-[20px]  font-extrabold  sm:text-[35px] 
         
             lg:text-[60px] lg:leading-[41.48px]"   style={{
            background:
              "linear-gradient(45deg, #144EE3, #EB568E,#A353AA,#144EE3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Shorten Your Loooong Links :)
          </h1>
          <p className="text-[#C9CED6] mb-[46px] text-[16px] font-light leading-[23.5px]">
            Linkly is an efficient and easy-to-use URL shortening service that streamlines your <br/> online experience.
          </p>

          <LoginForm />

          <div className="flex text-center font-light text-[14px] mt-[80px] text-[#C9CED6] lg:mt-[248px] md:mt-[40px] sm:mt-[200px]">
          <Link href="/register">
            <h1 className="text-[#144EE3] underline mr-[5px]">Register</h1>
          </Link>
          if not already registered
        </div>
      

        </div>
      </div>
    </>
  );
};

export default Page;
