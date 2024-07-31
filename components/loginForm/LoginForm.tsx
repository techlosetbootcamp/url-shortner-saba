



// src/components/LoginForm.tsx
"use client";
import React from "react";
import Inputs from "@/components/inputForm/InputForm";
// import { useLogin } from "@/hooks/useLogin";
// import { useSignOut } from "../app/hooks/useSignOut";
import { useAuth } from "@/hooks/useAuth";
import useSignOut from '@/hooks/useSignOut';
import Link from "next/link";

const LoginForm = () => {
  const { email, password, loading, handleEmailChange, handlePasswordChange, login } = useAuth();
  useSignOut();
// useEffect(() => {
//   signOut({ redirect: false });
// }, []);

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
      <div className="mb-[32px]  xs:px-[30px]">
        <Inputs
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          disabled={loading}
          type="password"
        />
      </div>
      <p className="text-gray-400 mb-8 text-[16px] font-light leading-[23.5px] text-right">
        <Link href="/forgetPassword">  Forgot Password?</Link>
        
          </p>
      <div className="flex justify-center text-center">
        <div
          onClick={login}
          className="bg-[#144EE3]  h-[60px] w-[268px] text-[#FFFFFF] font-semibold text-[16px] py-[21px] px-[25.05px] border border-solid border-[#144EE3] shadow-[10px_9px_22px_0px_#144EE361] rounded-[48px]  "
        >
          {loading ? "Logging in..." : "Login"}
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
