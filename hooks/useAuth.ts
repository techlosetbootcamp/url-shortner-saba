// src/hooks/useAuth.ts
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { setName, setEmail, setPassword, setConfirmPassword, registerUser, loginUser, logout } from "@/app/redux/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { name, email, password, confirmPassword, loading, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(e.target.value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value));
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setConfirmPassword(e.target.value));
  };

  const register = () => {
    dispatch(registerUser({ name, email, password, confirmPassword }));
  };

  const login = () => {
    dispatch(loginUser({ email, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    name,
    email,
    password,
    confirmPassword,
    loading,
    isAuthenticated,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    register,
    login,
    handleLogout,
  };
};
