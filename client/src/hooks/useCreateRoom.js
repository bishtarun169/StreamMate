import { useState } from "react";
import { createRoomApi } from "../services/roomService";

export function useCreateRoom() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [createdRoom, setCreatedRoom] = useState(null);

  const [form, setForm] = useState({
    roomName: "",
    videoURL: "",
    mediaSource: "youtube",
    privacy: "public",
    password: "",
    maxParticipants: 10,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSourceChange = (source) => {
    setForm((prev) => ({ ...prev, mediaSource: source }));
  };

  const handlePrivacyChange = (privacyVal) => {
    setForm((prev) => ({
      ...prev,
      privacy: privacyVal,
      password: privacyVal === "public" ? "" : prev.password,
    }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError("");

    if (!form.roomName.trim()) {
      setError("Please enter a room name.");
      return;
    }
    if (!form.videoURL.trim()) {
      setError("Please enter a video URL.");
      return;
    }
    if (form.privacy === "private" && !form.password.trim()) {
      setError("Please set a password for private rooms.");
      return;
    }

    setLoading(true);
    try {
      const data = await createRoomApi(form);
      setCreatedRoom(data.room);
    } catch (err) {
      setError(err.message || "Failed to create room.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCreatedRoom(null);
    setError("");
    setForm({
      roomName: "",
      videoURL: "",
      mediaSource: "youtube",
      privacy: "public",
      password: "",
      maxParticipants: 10,
    });
  };

  return {
    form,
    loading,
    error,
    createdRoom,
    handleChange,
    handleSourceChange,
    handlePrivacyChange,
    handleSubmit,
    resetForm,
  };
}
