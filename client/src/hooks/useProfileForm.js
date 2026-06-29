import { useState } from "react";

export function useProfileForm(user = {}, onSave) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);

  const [form, setForm] = useState({
    name: user.name || "",
    bio: user.bio || "",
    location: user.location || "",
    birthday: user.birthday || "",
    gender: user.gender || "",
    profilePic: null,
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImg(reader.result);
      setForm((prev) => ({ ...prev, profilePic: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave?.({
        name: form.name,
        bio: form.bio,
        location: form.location,
        birthday: form.birthday,
        gender: form.gender,
        ...(form.profilePic && { profilePic: form.profilePic }),
      });
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({
      name: user.name || "",
      bio: user.bio || "",
      location: user.location || "",
      birthday: user.birthday || "",
      gender: user.gender || "",
      profilePic: null,
    });
    setPreviewImg(null);
    setEditing(false);
  };

  return {
    form,
    editing,
    setEditing,
    saving,
    previewImg,
    handleChange,
    handleImageChange,
    handleSave,
    handleCancel
  };
}
