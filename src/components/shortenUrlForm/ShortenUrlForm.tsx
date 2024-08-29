import React from "react";
import toast from "react-hot-toast";
import { ShortenUrlFormProps } from "@/src/types/types";
const ShortenUrlForm: React.FC<ShortenUrlFormProps> = ({
  url,
  setUrl,
  handleSubmit,
  loading,
  error,
}) => {
  return (
    <div className="relative flex items-center xl:w-[659px] w-2/3 mb-6">
      <input
        type="text"
        placeholder="Enter the link here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full h-[76px] pl-4 pr-[178px] rounded-[48px] border-4 border-inputBorder bg-inputBackground focus:outline-none focus:border-focusInput text-primary"
      />
      <button
        onClick={handleSubmit}
        className="absolute right-0 top-0 bottom-0 text-[16px] rounded-[48px] mt-2 shadow-custom mr-2 bg-gradBlue w-[178px] h-[60px] px-[25.05px] py-[21px]"
        disabled={loading}
      >
        {loading ? "Shortening..." : "Shorten Now!"}
      </button>
      {error && toast.error(`Error:${error}`)}
    </div>
  );
};

export default ShortenUrlForm;
