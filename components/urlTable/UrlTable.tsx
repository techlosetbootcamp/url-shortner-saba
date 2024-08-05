// components/UrlTable.tsx

import React from 'react';
import QRCode from 'react-qr-code';
import Image from 'next/image';
import { format } from 'date-fns';
import OriginalUrlWithFavicon from '@/components/urlFevicon/UrlFevicon';
import copy from "@/app/assets/images/copy.svg";
import active from "@/app/assets/images/Active.svg";
import inactive from "@/app/assets/images/Inactive.svg";
import dat from "@/app/assets/images/Date.svg";

type UrlData = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  visitCount: number;
  createdAt: string;
  updatedAt: string;
  status: string;
};

type UrlTableProps = {
  urls: UrlData[];
  handleCopyToClipboard: (url: string) => void;
  handleStatusChange: (id: string, status: string) => void;
};

const UrlTable: React.FC<UrlTableProps> = ({ urls, handleCopyToClipboard, handleStatusChange }) => {
  return (
    <div className="hidden md:block overflow-x-auto">
    <table className="min-w-full bg-[#181E29] text-left text-sm border-spacing-y-1 border-separate">
      <thead className="text-[15px] font-bold text-[#C9CED6] h-[79px] py-2">
        <tr className="h-[79px]">
          <th className="pl-6 py-6 w-[284px]">Short Link</th>
          <th className=" py-6 w-[477px]">Original Link</th>
          <th className=" py-6 w-[138px]">QR Code</th>
      
          <th className=" py-6 w-[150px] lm:pl-[40px]">Clicks</th>
          <th className=" py-6 w-[220px] lm:pl-[40px]">Status</th>
        

          <th className=" py-6 pr-6 w-[260px] lm:pl-[40px]">
            Date
            <Image className="hidden 2xl:inline ml-1" src={dat} alt="date" />
          </th>
        </tr>
      </thead>
      <tbody className="mt-1">
        {urls.map((urlRecord) => (
          <tr key={urlRecord.id} className="bg-gray-900 xl:h-16 text-[14px] font-light text-[#C9CED6]">
            <td className="pl-6 flex items-center h-22 pt-[16px] pb-[12px]  mr-[60px]">
              <span>{`http://localhost:3000/api/redirect/${urlRecord.shortUrl}`}</span>
              <Image
                className="inline cursor-pointer ml-[10px]"
                onClick={() => handleCopyToClipboard(`http://localhost:3000/api/redirect/${urlRecord.shortUrl}`)}
                src={copy}
                alt="copy"
              />
            </td>
            <td className=" py-1">
              <OriginalUrlWithFavicon url={urlRecord.originalUrl} />
            </td>
            <td className="">
              <QRCode value={urlRecord.originalUrl} size={50} />
            </td>
            <td className="pl-[30px] ">{urlRecord.visitCount}</td>
            <td className="">
              <div
                onClick={() => handleStatusChange(urlRecord.shortUrl, urlRecord.status === 'active' ? 'inactive' : 'active')}
                className={`flex items-center ${urlRecord.status === 'active' ? 'text-green-500' : 'text-yellow-600'}`}
              >
                {urlRecord.status === 'active' ? (
                  <>
                    Active <Image src={active} alt="active" className="ml-2.5  " />
                  </>
                ) : (
                  <>
                    Inactive <Image src={inactive} alt="inactive" className="ml-2.5 " />
                  </>
                )}
              </div>
            </td>
            <td className=" py-6   pl-[16px] ">
              {format(new Date(urlRecord.createdAt), "MMM - dd -yyyy")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div> 
  );
}

export default UrlTable;
