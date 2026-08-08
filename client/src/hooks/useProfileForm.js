import { useState, useEffect } from 'react';

export function useProfileForm(user = {}, onSave) {
  const [form, setForm] = useState({
    name: user.name || '',
    location: user.location || '',
    birthday: user.birthday || '',
    gender: user.gender || '',
    bio: user.bio || '',
  });

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Sync state if user prop changes
  useEffect(() => {
    setForm({
      name: user.name || '',
      location: user.location || '',
      birthday: user.birthday || '',
      gender: user.gender || '',
      bio: user.bio || '',
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewImg(url);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (onSave) {
        await onSave({ ...form, imageFile });
      }
      setEditing(false);
    } catch (error) {
      console.error("Save failed", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({
      name: user.name || '',
      location: user.location || '',
      birthday: user.birthday || '',
      gender: user.gender || '',
      bio: user.bio || '',
    });
    setPreviewImg(null);
    setImageFile(null);
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
