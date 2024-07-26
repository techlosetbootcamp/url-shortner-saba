// src/components/UrlTable.tsx
import React from 'react';
import QRCode from 'react-qr-code';
import Image from 'next/image';
import { format } from 'date-fns';
import active from "@/app/assets/images/Active.svg";
import inactive from "@/app/assets/images/Inactive.svg";

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
  handleStatusChange: (id: string, status: string) => void;
};

const UrlTable: React.FC<UrlTableProps> = ({ urls, handleStatusChange }) => {
  return (
    <div className="overflow-x-auto w-full px-6">
      <table className="min-w-full bg-gray-800 text-left text-sm">
        <thead>
          <tr>
            <th className="p-4">Short Link</th>
            <th className="p-4">Original Link</th>
            <th className="p-4">QR Code</th>
            <th className="p-4">Clicks</th>
            <th className="p-4">Status</th>
            <th className="p-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((urlRecord) => (
            <tr key={urlRecord.id} className="bg-gray-900">
              <td className="p-4 text-white">{`http://localhost:3000/api/redirect/${urlRecord.shortUrl}`}</td>
              <td className="p-4 text-white">{urlRecord.originalUrl}</td>
              <td className="p-4 text-white">
                <QRCode value={urlRecord.originalUrl} size={64} />
              </td>
              <td className="p-4">{urlRecord.visitCount}</td>
              <td className="p-4">
                <div
                  onClick={() => handleStatusChange(urlRecord.shortUrl, urlRecord.status === 'active' ? 'inactive' : 'active')}
                  className={`flex items-center ${urlRecord.status === 'active' ? 'text-green-500' : 'text-yellow-600'}`}
                >
                  {urlRecord.status === 'active' ? (
                    <>
                      Active <Image src={active} alt="active" />
                    </>
                  ) : (
                    <>
                      Inactive <Image src={inactive} alt="inactive" />
                    </>
                  )}
                </div>
              </td>
              <td className="p-2">
                {format(new Date(urlRecord.createdAt), "MMM - dd -yyyy")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UrlTable;
