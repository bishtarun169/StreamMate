import { useState } from "react";
import { Link } from "react-router-dom";
import { FaYoutube, FaTwitch, FaInstagram, FaGlobe, FaLock, FaGlobeAmericas, FaCopy, FaCheck, FaPlay } from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";
import { useCreateRoom } from "../../hooks/useCreateRoom";

const MEDIA_SOURCES = [
  { id: "youtube", label: "YouTube", icon: FaYoutube, color: "hover:border-red-500 text-red-500" },
  { id: "twitch", label: "Twitch", icon: FaTwitch, color: "hover:border-purple-500 text-purple-400" },
  { id: "instagram", label: "Instagram", icon: FaInstagram, color: "hover:border-pink-500 text-pink-500" },
  { id: "custom", label: "Custom URL", icon: FaGlobe, color: "hover:border-blue-500 text-blue-400" },
];

export default function CreateRoomForm() {
  const {
    form,
    loading,
    error,
    createdRoom,
    handleChange,
    handleSourceChange,
    handlePrivacyChange,
    handleSubmit,
    resetForm,
  } = useCreateRoom();

  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (!createdRoom?.roomCode) return;
    navigator.clipboard.writeText(createdRoom.roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (createdRoom) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-red-800/40 bg-[#111111] p-10 text-center shadow-[0_0_40px_rgba(220,38,38,0.12)]">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-950 border-2 border-red-600">
          <FaPlay className="text-3xl text-red-500 ml-1" />
        </div>

        <h3 className="mt-6 text-3xl font-bold text-white">Room Created!</h3>
        <p className="mt-2 text-gray-400 max-w-md">
          Your watch room <span className="text-white font-semibold">"{createdRoom.roomName}"</span> is ready. Share the code below with your friends to start watching together!
        </p>

        {/* Room Code Banner */}
        <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl border border-gray-700 bg-[#181818] px-6 py-4 w-full max-w-sm">
          <div className="text-left">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Room Code</p>
            <p className="text-2xl font-extrabold text-white tracking-widest mt-0.5">{createdRoom.roomCode}</p>
          </div>

          <button
            onClick={handleCopyCode}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500 active:scale-95"
          >
            {copied ? <FaCheck className="text-green-300" /> : <FaCopy />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-sm">
          <Link
            to="/home"
            className="flex-1 rounded-xl border border-gray-700 py-3.5 font-semibold text-gray-300 transition hover:border-gray-500 hover:text-white"
          >
            Back to Dashboard
          </Link>
          <button
            onClick={resetForm}
            className="flex-1 rounded-xl bg-red-700 py-3.5 font-semibold text-white transition hover:bg-red-600 active:scale-95"
          >
            Create Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col rounded-3xl border border-gray-800 bg-[#111111] p-8 transition hover:border-red-600/30">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-800 bg-red-950/40">
          <MdAddCircleOutline className="text-2xl text-red-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Room Configuration</h2>
          <p className="text-sm text-gray-400">Set up your synchronized streaming preferences</p>
        </div>
      </div>

      <div className="my-6 h-px bg-gray-800" />

      {error && (
        <div className="mb-6 rounded-xl border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Room Name */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Room Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="roomName"
            value={form.roomName}
            onChange={handleChange}
            placeholder="e.g. Weekend Movie Night 🍿"
            className="rounded-xl border border-gray-700 bg-[#181818] px-4 py-3 text-white outline-none transition focus:border-red-600 placeholder:text-gray-600"
          />
        </div>

        {/* Media Source Tabs */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Media Source
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {MEDIA_SOURCES.map((src) => {
              const Icon = src.icon;
              const isSelected = form.mediaSource === src.id;
              return (
                <button
                  type="button"
                  key={src.id}
                  onClick={() => handleSourceChange(src.id)}
                  className={`flex items-center justify-center gap-2 rounded-xl border py-3 px-3 text-sm font-semibold transition ${
                    isSelected
                      ? "border-red-600 bg-red-950/40 text-white shadow-[0_0_15px_rgba(220,38,38,0.15)]"
                      : `border-gray-800 bg-[#181818] text-gray-400 ${src.color} hover:text-white`
                  }`}
                >
                  <Icon className="text-lg" />
                  {src.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Video URL */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Stream Link / URL <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="videoURL"
            value={form.videoURL}
            onChange={handleChange}
            placeholder="https://www.youtube.com/watch?v=..."
            className="rounded-xl border border-gray-700 bg-[#181818] px-4 py-3 text-white outline-none transition focus:border-red-600 placeholder:text-gray-600"
          />
          <p className="text-xs text-gray-500">Paste the full URL of the media you wish to synchronize with participants.</p>
        </div>

        {/* Privacy Setting */}
        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Room Privacy
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handlePrivacyChange("public")}
                className={`flex items-center justify-center gap-2 rounded-xl border py-3 px-4 text-sm font-semibold transition ${
                  form.privacy === "public"
                    ? "border-red-600 bg-red-950/40 text-white"
                    : "border-gray-800 bg-[#181818] text-gray-400 hover:border-gray-700 hover:text-white"
                }`}
              >
                <FaGlobeAmericas /> Public
              </button>
              <button
                type="button"
                onClick={() => handlePrivacyChange("private")}
                className={`flex items-center justify-center gap-2 rounded-xl border py-3 px-4 text-sm font-semibold transition ${
                  form.privacy === "private"
                    ? "border-red-600 bg-red-950/40 text-white"
                    : "border-gray-800 bg-[#181818] text-gray-400 hover:border-gray-700 hover:text-white"
                }`}
              >
                <FaLock /> Private
              </button>
            </div>
          </div>

          {/* Password Input (If Private) */}
          {form.privacy === "private" ? (
            <div className="flex flex-col gap-2 animate-fadeIn">
              <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Room Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Set a secret room password"
                className="rounded-xl border border-gray-700 bg-[#181818] px-4 py-3 text-white outline-none transition focus:border-red-600 placeholder:text-gray-600"
              />
            </div>
          ) : (
            <div className="flex flex-col justify-center px-4 rounded-xl border border-gray-800/50 bg-[#151515] text-xs text-gray-400 mt-6 sm:mt-0">
              Anyone with the room code can join without a password.
            </div>
          )}
        </div>

        {/* Max Participants Slider */}
        <div className="flex flex-col gap-2 pt-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Max Participants
            </label>
            <span className="text-sm font-bold text-red-500 bg-red-950/40 border border-red-800 px-3 py-1 rounded-lg">
              {form.maxParticipants} Members
            </span>
          </div>
          <input
            type="range"
            name="maxParticipants"
            min="2"
            max="100"
            value={form.maxParticipants}
            onChange={handleChange}
            className="w-full accent-red-600 bg-gray-800 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-gray-500 font-medium px-1">
            <span>2 (Intimate)</span>
            <span>50 (Party)</span>
            <span>100 (Max Capacity)</span>
          </div>
        </div>
      </div>

      <div className="my-8 h-px bg-gray-800" />

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-red-600 py-4 font-bold text-white text-lg transition hover:bg-red-500 active:scale-95 disabled:opacity-60 shadow-[0_0_25px_rgba(220,38,38,0.25)]"
      >
        {loading ? "Creating Room…" : "Launch Watch Room"}
      </button>
    </form>
  );
}
