import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/src/redux/store";
import {
  setName,
  setEmail,
  setPasswords,
  registerUser,
  loginUser,
  logout,
} from "@/src/redux/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { name, email, passwords, loading, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(e.target.value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPasswords({ ...passwords, password: e.target.value }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setPasswords({ ...passwords, confirmPassword: e.target.value }));
  };

  const register = () => {
    dispatch(registerUser({ name, email, passwords }));
  };

  const login = () => {
    dispatch(loginUser({ email, password: passwords.password }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    name,
    email,
    passwords,
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
