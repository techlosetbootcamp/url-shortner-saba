



// src/components/RegisterForm.tsx
"use client";
import React from "react";
import Inputs from "@/components/inputForm/InputForm";
// import { useRegister } from "@/hooks/useRegister";
import useSignOut from '@/hooks/useSignOut';
import {useAuth} from "@/hooks/useAuth"

const RegisterForm = () => {
  const { 
    name, 
    email, 
    password, 
    confirmPassword, 
    loading, 
    handleNameChange, 
    handleEmailChange, 
    handlePasswordChange, 
    handleConfirmPasswordChange, 
    register 
  } = useAuth();
  useSignOut();

  return (
    <form className="w-full max-w-[659px]">
      <div className="mb-[32px] xs:px-[30px]">
        <Inputs
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          disabled={loading}
        />
      </div>
      <div className="mb-[32px] xs:px-[30px]">
        <Inputs
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          disabled={loading}
        />
      </div>
      <div className="mb-[32px]  xs:px-[30px]">
        <Inputs
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          disabled={loading}
          type="password"
        />
      </div>
      <div className="mb-[32px] xs:px-[30px]">
        <Inputs
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          disabled={loading}
          type="password"
        />
      </div>

      <div className="flex justify-center text-center">
        <div
          onClick={() => register()}
          className="bg-[#144EE3]  h-[60px] w-[268px] text-[#FFFFFF] font-semibold text-[16px] py-[21px] px-[25.05px] border border-solid border-[#144EE3] shadow-[10px_9px_22px_0px_#144EE361] rounded-[48px] "
        >
          {loading ? "Registering..." : "Register"}
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
