import { useState } from "react";

export default function useProfile() {
  // Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Personal Information
  const [editName, setEditName] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editGender, setEditGender] = useState("");
  const [editBirthday, setEditBirthday] = useState("");
  const [editBio, setEditBio] = useState("");

  // Profile Picture
  const [editProfilePic, setEditProfilePic] = useState("");

  // Security
  const [editPassword, setEditPassword] = useState("");
  const [editOtp, setEditOtp] = useState("");

  // OTP
  const [isPasswordOtpSent, setIsPasswordOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpSuccessMessage, setOtpSuccessMessage] = useState("");

  // Messages
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState("");

  return {
    // Modal
    isEditModalOpen,
    setIsEditModalOpen,

    // Personal
    editName,
    setEditName,

    editLocation,
    setEditLocation,

    editGender,
    setEditGender,

    editBirthday,
    setEditBirthday,

    editBio,
    setEditBio,

    // Avatar
    editProfilePic,
    setEditProfilePic,

    // Security
    editPassword,
    setEditPassword,

    editOtp,
    setEditOtp,

    // OTP
    isPasswordOtpSent,
    setIsPasswordOtpSent,

    otpLoading,
    setOtpLoading,

    otpSuccessMessage,
    setOtpSuccessMessage,

    // Messages
    editError,
    setEditError,

    editSuccess,
    setEditSuccess,
  };
}