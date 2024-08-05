


// "use client"

// import React from 'react';
// import { useChangePassword } from '@/hooks/useChangePassword';

// const Page = () => {
//   const {
//     password,
//     confirmPassword,
//     handlePasswordChange,
//     handleConfirmPasswordChange,
//     handleSubmit,
//   } = useChangePassword();

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <title>Change Password</title>

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
//         <h2 className="text-4xl text-[60px] font-bold bg-gradient-to-r p-6 from-[#EB568E] to-[#144EE3] text-transparent bg-clip-text text-center mb-6">
//           Change Your Password
//         </h2>
//         <form className="w-2/3" onSubmit={handleSubmit}>
//           <div className="relative mb-6">
//             <input
//               type="password"
//               placeholder="Enter new password"
//               className="w-full h-[76px] pl-4 pr-[178px] rounded-[48px] border-4 border-[#353C4A] bg-[#181E29] focus:outline-none focus:border-purple-400 text-white"
//               value={password}
//               onChange={handlePasswordChange}
//             />
//           </div>
//           <div className="relative mb-6">
//             <input
//               type="password"
//               placeholder="Confirm new password"
//               className="w-full h-[76px] pl-4 pr-[178px] rounded-[48px] border-4 border-[#353C4A] bg-[#181E29] focus:outline-none focus:border-purple-400 text-white"
//               value={confirmPassword}
//               onChange={handleConfirmPasswordChange}
//             />
//           </div>
//           <button className="bg-blue-500 w-[178px] h-[76px] px-[25.05px] py-[21px] rounded-[48px]" type="submit">
//             Change Password
//           </button>
//         </form>
//       </main>
//     </div>
//   );
// };

// export default Page;

// src/pages/changePassword.tsx
"use client";

import React from 'react';
import { useChangePassword } from '@/hooks/useChangePassword';
import firstImage from "@/app/assets/images/Cubes.svg";
import secondImage from "@/app/assets/images/Swirl.svg";

const Page = () => {
  const {
    password,
    confirmPassword,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
    loading,
    
  } = useChangePassword();

  return (
    <div style={{
      backgroundImage: `url(${firstImage.src}), url(${secondImage.src})`,
      // animation: 'bg-animation 10s infinite alternate',
    }}
     className="min-h-screen bg-[#0B101B] text-white overflow-hidden">
      <title>Change Password</title>

      <header className="p-4 flex justify-between items-center  pt-[40px] pl-[52px] pr-[55px]">
        <h2 className="bg-gradient-to-r from-[#EB568E] to-[#144EE3] text-gradient bg-clip-text text-transparent font-extrabold text-[36.91px] leading-[45.44px] text-center">
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

      <main className="flex flex-col items-center justify-center mt-20">
        <h2 className="text-4xl text-[60px] xs:text-[30px] leading-[50px] font-bold bg-gradient-to-r p-6 from-[#EB568E] to-[#144EE3] text-transparent bg-clip-text text-center mb-6">
          Change Your Password
        </h2>
        <form className=" text-center" onSubmit={handleSubmit}>
          <div className=" mb-6">
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full lg:w-[659px] h-[76px] pr-12 pl-6  rounded-[48px] border-4 border-[#353C4A] bg-[#181E29] focus:outline-none focus:border-purple-400 text-white"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="relative mb-6">
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full lg:w-[659px] h-[76px] pr-12 pl-6 rounded-[48px] border-4 border-[#353C4A] bg-[#181E29] focus:outline-none focus:border-purple-400 text-white"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <button
            className="bg-[#144EE3] xs:py-[10px] xs:w-[151px] h-[60px]  w-[260px] text-[#FFFFFF] font-semibold text-[16px] py-[21px] px-[25.05px] border border-solid border-[#144EE3] shadow-[10px_9px_22px_0px_#144EE361] rounded-[48px] "
            type="submit"
            disabled={loading}
          >
            {loading ? 'Changing...' : 'Change Password'}
          </button>
        </form>
        {/* {success && <p className="text-green-500 mt-4">Password changed successfully</p>}
        {error && <p className="text-red-500 mt-4">Error changing password: {error}</p>} */}
      </main>
    </div>
  );
};

export default Page;

