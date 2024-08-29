"use client";
import React from "react";
import Image from "next/image";
import IMAGES from "@/src/constants/constants";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ProfileButton: React.FC = () => {
  const { data: session } = useSession();
  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    const dropdown = event.currentTarget.nextElementSibling as HTMLDivElement;
    if (dropdown) {
      dropdown.classList.toggle("hidden");
    }
  };

  return (
    <div className="relative flex items-center space-x-4">
      <div className="relative">
        <button
          className="w-[191px] h-[60px] px-[25px] py-[21px] border-inputBorder bg-darkGrey shadow-[0px_4px_10px_0px_#0000001A] text-primary rounded-full flex items-center space-x-2"
          onClick={toggleDropdown}
        >
          <span>
            Welcome
            <pre>{session?.user?.name}</pre>
          </span>

          <Image src={IMAGES.chevron} alt="down" />
        </button>
        <div className="hidden absolute right-0 h-[71px] bg-darkGrey border rounded-md shadow-lg w-48">
          <Link
            href="/profile"
            className="block px-4 py-2 text-primary border border-solid border-white hover:bg-gradPink"
          >
            Profile
          </Link>
          <Link
            href="/"
            className="block px-4 pb-2 text-primary hover:bg-gradPink"
          >
            Logout
          </Link>
        </div>
      </div>
      <div className="relative pt-[16px]">
        <Image src={IMAGES.saram} alt="alaram" priority />
      </div>
    </div>
  );
};

export default ProfileButton;
