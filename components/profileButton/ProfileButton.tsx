import React from 'react';
import Image from 'next/image';
import chevron from "@/app/assets/images/chevron-down.svg"

import { useSession } from 'next-auth/react';
const ProfileButton: React.FC = () => {

  const { data: session, status } = useSession();
  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    const dropdown = event.currentTarget.nextElementSibling as HTMLDivElement;
    if (dropdown) {
      dropdown.classList.toggle('hidden');
    }
  };

  return (
    <div className="relative flex items-center space-x-4">
      <div className="relative">
        <button
          className="w-[191px] h-[60px] px-[25px] py-[21px] border-[#353C4A] bg-[#181E29] shadow-[0px_4px_10px_0px_#0000001A] text-white rounded-full flex items-center space-x-2"
          onClick={toggleDropdown}
        >
          <span>Welcome
            
            <pre>{session?.user?.name}</pre>
            
            
            </span>
        
          <Image src={chevron} alt="down" />
        </button>
        <div
          className="hidden absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-48"
        >
          <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</a>
          <a href="/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</a>
        </div>
      </div>
      <div className="relative">
        <button className="bg-blue-600 rounded-full p-2">2</button>
      </div>
    </div>
  );
};

export default ProfileButton;

// await signOut({ callbackUrl: '/login' });
// }

// // {/*  */}






