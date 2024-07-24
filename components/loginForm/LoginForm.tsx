



// src/components/LoginForm.tsx
"use client";
import React from "react";
import Inputs from "@/components/inputForm/InputForm";
// import { useLogin } from "@/hooks/useLogin";
// import { useSignOut } from "../app/hooks/useSignOut";
import { useAuth } from "@/hooks/useAuth";
import useSignOut from '@/hooks/useSignOut';

const LoginForm = () => {
  const { email, password, loading, handleEmailChange, handlePasswordChange, login } = useAuth();
  useSignOut();
// useEffect(() => {
//   signOut({ redirect: false });
// }, []);

  return (
    <form className="w-full max-w-[659px]">
      <div className="mb-4">
        <Inputs
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          disabled={loading}
        />
      </div>
      <div className="mb-6">
        <Inputs
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          disabled={loading}
          type="password"
        />
      </div>

      <div className="flex justify-center text-center">
        <div
          onClick={login}
          className="w-[268px] h-[60px] pt-4 rounded-[48px] bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
        >
          {loading ? "Logging in..." : "Login"}
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
