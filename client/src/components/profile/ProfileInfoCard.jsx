import { FaUser, FaCamera } from "react-icons/fa";
import { MdEdit, MdSave, MdClose } from "react-icons/md";
import ProfileField from "./ProfileField";
import { useProfileForm } from "../../hooks/useProfileForm";

const TEXT_FIELDS = [
  { name: "name", label: "Display Name", placeholder: "Your full name" },
  { name: "location", label: "Location", placeholder: "City, Country" },
  { name: "birthday", label: "Birthday", type: "date", placeholder: "YYYY-MM-DD" },
];

export default function ProfileInfoCard({ user = {}, onSave }) {
  const {
    form,
    editing,
    setEditing,
    saving,
    previewImg,
    handleChange,
    handleImageChange,
    handleSave,
    handleCancel
  } = useProfileForm(user, onSave);

  const avatarSrc =
    previewImg ||
    user.profilePic ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=dc2626&color=fff&size=200`;

  return (
    <div className="group flex flex-col rounded-3xl border border-gray-800 bg-[#111111] p-7 transition-all duration-300 hover:border-red-600/30 hover:shadow-[0_0_35px_rgba(220,38,38,0.07)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-800 bg-red-950/40">
            <FaUser className="text-red-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Personal Info</h2>
            <p className="text-sm text-gray-400">Manage your profile details</p>
          </div>
        </div>

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 rounded-xl border border-gray-700 bg-transparent px-4 py-2 text-sm font-semibold text-white transition hover:border-red-600 hover:bg-red-600 active:scale-95"
          >
            <MdEdit className="text-base" />
            Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 rounded-xl border border-gray-700 px-4 py-2 text-sm font-semibold text-gray-300 transition hover:border-gray-500 hover:text-white active:scale-95"
            >
              <MdClose className="text-base" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1 rounded-xl bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 active:scale-95 disabled:opacity-60"
            >
              <MdSave className="text-base" />
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="my-6 h-px bg-gray-800" />

      {/* Avatar Upload (only when editing) */}
      {editing && (
        <div className="mb-6 flex items-center gap-5">
          <img
            src={avatarSrc}
            alt="Avatar preview"
            className="h-20 w-20 rounded-full object-cover border-2 border-red-600"
          />
          <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-red-600 hover:text-white">
            <FaCamera className="text-red-500" />
            Change Photo
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
          <p className="text-xs text-gray-500">JPEG, PNG or WebP · Max 2 MB</p>
        </div>
      )}

      {/* Fields Grid */}
      <div className="grid gap-5 sm:grid-cols-2">
        {TEXT_FIELDS.map((field) => (
          <ProfileField
            key={field.name}
            {...field}
            value={form[field.name]}
            editing={editing}
            onChange={handleChange}
          />
        ))}

        {/* Gender */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Gender
          </label>
          {editing ? (
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="rounded-xl border border-gray-700 bg-[#181818] px-4 py-3 text-white outline-none transition focus:border-red-600"
            >
              <option value="">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="other">Other</option>
            </select>
          ) : (
            <p className="rounded-xl border border-gray-800 bg-[#181818] px-4 py-3 text-white capitalize">
              {form.gender || <span className="text-gray-500">Not set</span>}
            </p>
          )}
        </div>

        {/* Bio  */}
        <div className="sm:col-span-2 flex flex-col gap-1">
          <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Bio
          </label>
          {editing ? (
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              placeholder="Tell your friends something about yourself…"
              className="rounded-xl border border-gray-700 bg-[#181818] px-4 py-3 text-white outline-none transition focus:border-red-600 resize-none"
            />
          ) : (
            <p className="rounded-xl border border-gray-800 bg-[#181818] px-4 py-3 text-white min-h-[72px] leading-relaxed">
              {form.bio || <span className="text-gray-500">No bio yet</span>}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
