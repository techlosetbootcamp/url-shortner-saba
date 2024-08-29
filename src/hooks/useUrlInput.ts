import { useState } from "react";
export const useUrlInput = () => {
  const [url, setUrl] = useState<string>("");

  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
  };
  const resetUrl = () => {
    setUrl("");
  };

  return {
    url,
    handleUrlChange,
    resetUrl,
  };
};
