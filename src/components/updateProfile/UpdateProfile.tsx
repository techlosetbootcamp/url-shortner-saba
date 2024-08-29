"use client";
import React from "react";
import { useSelector } from "react-redux";
import useUpdateProfile from "./useUpdateProfile";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { UpdateProfileClientProps } from "@/src/types/types";
import { ProfileState } from "@/src/types/types";
import Inputs from "../inputForm/InputForm";

const UpdateProfileClient: React.FC<UpdateProfileClientProps> = ({
  firstImageSrc,
  secondImageSrc,
}) => {
  const { data: session } = useSession();
  const {
    currentEmail,
    setCurrentEmail,
    newName,
    setNewName,
    newEmail,
    setNewEmail,
    handleUpdateProfile,
  } = useUpdateProfile();
  const { name, email } = useSelector(
    (state: { profile: ProfileState }) => state.profile
  );

  return (
    <div
      style={{
        backgroundImage: `url(${firstImageSrc}), url(${secondImageSrc})`,
      }}
      className="flex flex-col items-center justify-center min-h-screen bg-background"
    >
      <div className="text-center">
        <h2 className="bg-gradient-to-r from-gradPink to-gradBlue text-gradient bg-clip-text text-transparent font-extrabold text-[36.91px] leading-[45.44px]">
          Update Profile
        </h2>
      </div>

      <div className="bg-profilebg bg-opacity-60 p-8 rounded-lg shadow-md text-center w-full max-w-md">
        <h3 className="text-primary text-xl font-semibold mt-4">
          {name || session?.user?.name}
        </h3>
        <p className="text-primary">{email || session?.user?.email}</p>

        <form onSubmit={handleUpdateProfile} className="mt-6 space-y-4">
          <div className="text-left">
            <label
              className="block text-primary text-sm font-medium mb-2"
              htmlFor="currentEmail"
            >
              Current Email
            </label>
            <Inputs
              placeholder="Current Email"
              value={currentEmail}
              onChange={(e) => setCurrentEmail(e.target.value)}
              type="email"
            />
          </div>
          <div className="text-left">
            <label
              className="block text-primary text-sm font-medium mb-2"
              htmlFor="newName"
            >
              New Name
            </label>
            <Inputs
              placeholder="New Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              type="text"
            />
          </div>
          <div className="text-left">
            <label
              className="block text-primary text-sm font-medium mb-2"
              htmlFor="newEmail"
            >
              New Email
            </label>
            <Inputs
              placeholder="New Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              type="email"
            />
          </div>
          <button
            type="submit"
            className="w-full h-[50px] rounded-[12px] mt-4 text-center bg-gradBlue text-primary hover:to-buttonHover  shadow-custom transition duration-200"
          >
            Update Profile
          </button>
        </form>

        <h2 className="text-gray-400 mt-4 text-[14px] font-light">
          <Link
            href="/forgetPassword"
            className="text-gradBlue hover:underline"
          >
            Reset Password
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default UpdateProfileClient;
