// components/URLTable.tsx
import React from 'react';
import Image from 'next/image';
import QRCode from 'react-qr-code';
import { format } from 'date-fns';
import OriginalUrlWithFavicon from '@/components/urlFevicon/UrlFevicon';
import active from "@/app/assets/images/Active.svg";
import inactive from "@/app/assets/images/Inactive.svg";
import edit from "@/app/assets/images/edit.svg";
import del from "@/app/assets/images/delete.svg";
import copy from "@/app/assets/images/copy.svg";
import { UrlData } from '@/app/types/types'; // Ensure UrlData type is defined in your types file
import dat from "@/app/assets/images/Date.svg"

type URLTableProps = {
  urls: UrlData[];
  onStatusChange: (id: string, status: string) => void;
  onEdit: (shortUrl: string) => void;
  onDelete: (id: string) => void;
  onCopy: (url: string) => void;
};

const URLTable: React.FC<URLTableProps> = ({ urls, onStatusChange, onEdit, onDelete, onCopy }) => {
  return (
    <div className="hidden mx-[57px] md:block overflow-x-auto">
      <table className="min-w-full bg-[#0F131A] text-left text-sm border-spacing-y-1 border-separate">
        <thead className="text-[15px] font-bold text-[#C9CED6]">
          <tr>
            <th className="py-[26px] pl-[25px] w-[299px]">Short Link</th>
            <th className="p-4 pl-[42px] w-[462px]">Original Link</th>
            <th className="pl-[16px]">QR Code</th>
            <th className="pl-[42px] w-[95px]">Clicks</th>
            <th className="pl-[46px]">Status</th>
            <th className=" pl-[46px] w-[177px] lm:pl-[40px]">
              Date
              <Image className="hidden 2xl:inline ml-1" src={dat} alt="date" />
            </th>
            <th className="pl-[42px] w-[165px] pr-[25px]">Action</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((urlRecord) => (
            <tr key={urlRecord.id} className="bg-[#0F131A] text-[14px] font-light text-[#C9CED6]">
              <td className="pl-6 pr-6">
                <div className="inline-flex items-center">
                  <span>{`http://localhost:3000/api/redirect/${urlRecord.shortUrl}`}</span>
                  <Image
                    className="cursor-pointer ml-2"
                    onClick={() => onCopy(`http://localhost:3000/api/redirect/${urlRecord.shortUrl}`)}
                    src={copy}
                    alt="copy"
                  />
                </div>
              </td>
              <td className="px-4">
                <OriginalUrlWithFavicon url={urlRecord.originalUrl} />
              </td>
              <td className="p-4">
                <QRCode value={urlRecord.originalUrl} size={64} />
              </td>
              <td className="pl-10">{urlRecord.visitCount}</td>
              <td className="pl-10">
                <div
                  onClick={() => onStatusChange(urlRecord.shortUrl, urlRecord.status === 'active' ? 'inactive' : 'active')}
                  className={`flex items-center cursor-pointer ${urlRecord.status === 'active' ? 'text-green-500' : 'text-yellow-600'}`}
                >
                  {urlRecord.status === 'active' ? (
                    <>
                      Active <Image src={active} alt="active" className="ml-2" />
                    </>
                  ) : (
                    <>
                      Inactive <Image src={inactive} alt="inactive" className="ml-2" />
                    </>
                  )}
                </div>
              </td>
              <td className="pl-14">
                {format(new Date(urlRecord.createdAt), "MMM - dd -yyyy")}
              </td>
              <td className="p-4 flex space-x-2">
                <Image
                  src={edit}
                  alt="edit"
                  onClick={() => onEdit(urlRecord.shortUrl)}
                  className="cursor-pointer"
                />
                <Image
                  src={del}
                  alt="delete"
                  onClick={() => onDelete(urlRecord.shortUrl)}
                  className="cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default URLTable;
