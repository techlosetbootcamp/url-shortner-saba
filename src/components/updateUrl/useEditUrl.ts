import { useState, useEffect } from "react";
const useEditUrl = (isOpen: boolean, currentUrl: string) => {
const [newUrl, setNewUrl] = useState(currentUrl);
  useEffect(() => {
    if (isOpen) {
      setNewUrl(currentUrl);
    }
  }, [isOpen, currentUrl]);

  return {
    newUrl,
    setNewUrl,
  };
};

export default useEditUrl;
