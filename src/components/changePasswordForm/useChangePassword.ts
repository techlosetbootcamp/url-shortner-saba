"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/src/redux/store";
import { useSearchParams, useRouter } from "next/navigation";
import { changePassword } from "@/src/redux/slices/authSlice";
import { ChangePasswordState } from "@/src/types/types";
import toast from "react-hot-toast";

export const useChangePassword = () => {
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, error } = useSelector(
    (state: RootState) => state.auth as ChangePasswordState
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (success) {
      toast.success("Password changed successfully");
      router.push("/login");
    }
    if (error) {
      toast.error(`Error changing password: ${error}`);
    }
  }, [success, error, router]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwords.password !== passwords.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (token) {
      dispatch(changePassword({ token, newPassword: passwords.password }));
    } else {
      toast.error("Invalid or missing token");
    }
  };

  return {
    passwords,
    loading,
    success,
    error,
    handlePasswordChange,
    handleSubmit,
  };
};
