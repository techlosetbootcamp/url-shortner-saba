import React from "react";
import UpdateProfileClient from "@/src/components/updateProfile/UpdateProfile";
import IMAGES from "@/src/constants/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Profile",
  description:
    "Update your profile to personalize and manage your shortened URLs.",
  icons: {
    icon: `${process.env.NEXTAUTH_URL}/assets/images/Profile.svg`,
  },
};
const UpdateProfileForm: React.FC = () => {
  return (
    <UpdateProfileClient
      firstImageSrc={IMAGES.cube.src}
      secondImageSrc={IMAGES.swirl.src}
    />
  );
};

export default UpdateProfileForm;
