


// "use client";

// import React from 'react';
// import { useForgotPassword } from '@/hooks/useForgetPassword';

// const Page = () => {
//   const { email, handleEmailChange, handleSubmit } = useForgotPassword();

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <title>Linkly Clone - Forgot Password</title>
//       <header className="p-4 flex justify-between items-center">
//         <h2 className="bg-gradient-to-r from-[#EB568E] to-[#144EE3] text-gradient bg-clip-text text-transparent font-extrabold text-[36.91px] leading-[45.44px] text-center">
//           Linkly
//         </h2>
//         <div>
//           <button className="mr-4 bg-gray-800 w-[123.19px] h-[60px] px-[25.19px] py-[21px] gap-[10px] rounded-[48px]">
//             Login
//           </button>
//           <button className="bg-blue-500 w-[178px] h-[60px] pt-[21px] pr-[25.05px] pb-[21px] pl-[25px] gap-0 rounded-[48px]">
//             Register Now
//           </button>
//         </div>
//       </header>
//       <main className="flex flex-col items-center justify-center mt-20">
//         <h2 className="text-4xl text-[60px] font-bold p-6 bg-gradient-to-r from-[#EB568E] to-[#144EE3] text-transparent bg-clip-text text-center mb-6">
//           Forgot Your Password?
//         </h2>
//         <p className="text-center text-gray-400 mb-8 text-[16px] font-light">
//           Enter your email address below and we'll send you a link to reset your password.
//         </p>
//         <form className="w-2/3" onSubmit={handleSubmit}>
//           <div className="relative mb-6">
//             <input
//               type="email"
//               value={email}
//               onChange={handleEmailChange}
//               placeholder="Enter your email"
//               className="w-full h-[76px] pl-4 pr-[178px] rounded-[48px] border-4 border-[#353C4A] bg-[#181E29] focus:outline-none focus:border-purple-400 text-white"
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-500 w-[178px] h-[76px] px-[25.05px] py-[21px] rounded-[48px]"
//           >
//             Send Reset Link
//           </button>
//         </form>
//         <p className="text-sm mt-4">
//           Remember your password?{' '}
//           <a href="#" className="text-blue-500 underline">
//             Sign In
//           </a>
//         </p>
//       </main>
//     </div>
//   );
// };

// export default Page;


// src/pages/forgotPassword.tsx
// src/pages/forgotPassword.tsx
"use client";

import React from 'react';
import { useForgotPassword } from '@/hooks/useForgetPassword';
import Link from 'next/link';
import firstImage from "@/app/assets/images/Cubes.svg";
import secondImage from "@/app/assets/images/Swirl.svg";
const Page = () => {
  const { email, handleEmailChange, handleSubmit, loading } = useForgotPassword();

  return (
    <div style={{
      backgroundImage: `url(${firstImage.src}), url(${secondImage.src})`,
      // animation: 'bg-animation 10s infinite alternate',
    }}  className="min-h-screen bg-[#0B101B] text-white">
      <title>Forgot Password</title>
      <header className="p-4 flex justify-between items-center pt-[40px] pl-[52px] pr-[55px] ">
        <h2 className=" bg-gradient-to-r from-[#EB568E] to-[#144EE3] text-transparent bg-clip-text font-extrabold text-[36.91px] leading-[45.44px]">
          Linkly
        </h2>
        {/* <div>
          <button className="mr-4 bg-gray-800 w-[123.19px] h-[60px] px-[25.19px] py-[21px] gap-[10px] rounded-[48px]">
            Login
          </button>
          <button className="bg-blue-500 w-[178px] h-[60px] pt-[21px] pr-[25.05px] pb-[21px] pl-[25px] gap-0 rounded-[48px]">
            Register Now
          </button>
        </div> */}
      </header>
      <main className="flex flex-col items-center text-center justify-center mt-20">
        <h2 className="text-4xl text-[60px] leading-[50px] font-bold p-6 bg-gradient-to-r from-[#EB568E] to-[#144EE3] text-transparent bg-clip-text text-center mb-6">
          Forgot Your Password?
        </h2>
        <p className="text-center  text-[#C9CED6] mb-[46px] text-[16px] font-light leading-[23.5px]">
          Enter your email address below and we'll send you a link to reset your password.
        </p>
        <form className="w-2/3" onSubmit={handleSubmit}>
          <div className="relative mb-6">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="w-full lg:w-[659px] h-[76px] pl-4 pr-[178px] rounded-[48px] border-4 border-[#353C4A] bg-[#181E29] focus:outline-none focus:border-purple-400 text-white"
            />
          </div>
          <button
            type="submit"
            className="bg-[#144EE3]  h-[60px] w-[176px] text-[#FFFFFF] font-semibold text-[16px] py-[21px] px-[25.05px] border border-solid border-[#144EE3] shadow-[10px_9px_22px_0px_#144EE361] rounded-[48px]  "
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        {/* {success && <p className="text-green-500 mt-4">Password reset email sent</p>}
        {error && <p className="text-red-500 mt-4">Error sending password reset email: {error}</p>} */}
        <p className="flex text-center font-light text-[14px] text-[#C9CED6] mt-[248px]">
          Remember your password?
          <Link href="/login" className="text-[#144EE3] underline mr-[5px]">
             Sign In
          </Link>
        </p>
      </main>
    </div>
  );
};

export default Page;

