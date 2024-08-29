import React from "react";
import Image from "next/image";
import QRCode from "react-qr-code";
import { format } from "date-fns";
import OriginalUrlWithFavicon from "@/src/components/urlFevicon/UrlFevicon";
import IMAGES from "@/src/constants/constants";
import { URLTableProps } from "../../types/types";
import Loader from "@/src/components/loader/Loader";
import { downloadQRCode } from "@/src/utils/downloadQRCode";

const URLTable: React.FC<URLTableProps> = ({
  urls,
  handleStatusChange,
  onEdit,
  onDelete,
  handleCopyToClipboard,
  loading,
}) => {
  if (loading) {
    return <Loader />;
  }

  if (!urls || urls.length === 0) {
    return (
      <div className="text-center text-gradPink text-lg font-bold animate-bounce ">
     No records found. Please add a new URL
      </div>
    );
  }
 
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="min-w-full bg-customBackground text-left text-sm border-spacing-y-1 border-separate">
        <thead className="text-[15px] bg-inputBackground font-bold text-secondaryText">
          <tr>
            <th className="py-[26px] pl-[25px] w-[299px]">Short Link</th>
            <th className="p-4 pl-[42px] w-[462px]">Original Link</th>
            <th className="pl-[16px] w-[150px]">QR Code</th>
            <th className="pl-[42px] w-[95px]">Clicks</th>
            <th className="pl-[46px]">Status</th>
            <th className="pl-[46px] w-[177px] lm:pl-[40px]">
              Date
              <Image
                className="hidden 2xl:inline ml-1"
                src={IMAGES.dat}
                alt="date"
              />
            </th>
            {onEdit && onDelete && (
              <th className="pl-[42px] w-[165px] pr-[25px]">Action</th>
            )}
          </tr>
        </thead>
        <tbody>
          {urls.map((urlRecord) => (
            <tr
              key={urlRecord?.id}
              className="bg-customBackground text-[14px] font-light text-secondaryText"
            >
              <td className="pl-6 pr-6">
                <div className="flex items-center">
                  <div className="text-ellipsis truncate w-[200px]">{`${process.env.NEXTAUTH_URL}/api/redirect/${urlRecord?.shortUrl}`}</div>
                  <div>
                    <Image
                      className="cursor-pointer ml-2"
                      onClick={() =>
                        handleCopyToClipboard(
                          `${process.env.NEXTAUTH_URL}/api/redirect/${urlRecord?.shortUrl}`
                        )
                      }
                      src={IMAGES.copy}
                      alt="copy"
                    />
                  </div>
                </div>
              </td>

              <td className="px-4">
                <OriginalUrlWithFavicon url={urlRecord?.originalUrl} />
              </td>
              <td className="p-4">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    downloadQRCode(urlRecord?.originalUrl);
                  }}
                >
                  <QRCode
                    id={`qr-${urlRecord?.originalUrl}`}
                    value={urlRecord?.originalUrl}
                    size={32}
                  />
                </a>
              </td>
              <td className="pl-10">{urlRecord?.visitCount}</td>
              <td className="pl-10">
                <div
                  onClick={() =>
                    handleStatusChange(
                      urlRecord?.shortUrl,
                      urlRecord?.status === "active" ? "inactive" : "active"
                    )
                  }
                  className={`flex items-center cursor-pointer ${
                    urlRecord?.status === "active"
                      ? "text-activeLink"
                      : "text-inactiveLink"
                  }`}
                >
                  {urlRecord?.status === "active" ? (
                    <>
                      Active
                      <Image
                        src={IMAGES.active}
                        alt="active"
                        className="ml-2"
                      />
                    </>
                  ) : (
                    <>
                      Inactive
                      <Image
                        src={IMAGES.inactive}
                        alt="inactive"
                        className="ml-2"
                      />
                    </>
                  )}
                </div>
              </td>
              <td className="pl-14">
                {format(new Date(urlRecord?.createdAt), "MMM - dd -yyyy")}
              </td>
    
              <td className="p-4 flex space-x-2">
                {onEdit && (
                  <Image
                    src={IMAGES.edit}
                    alt="edit"
                    onClick={() => onEdit?.(urlRecord?.shortUrl)}
                    className="cursor-pointer"
                  />
                )}
                {onDelete && (
                  <Image
                    src={IMAGES.del}
                    alt="delete"
                    onClick={() => onDelete?.(urlRecord?.shortUrl)}
                    className="cursor-pointer"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default URLTable;
