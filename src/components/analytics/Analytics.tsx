import React from "react";
import IMAGES from "@/src/constants/constants";
import Image from "next/image";
const Analytics = () => {
  return (
    <>
      <div className="sticky w-full max-w-full justify-center h-[112px] top-[180px] p-[21px_25.19px_21px_25px] bg-darkGrey">
        <div className="flex  sm:flex-row justify-center items-center w-full gap-4 sm:gap-[64px] mt-[20px]">
          <div className="flex items-center gap-2 text-primary cursor-pointer">
            <Image src={IMAGES.clock} alt="clock" />
            <span>History</span>
          </div>
          <div className="flex items-center gap-2 text-primary cursor-pointer">
            <Image src={IMAGES.chart} alt="chart" />
            <span>Statistics</span>
          </div>
          <div className="flex items-center gap-2 text-primary cursor-pointer">
            <Image src={IMAGES.cog} alt="cog" />
            <span>Settings</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
