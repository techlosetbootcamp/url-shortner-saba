"use client";
import React from "react";
import { useForgotPassword } from "./useForgetPassword";
import Link from "next/link";

const ForgotPasswordForm = () => {
  const { email, handleEmailChange, handleSubmit, loading } =
    useForgotPassword();

  return (
    <form
      className="flex flex-col items-center text-center justify-center mt-20"
      onSubmit={handleSubmit}
    >
      <h2 className="text-4xl  xs:text-[30px] text-[60px] leading-[50px] font-bold p-6 bg-gradient-to-r from-gradPink to-gradBlue text-transparent bg-clip-text text-center mb-6">
        Forgot Your Password?
      </h2>
      <p className="text-center xs:px-[30px]  text-secondaryText mb-[46px] text-[16px] font-light leading-[23.5px]">
        Enter your email address below and we will send you a link to reset your
        password.
      </p>
      <div className="mb-6">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          className="w-full sm:w-[300px] md:w-[400px] lg:w-[659px] h-[76px] pl-4 pr-12 rounded-[48px] border-4 border-inputBorder bg-darkGrey focus:outline-none focus:border-focusInput text-primary placeholder-secondaryText"
        />
      </div>
      <button
        type="submit"
        className="bg-gradBlue  h-[60px] w-[176px] text-primary font-semibold text-[16px] py-[21px] px-[25.05px] border border-solid border-gradBlue shadow-custom rounded-[48px]"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
      <p className="flex text-center font-light text-[14px] text-secondaryText mt-[248px]">
        Remember your password?
        <Link href="/login" className="text-gradBlue underline mr-[5px]">
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
