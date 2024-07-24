// // src/hooks/useForgotPassword.ts
// import { useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// export const useForgotPassword = () => {
//   const [email, setEmail] = useState('');

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("Form submitted with email:", email);
//     try {
//       const response = await axios.post('/api/forgetPassword', { email });
//       console.log("API Response:", response.data);
//       toast.success('Password reset email sent');
//     } catch (error) {
//       console.error('API Error:', error);
//       toast.error('Error sending password reset email');
//     }
//   };

//   return {
//     email,
//     handleEmailChange,
//     handleSubmit,
//   };
// };


// src/hooks/useForgotPassword.ts
// src/hooks/useForgotPassword.ts
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/redux/store';
import { setEmail, sendResetEmail } from '@/app/redux/slices/useForgetPasswordSlice';

export const useForgotPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { email, loading, success, error } = useSelector((state: RootState) => state.forgotPassword);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(sendResetEmail({ email }));
  };

  return {
    email,
    loading,
    success,
    error,
    handleEmailChange,
    handleSubmit,
  };
};


