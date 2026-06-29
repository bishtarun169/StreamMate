import { useState, useEffect } from "react";
import ProfileHero from "./ProfileHero";
import ProfileInfoCard from "./ProfileInfoCard";
import StatsCard from "./StatsCard";

import {
  fetchProfile,
  updateProfile,
} from "../../services/homeService";

export default function ProfileBody() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile()
      .then((data) => setUser(data.user))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSaveInfo = async (profileData) => {
    const data = await updateProfile(profileData);
    setUser(data.user);
  };



  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#0B0B0B] via-[#111827] to-[#0F172A] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-red-600 border-t-transparent animate-spin" />
          <p className="text-gray-400 text-sm">Loading profile…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0B0B0B] via-[#111827] to-[#0F172A] px-6 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <ProfileHero user={user} />
        <ProfileInfoCard user={user} onSave={handleSaveInfo} />
        <StatsCard user={user} />
      </div>
    </main>
  );
}
