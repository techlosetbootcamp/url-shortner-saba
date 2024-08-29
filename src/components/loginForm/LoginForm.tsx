"use client";
import React from "react";
import Inputs from "@/src/components/inputForm/InputForm";
import { useAuth } from "@/src/hooks/useAuth";
import Link from "next/link";

const LoginForm = () => {
  const {
    email,
    passwords,
    loading,
    handleEmailChange,
    handlePasswordChange,
    login,
  } = useAuth();

  return (
    <form className="w-full max-w-[659px]">
      <div className="mb-[32px] xs:px-[30px]">
        <Inputs
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          disabled={loading}
        />
      </div>
      <div className="mb-[32px] xs:px-[30px]">
        <Inputs
          placeholder="Password"
          value={passwords.password}
          onChange={handlePasswordChange}
          disabled={loading}
          type="password"
        />
      </div>
      <p className="text-secondaryText mb-8 text-[16px] font-light leading-[23.5px] text-right xs:pr-[40px]">
        <Link href="/forgetPassword">Forgot Password?</Link>
      </p>
      <div className="flex justify-center text-center">
        <button
          type="button"
          onClick={login}
          className="bg-gradBlue h-[60px] w-[268px] text-primary font-semibold text-[16px] py-[21px] px-[25.05px] border border-solid border-gradBlue shadow-custom rounded-[48px]"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
