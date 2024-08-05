// components/CardView.tsx
import React from 'react';
import Image from 'next/image';
import QRCode from 'react-qr-code';
import { format } from 'date-fns';
import OriginalUrlWithFavicon from '@/components/urlFevicon/UrlFevicon';
import active from "@/app/assets/images/Active.svg";
import inactive from "@/app/assets/images/Inactive.svg";
import copy from "@/app/assets/images/copy.svg";
import show from "@/app/assets/images/chevron-down.svg";
import edit from "@/app/assets/images/edit.svg";
import del from "@/app/assets/images/delete.svg";
import { UrlData } from '../../app/types/types'; // Ensure UrlData type is defined in your types file

type CardViewProps = {
  urls: UrlData[];
  expandedRows: { [key: string]: boolean };
  onExpand: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
  onEdit: (shortUrl: string) => void;
  onDelete: (id: string) => void;
  onCopy: (url: string) => void;
};

const CardView: React.FC<CardViewProps> = ({ urls, expandedRows, onExpand, onStatusChange, onEdit, onDelete, onCopy }) => {
  return (
    <div className="block md:hidden overflow-x-auto">
      <h2 className="text-[#C9CED6] text-lg font-bold mb-4 bg-[#0F131A] xs:text pt-[16px] pl-[25px] w-[376px] h-[63px] ml-[28px] mr-[26px]">Shorten Links</h2>
      {urls.map((urlRecord) => (
        <div key={urlRecord.id} className="bg-[#0F131A] bg-opacity-25 p-4 mb-4 text-[#C9CED6] rounded-md ml-[20px] mr-[27px] py-[14px]">
          <div className="flex flex-wrap justify-between w-full max-w-md md:max-w-lg lg:max-w-xl items-center p-2 bg-dark-800 rounded-lg">
            <div className="flex items-center space-x-2 flex-1 overflow-hidden">
              <div className="w-full sm:w-[calc(100%-150px)] max-w-xs overflow-hidden text-[14px] text-white truncate">
                {`http://localhost:3000/api/redirect/${urlRecord.shortUrl}`}
              </div>
              <Image
                className="inline cursor-pointer"
                onClick={() => onCopy(`http://localhost:3000/api/redirect/${urlRecord.shortUrl}`)}
                src={copy}
                alt="copy"
              />
            </div>
            <div className="flex items-center mt-2 sm:mt-0 ml-[80px]">
              <Image
                onClick={() => onExpand(urlRecord.id)}
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
                  onClick={() => onStatusChange(urlRecord.shortUrl, urlRecord.status === 'active' ? 'inactive' : 'active')}
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
              <div className="mb-2 flex space-x-2">
                <strong className='mt-[10px]'>Action:</strong>
                <Image
                  src={edit}
                  alt="edit"
                  onClick={() => onEdit(urlRecord.shortUrl)}
                  className="cursor-pointer"
                />
              </div>
              <div className="mb-2 flex space-x-2">
                <strong  className='mt-[10px]'>Delete:</strong>
                <Image
                  src={del}
                  alt="delete"
                  onClick={() => onDelete(urlRecord.shortUrl)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CardView;
