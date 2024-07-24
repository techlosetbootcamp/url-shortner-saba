





// src/hooks/useChangePassword.ts
// src/hooks/useChangePassword.ts
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/redux/store';
import { useSearchParams, useRouter } from 'next/navigation';
import { changePassword } from '@/app/redux/slices/useChangePasswordSlice';
import toast from 'react-hot-toast';

export const useChangePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, error } = useSelector((state: RootState) => state.changePassword);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (success) {
      toast.success('Password changed successfully');
      router.push('/login');
    }
    if (error) {
      toast.error(`Error changing password: ${error}`);
    }
  }, [success, error, router]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (token) {
      dispatch(changePassword({ token, newPassword: password }));
    } else {
      toast.error('Invalid or missing token');
    }
  };

  return {
    password,
    confirmPassword,
    loading,
    success,
    error,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
  };
};

