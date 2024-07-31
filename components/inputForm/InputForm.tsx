import React, { InputHTMLAttributes } from 'react';

interface InputsProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: string;
}

const Inputs: React.FC<InputsProps> = ({ placeholder, value, onChange, disabled = false, type = "text" }) => {
  return (
    <input
    className="w-full h-[76px] pl-[25px] py-[24px]   rounded-[48px] border-4 border-[#353C4A] bg-[#181E29] focus:outline-none focus:border-purple-400 text-white"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      type={type}
    />
  );
};

export default Inputs;
