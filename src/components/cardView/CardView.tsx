import React from "react";
import Image from "next/image";
import QRCode from "react-qr-code";
import { format } from "date-fns";
import OriginalUrlWithFavicon from "@/src/components/urlFevicon/UrlFevicon";
import IMAGES from "@/src/constants/constants";
import { CardViewProps } from "../../types/types";
import { downloadQRCode } from "@/src/utils/downloadQRCode";

const CardView: React.FC<CardViewProps> = ({
  urls,
  expandedRows,
  handleExpand,
  handleStatusChange,
  onEdit,
  onDelete,
  handleCopyToClipboard,
}) => {
  return (
    <div className="block md:hidden overflow-x-auto">
      <h2 className="text-secondaryText text-lg font-bold mb-4 bg-darkGrey xs:text pt-[16px] pl-[25px] w-[376px] h-[63px] ml-[28px] mr-[26px]">
        Shorten Links
      </h2>
      {urls.map((urlRecord) => (
        <div
          key={urlRecord.id}
          className="bg-darkGrey bg-opacity-25 p-4 mb-4 text-secondaryText rounded-md ml-[20px] mr-[27px] py-[14px]"
        >
          <div className="flex flex-wrap justify-between w-full max-w-md md:max-w-lg lg:max-w-xl items-center p-2 bg-dark-800 rounded-lg">
            <div className="flex items-center space-x-2 flex-1 overflow-hidden">
              <div className="w-full sm:w-[calc(100%-150px)] max-w-xs overflow-hidden text-[14px] text-primary truncate">
                {`${process.env.NEXTAUTH_URL}/api/redirect/${urlRecord?.shortUrl}`}
              </div>
              <Image
                className="inline cursor-pointer"
                onClick={() =>
                  handleCopyToClipboard(
                    `${process.env.NEXTAUTH_URL}/api/redirect/${urlRecord?.shortUrl}`
                  )
                }
                src={IMAGES.copy}
                alt="copy"
              />
            </div>
            <div className="flex items-center mt-2 sm:mt-0 ml-[80px]">
              <Image
                onClick={() => handleExpand(urlRecord?.id)}
                src={IMAGES.show}
                alt="toggle details"
                className="cursor-pointer ml-0 sm:ml-4"
              />
            </div>
          </div>
          {expandedRows[urlRecord?.id] && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-2">
                <strong>Original Link:</strong>
                <OriginalUrlWithFavicon url={urlRecord?.originalUrl} />
              </div>
              <div className="mb-2">
                <strong>QR Code:</strong>
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
              </div>
              <div className="mb-2">
                <strong>Clicks:</strong> {urlRecord?.visitCount}
              </div>
              <div className="mb-2">
                <strong>Status:</strong>
                <div
                  onClick={() =>
                    handleStatusChange(
                      urlRecord.shortUrl,
                      urlRecord.status === "active" ? "inactive" : "active"
                    )
                  }
                  className={`flex items-center ${
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
                        className="ml-2.5"
                      />
                    </>
                  ) : (
                    <>
                      Inactive
                      <Image
                        src={IMAGES.inactive}
                        alt="inactive"
                        className="ml-2.5"
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="mb-2">
                <strong>Date:</strong>
                {format(new Date(urlRecord?.createdAt), "MMM - dd -yyyy")}
              </div>
              {onEdit && (
                <div className="mb-2 flex space-x-2">
                  <strong className="mt-[10px]">Action:</strong>
                  <Image
                    src={IMAGES.edit}
                    alt="edit"
                    onClick={() => onEdit?.(urlRecord?.shortUrl)}
                    className="cursor-pointer"
                  />
                </div>
              )}
              {onDelete && (
                <div className="mb-2 flex space-x-2">
                  <strong className="mt-[10px]">Delete:</strong>
                  <Image
                    src={IMAGES.del}
                    alt="delete"
                    onClick={() => onDelete?.(urlRecord?.shortUrl)}
                    className="cursor-pointer"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CardView;
