import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/src/redux/store";
import {ForgotPasswordState} from "@/src/types/types" 
import {
  setEmail,
  sendResetEmail,
} from "@/src/redux/slices/authSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const useForgotPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { email, loading, success, error } = useSelector(
    (state: RootState) => state.auth as ForgotPasswordState
  );

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(sendResetEmail({ email }));
  };

  useEffect(() => {
    if (success) {
      toast.success("Reset email sent successfully!");
    }

    if (error) {
      toast.error("Failed to send reset email. Please try again.");
    }
  }, [success, error]);

  return {
    email,
    loading,
    success,
    error,
    handleEmailChange,
    handleSubmit,
  };
};
