import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "@/src/redux/slices/profileSlice";
import { AppDispatch } from "@/src/redux/store";
import toast from "react-hot-toast";

const useUpdateProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentEmail, setCurrentEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(
        updateProfile({ email: currentEmail, newName, newEmail })
      ).unwrap();
      toast.success("Profile updated successfully");
      setCurrentEmail("");
      setNewName("");
      setNewEmail("");
      window.location.assign("/login");
    } catch (error) {
      toast.error("Error updating profile");
    }
  };

  return {
    currentEmail,
    setCurrentEmail,
    newName,
    setNewName,
    newEmail,
    setNewEmail,
    handleUpdateProfile,
  };
};

export default useUpdateProfile;
