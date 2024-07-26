// src/components/ShortenUrlForm.tsx
import React from 'react';

type ShortenUrlFormProps = {
  url: string;
  setUrl: (url: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string;
};

const ShortenUrlForm: React.FC<ShortenUrlFormProps> = ({ url, setUrl, handleSubmit, loading, error }) => {
  return (
    <div className="relative flex items-center xl:w-[659px] w-2/3 mb-6">
      <input
        type="text"
        placeholder="Enter the link here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full h-[76px] pl-4 pr-[178px] rounded-[48px] border-4 border-[#353C4A] bg-[#181E29] focus:outline-none focus:border-purple-400 text-white"
      />
      <button
        onClick={handleSubmit}
        className="absolute right-0 top-0 bottom-0 text-[16px] rounded-[48px] mt-2 shadow-[10px_9px_22px_0px_#144EE361] mr-2 bg-[#144EE3] w-[178px] h-[60px] px-[25.05px] py-[21px]"
        disabled={loading}
      >
        {loading ? 'Shortening...' : 'Shorten Now!'}
      </button>
      {error && (
        <div className="mt-4">
          <p className="text-red-500">Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default ShortenUrlForm;
