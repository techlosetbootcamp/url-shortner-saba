import React from "react";
import Image from "next/image";
import { UrlWithFaviconProps } from "@/src/types/types";
const getFaviconUrl = (url: string): string => {
  return `https://www.google.com/s2/favicons?sz=64&domain_url=${url}`;
};

const UrlWithFavicon: React.FC<UrlWithFaviconProps> = ({ url }) => {
  const faviconUrl = getFaviconUrl(url);

  return (
    <div className="flex items-center">
      <div className="relative w-8 h-8 rounded-[4px] mr-2">
        <Image
          src={faviconUrl}
          alt="Favicon"
          fill
          sizes="32px"
          style={{ objectFit: "contain" }}
        />
      </div>
      <span className="truncate">{url}</span>
    </div>
  );
};

export default UrlWithFavicon;
