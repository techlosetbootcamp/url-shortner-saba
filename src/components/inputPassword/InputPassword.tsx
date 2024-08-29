"use client";
import { InputFieldProps } from "@/src/types/types";
const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  placeholder = "",
  name,
  value,
  onChange,
  className = "",
}) => {
  return (
    <div className="mb-6">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full lg:w-[659px] h-[76px] pr-12 pl-6 rounded-[48px] border-4 border-inputBorder bg-darkGrey focus:outline-none focus:border-focusInput text-primary ${className}`}
      />
    </div>
  );
};

export default InputField;
