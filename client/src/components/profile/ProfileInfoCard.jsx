import { FaUser, FaCamera } from "react-icons/fa";
import { MdEdit, MdSave, MdClose } from "react-icons/md";
import ProfileField from "./ProfileField";
import { useProfileForm } from "../../hooks/useProfileForm";
import useThemeInfo from "../../hooks/useThemeInfo";

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

  const { theme } = useThemeInfo();
  const isDark = theme === "dark";

  const avatarSrc =
    previewImg ||
    user.profilePic ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=dc2626&color=fff&size=200`;

  const cardBg = isDark
    ? "border-gray-800 bg-[#111111] hover:border-red-600/30"
    : "border-gray-200 bg-white shadow-md hover:border-red-500/30";

  const titleClass = isDark ? "text-white" : "text-gray-900";
  const subClass = isDark ? "text-gray-400" : "text-gray-600";
  const dividerClass = isDark ? "bg-gray-800" : "bg-gray-200";

  const editBtn = isDark
    ? "border-gray-700 text-white hover:border-red-600 hover:bg-red-600"
    : "border-gray-300 text-gray-800 hover:border-red-600 hover:bg-red-600 hover:text-white shadow-sm";

  const cancelBtn = isDark
    ? "border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white"
    : "border-gray-300 text-gray-700 hover:border-gray-500 hover:text-black shadow-sm";

  const inputClass = isDark
    ? "border-gray-700 bg-[#181818] text-white focus:border-red-600 placeholder:text-gray-600"
    : "border-gray-300 bg-gray-50 text-gray-900 focus:border-red-600 focus:bg-white placeholder:text-gray-400";

  const displayClass = isDark
    ? "border-gray-800 bg-[#181818] text-white"
    : "border-gray-200 bg-gray-50 text-gray-900";

  const photoBtn = isDark
    ? "border-gray-700 text-gray-300 hover:border-red-600 hover:text-white"
    : "border-gray-300 text-gray-700 hover:border-red-600 hover:text-black bg-gray-50";

  return (
    <div className={`group flex flex-col rounded-3xl border p-7 transition-all duration-300 hover:shadow-[0_0_35px_rgba(220,38,38,0.07)] ${cardBg}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-800 bg-red-950/40">
            <FaUser className="text-red-500" />
          </div>
          <div>
            <h2 className={`text-2xl font-bold transition-colors duration-300 ${titleClass}`}>Personal Info</h2>
            <p className={`text-sm transition-colors duration-300 ${subClass}`}>Manage your profile details</p>
          </div>
        </div>

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className={`flex items-center gap-2 rounded-xl border bg-transparent px-4 py-2 text-sm font-semibold transition active:scale-95 ${editBtn}`}
          >
            <MdEdit className="text-base" />
            Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              className={`flex items-center gap-1 rounded-xl border px-4 py-2 text-sm font-semibold transition active:scale-95 ${cancelBtn}`}
            >
              <MdClose className="text-base" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1 rounded-xl bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 active:scale-95 disabled:opacity-60 shadow-sm"
            >
              <MdSave className="text-base" />
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className={`my-6 h-px transition-colors duration-300 ${dividerClass}`} />

      {/* Avatar Upload (only when editing) */}
      {editing && (
        <div className="mb-6 flex items-center gap-5">
          <img
            src={avatarSrc}
            alt="Avatar preview"
            className="h-20 w-20 rounded-full object-cover border-2 border-red-600 shadow-md"
          />
          <label className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition ${photoBtn}`}>
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
            isDark={isDark}
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
              className={`rounded-xl border px-4 py-3 outline-none transition ${inputClass}`}
            >
              <option value="">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="other">Other</option>
            </select>
          ) : (
            <p className={`rounded-xl border px-4 py-3 capitalize transition-colors duration-300 ${displayClass}`}>
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
              className={`rounded-xl border px-4 py-3 outline-none transition resize-none ${inputClass}`}
            />
          ) : (
            <p className={`rounded-xl border px-4 py-3 min-h-[72px] leading-relaxed transition-colors duration-300 ${displayClass}`}>
              {form.bio || <span className="text-gray-500">No bio yet</span>}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

