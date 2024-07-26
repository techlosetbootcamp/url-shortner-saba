"use client";
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const UpdateProfileForm: React.FC = () => {

  const [currentEmail, setCurrentEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [updatedName, setUpdatedName] = useState<string | null>(null);
  const [updatedEmail, setUpdatedEmail] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/updateProfile', { email: currentEmail, newName, newEmail });
      console.log('Profile updated successfully:', response.data);
      toast.success('Profile updated successfully');

      // // Update local state with the new values
      setUpdatedName(response.data.user.name);
      setUpdatedEmail(response.data.user.email);
      window.location.assign("/login");
      // Optionally reset the form fields
      setCurrentEmail('');
      setNewName('');
      setNewEmail('');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    }
  };






  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B101B]">
      <div className="absolute top-[2.5rem] text-center">
        <h2 className="bg-gradient-to-r from-[#EB568E] to-[#144EE3] text-gradient bg-clip-text text-transparent font-extrabold text-[36.91px] leading-[45.44px]">
          Linkly
        </h2>
      </div>

      <div className="bg-[#1E2635] bg-opacity-60 p-8 rounded-lg shadow-md text-center w-full max-w-md">
        {/* Optionally add an image here */}
        {/* <Image
          className="mx-auto rounded-full h-24 w-24"
          src="/path-to-profile-image.jpg"
          alt="Profile Image"
          width={96}
          height={96}
        /> */}
         
        <h3 className="text-white text-xl font-semibold mt-4">{updatedName || session?.user.name }</h3>
        <p className="text-gray-400">{updatedEmail || session?.user.email}</p>

        {/* Profile Update Form */}
        <form onSubmit={handleUpdateProfile} className="mt-6 space-y-4">
          <div className="text-left">
            <label className="block text-white text-sm font-medium mb-2" htmlFor="currentEmail">Current Email</label>
            <input
              id="currentEmail"
              type="email"
              placeholder="Current Email"
              value={currentEmail}
              onChange={(e) => setCurrentEmail(e.target.value)}
              className="w-full h-[50px] pl-4 rounded-[12px] text-white border-2 border-[#353C4A] bg-[#1E2635] focus:outline-none focus:border-purple-400"
            />
          </div>
          <div className="text-left">
            <label className="block text-white text-sm font-medium mb-2" htmlFor="newName">New Name</label>
            <input
              id="newName"
              type="text"
              placeholder="New Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full h-[50px] pl-4 rounded-[12px] text-white border-2 border-[#353C4A] bg-[#1E2635] focus:outline-none focus:border-purple-400"
            />
          </div>
          <div className="text-left">
            <label className="block text-white text-sm font-medium mb-2" htmlFor="newEmail">New Email</label>
            <input
              id="newEmail"
              type="email"
              placeholder="New Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full h-[50px] pl-4 rounded-[12px] text-white border-2 border-[#353C4A] bg-[#1E2635] focus:outline-none focus:border-purple-400"
            />
          </div>
          <button type="submit" className="w-full h-[50px] rounded-[12px] mt-4 text-center bg-blue-600 text-white hover:bg-blue-700 transition duration-200">
            Update Profile
          </button>
        </form>

        <h2 className="text-gray-400 mt-4 text-[14px] font-light">
          <Link href="/forgetpassword" className="text-blue-500 hover:underline">Forgot Password?</Link> if you forget your password.
        </h2>
      </div>
    </div>
  );
};

export default UpdateProfileForm;




