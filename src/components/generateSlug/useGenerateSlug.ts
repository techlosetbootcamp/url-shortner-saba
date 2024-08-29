import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import { shortenUrl } from "@/src/redux/slices/customSlugSlice";

const useShortenUrl = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { shortUrl, status, error } = useSelector(
    (state: RootState) => state.customSlug
  );

  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");

  const handleSubmit = async () => {
    try {
      await dispatch(shortenUrl({ url, customSlug })).unwrap();
      window.location.assign("/main");
    } catch (err) {}
  };

  return {
    url,
    setUrl,
    customSlug,
    setCustomSlug,
    shortUrl,
    status,
    error,
    handleSubmit,
  };
};

export default useShortenUrl;
