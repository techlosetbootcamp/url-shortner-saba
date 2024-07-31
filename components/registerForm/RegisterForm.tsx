// // RegisterForm.tsx
// "use client";
// import Inputs from "@/components/inputForm/InputForm";
// import axios from "axios";
// import { signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import React, { useState, useEffect } from "react";
// import toast from "react-hot-toast";

// export default function RegisterForm() {
//   useEffect(() => {
//     signOut({
//       redirect: false,

//     });
//   }, []);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const register = async () => {
//     setLoading(true);
//     try {
//       console.log("Starting registration process");
//       if (password !== confirmPassword) {
//         throw new Error("Passwords do not match");
//       }

//      const response= await axios.post("/api/register", {
//         name,
//         email,
//         password,
//         confirmPassword,
//       });
//       console.log('Registration Response:', response.data); 
//       toast.success("Successfully registered");

//       router.push("/login");
//     } catch (err: any) {
//       console.log(err);+
//       toast.error(err?.response?.data || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div className="mb-6">
//         <Inputs
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           disabled={loading}
//         />
//       </div>
//       <div className="mb-6">
//         <Inputs
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           disabled={loading}
//           type="email"
//         />
//       </div>
//       <div className="mb-6">
//         <Inputs
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           disabled={loading}
//           type="password"
//         />
//       </div>
//       <div className="mb-6">
//         <Inputs
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           disabled={loading}
//           type="password"
//         />
//       </div>
//       <div className="flex justify-center text-center">
//         <div
//           onClick={register}
          
//           className="w-[268px]  pt-4 h-[60px] rounded-[48px] bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
//         >
//           Register
//         </div>
//       </div>
//     </div>
//   );
// }



// src/components/RegisterForm.tsx
"use client";
import React from "react";
import Inputs from "@/components/inputForm/InputForm";
// import { useRegister } from "@/hooks/useRegister";
import useSignOut from '@/hooks/useSignOut';
import {useAuth} from "@/hooks/useAuth"

const RegisterForm = () => {
  const { 
    name, 
    email, 
    password, 
    confirmPassword, 
    loading, 
    handleNameChange, 
    handleEmailChange, 
    handlePasswordChange, 
    handleConfirmPasswordChange, 
    register 
  } = useAuth();
  useSignOut();

  return (
    <form className="w-full max-w-[659px]">
      <div className="mb-[32px]">
        <Inputs
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          disabled={loading}
        />
      </div>
      <div className="mb-[32px]">
        <Inputs
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          disabled={loading}
        />
      </div>
      <div className="mb-[32px]">
        <Inputs
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          disabled={loading}
          type="password"
        />
      </div>
      <div className="mb-[32px]">
        <Inputs
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          disabled={loading}
          type="password"
        />
      </div>

      <div className="flex justify-center text-center">
        <div
          onClick={() => register()}
          className="bg-[#144EE3]  h-[60px] w-[268px] text-[#FFFFFF] font-semibold text-[16px] py-[21px] px-[25.05px] border border-solid border-[#144EE3] shadow-[10px_9px_22px_0px_#144EE361] rounded-[48px] "
        >
          {loading ? "Registering..." : "Register"}
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
