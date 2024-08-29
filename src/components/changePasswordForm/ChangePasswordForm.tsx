"use client";
import React, { Suspense } from "react";
import { useChangePassword } from "./useChangePassword";
import InputField from "../inputPassword/InputPassword";

const ChangePasswordForm = () => {
  const { passwords, loading, handlePasswordChange, handleSubmit } =
    useChangePassword();

  return (
    <form className="text-center" onSubmit={handleSubmit}>
      <h2 className="text-4xl text-[60px] xs:text-[30px] leading-[50px] font-bold bg-gradient-to-r p-6 from-gradPink to-gradBlue text-transparent bg-clip-text text-center mb-6">
        Change Your Password
      </h2>

      <InputField
        type="password"
        name="password"
        placeholder="Enter new password"
        value={passwords.password}
        onChange={handlePasswordChange}
      />

      <InputField
        type="password"
        name="confirmPassword"
        placeholder="Confirm new password"
        value={passwords.confirmPassword}
        onChange={handlePasswordChange}
      />

      <button
        className="bg-gradBlue xs:py-[10px] xs:w-[151px] h-[60px] w-[260px] text-primary font-semibold text-[16px] py-[21px] px-[25.05px] border border-solid border-gradBlue shadow-custom rounded-[48px]"
        type="submit"
        disabled={loading}
      >
        {loading ? "Changing..." : "Change Password"}
      </button>
    </form>
  );
};

const ChangePasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChangePasswordForm />
    </Suspense>
  );
};

export default ChangePasswordPage;
