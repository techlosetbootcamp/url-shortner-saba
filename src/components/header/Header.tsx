import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="pl-[52px] pr-[55px] pt-[40px] flex justify-between items-center">
      <h2 className="bg-gradient-to-r from-gradPink to-gradBlue text-gradient bg-clip-text text-transparent font-extrabold text-[36.91px] leading-[45.44px] text-center">
        Linkly
      </h2>
      <div>
        <button className="bg-gradBlue w-[178px] text-[16px] h-[60px] py-[21px] px-[25.05px] shadow-custom rounded-[48px] items-center">
          <Link href="/register">Register Now</Link>
        </button>
      </div>
      <button className="bg-gradBlue w-[178px] text-[16px] h-[60px] py-[21px] px-[25.05px] shadow-custom rounded-[48px] items-center">
        <Link href="/login">login</Link>
      </button>
    </header>
  );
};

export default Header;
