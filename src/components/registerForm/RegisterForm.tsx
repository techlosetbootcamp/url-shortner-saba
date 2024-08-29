"use client";
import React from "react";
import Inputs from "@/src/components/inputForm/InputForm";
import { useAuth } from "@/src/hooks/useAuth";
import { registerFormFields } from "@/src/constants/constants";

const RegisterForm = () => {
  const {
    name,
    email,
    passwords,
    loading,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    register,
  } = useAuth();

  const inputFields = registerFormFields(
    name,
    email,
    passwords,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange
  );

  return (
    <form className="w-full max-w-[659px]">
      {inputFields.map((field, index) => (
        <div key={index} className="mb-[32px] xs:px-[30px]">
          <Inputs
            placeholder={field.placeholder}
            value={field.value}
            onChange={field.onChange}
            disabled={loading}
            type={field.type}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={register}
        disabled={loading}
        className="bg-gradBlue  h-[60px] w-[268px] text-primary font-semibold text-[16px] py-[21px] px-[25.05px] border border-solid border-gradBlue shadow-custom rounded-[48px] "
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
