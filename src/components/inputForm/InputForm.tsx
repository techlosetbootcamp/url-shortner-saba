import React from "react";
import { InputsProps } from "../../types/types";
const Inputs: React.FC<InputsProps> = ({
  placeholder,
  value,
  onChange,
  disabled = false,
  type = "text",

}) => {
  return (
    <input
      className="w-full h-[76px] pl-[25px] py-[24px] rounded-[48px] border-4 border-inputBorder bg-darkGrey focus:outline-none focus:border-focusInput text-primary"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      type={type}
 
    />
  );
};

export default Inputs;
