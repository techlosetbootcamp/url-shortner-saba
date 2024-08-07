import React from 'react';
import Image from 'next/image';
import chevron from "@/app/assets/images/chevron-down.svg"
import saram from "@/app/assets/images/alaram.svg"
import { useSession } from 'next-auth/react';
import Link from 'next/link';
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
        
          <Image  src={chevron} alt="down" />
        </button>
        <div
          className="hidden absolute right-0 h-[71px] bg-[#2f394b] border rounded-md shadow-lg w-48"
        >
          < Link  href="/profile" className="block px-4 py-2 text-white border border-solid border-white hover:bg-gray-100">Profile</ Link >
          < Link  href="/logout" className="block px-4 pb-2 text-white hover:bg-gray-100">Logout</ Link >
        </div>
      </div>
      <div className="relative pt-[16px]">
      <Image src={saram} alt="alaram"  priority  />
      </div>
    </div>
  );
};

export default ProfileButton;

// await signOut({ callbackUrl: '/login' });
// }

// // {/*  */}






