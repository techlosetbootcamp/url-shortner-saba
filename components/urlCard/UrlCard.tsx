// components/UrlCard.tsx

import React from 'react';
import QRCode from 'react-qr-code';
import Image from 'next/image';
import { format } from 'date-fns';
import OriginalUrlWithFavicon from '@/components/urlFevicon/UrlFevicon';
import copy from "@/app/assets/images/copy.svg";
import active from "@/app/assets/images/Active.svg";
import inactive from "@/app/assets/images/Inactive.svg";
import show from "@/app/assets/images/chevron-down.svg";

type UrlData = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  visitCount: number;
  createdAt: string;
  updatedAt: string;
  status: string;
};

type UrlCardProps = {
  urls: UrlData[];
  expandedRows: { [key: string]: boolean };
  handleExpand: (id: string) => void;
  handleCopyToClipboard: (url: string) => void;
  handleStatusChange: (id: string, status: string) => void;
};

const UrlCard: React.FC<UrlCardProps> = ({ urls, expandedRows, handleExpand, handleCopyToClipboard, handleStatusChange }) => {
  return (
    <div className="block md:hidden overflow-x-auto">
    <h2 className="text-[#C9CED6] text-lg font-bold mb-4 bg-[#181E29] xs:text pt-[16px]  pl-[25px] w-[376] h-[63px] ml-[28px] mr-[26px]">Shorten Links</h2>
    {urls.map((urlRecord) => (
      <div key={urlRecord.id} className="bg-[#181E29]  bg-opacity-25 p-4 mb-4 text-[#C9CED6] rounded-md  ml-[20px] mr-[27px]   py-[14px]   ">
<div className="flex flex-wrap justify-between w-full max-w-md md:max-w-lg lg:max-w-xl items-center p-2 bg-dark-800 rounded-lg">
 
  <div className="flex items-center space-x-2 flex-1 overflow-hidden">
 
    <div className="w-full sm:w-[calc(100%-150px)] max-w-xs overflow-hidden text-[14px] text-white truncate">
      {`http://localhost:3000/api/redirect/${urlRecord.shortUrl}`}
    </div>

  
    <Image
      className="inline cursor-pointer "
      onClick={() => handleCopyToClipboard(`http://localhost:3000/api/redirect/${urlRecord.shortUrl}`)}
      src={copy}
      alt="copy"
    />
  </div>


  <div className="flex items-center mt-2 sm:mt-0 ml-[80px]">
    <Image
      onClick={() => handleExpand(urlRecord.id)}
      src={show}
      alt="toggle details"
      className="cursor-pointer ml-0 sm:ml-4"  
    />
  </div>
</div>

{expandedRows[urlRecord.id] && (
  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="mb-2">
      <strong>Original Link:</strong> <OriginalUrlWithFavicon url={urlRecord.originalUrl} />
    </div>
    <div className="mb-2">
      <strong>QR Code:</strong> <QRCode value={urlRecord.originalUrl} size={50} />
    </div>
    <div className="mb-2">
      <strong>Clicks:</strong> {urlRecord.visitCount}
    </div>
    <div className="mb-2">
      <strong>Status:</strong>
      <div
        onClick={() => handleStatusChange(urlRecord.shortUrl, urlRecord.status === 'active' ? 'inactive' : 'active')}
        className={`flex items-center ${urlRecord.status === 'active' ? 'text-green-500' : 'text-yellow-600'}`}
      >
        {urlRecord.status === 'active' ? (
          <>
            Active <Image src={active} alt="active" className="ml-2.5" />
          </>
        ) : (
          <>
            Inactive <Image src={inactive} alt="inactive" className="ml-2.5" />
          </>
        )}
      </div>
    </div>
    <div className="mb-2">
      <strong>Date:</strong> {format(new Date(urlRecord.createdAt), "MMM - dd -yyyy")}
    </div>
  </div>
)}

      </div>
    ))}


    
  </div>
  );
}

export default UrlCard;
