import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiHash,
  FiLock,
  FiArrowRight,
} from "react-icons/fi";
import useThemeInfo from "../../hooks/useThemeInfo";

export default function JoinRoomForm() {
  const navigate = useNavigate();
  const { theme } = useThemeInfo();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    displayName: "",
    roomCode: "",
    password: "",
  });

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const code = formData.roomCode.trim() || "U13966";
    navigate(`/home/room/${code}`);
  }

  const cardClass = isDark
    ? "bg-[#111111]/90 border border-gray-800 backdrop-blur-md"
    : "bg-white border border-gray-200 shadow-lg";

  const headingClass = isDark
    ? "text-white"
    : "text-gray-900";

  const textClass = isDark
    ? "text-gray-400"
    : "text-gray-600";

  const inputClass = isDark
    ? "bg-[#171717] border-gray-700 text-white placeholder-gray-500 focus:border-red-600"
    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-red-600";

  return (
    <form
      onSubmit={handleSubmit}
      className={`${cardClass} rounded-3xl p-8`}
    >
      {/* Header */}

      <div className="mb-8">
        <h2 className={`text-3xl font-bold ${headingClass}`}>
          Room Details
        </h2>

        <p className={`mt-2 ${textClass}`}>
          Fill in the information below to join an
          existing room.
        </p>
      </div>

      {/* Display Name */}

      <div className="mb-6">
        <label
          className={`block mb-2 text-sm font-semibold uppercase tracking-wider ${textClass}`}
        >
          Display Name
        </label>

        <div className="relative">
          <FiUser
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />

          <input
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            placeholder="Your display name"
            className={`w-full rounded-xl border py-3 pl-12 pr-4 outline-none transition ${inputClass}`}
            required
          />
        </div>
      </div>

      {/* Room Code */}

      <div className="mb-6">
        <label
          className={`block mb-2 text-sm font-semibold uppercase tracking-wider ${textClass}`}
        >
          Room Code
        </label>

        <div className="relative">
          <FiHash
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />

          <input
            type="text"
            name="roomCode"
            value={formData.roomCode}
            onChange={handleChange}
            placeholder="ABC123"
            className={`w-full rounded-xl border py-3 pl-12 pr-4 outline-none transition ${inputClass}`}
            required
          />
        </div>
      </div>

      {/* Password */}

      <div className="mb-8">
        <label
          className={`block mb-2 text-sm font-semibold uppercase tracking-wider ${textClass}`}
        >
          Password
          <span className="normal-case font-normal">
            {" "}
            (Optional)
          </span>
        </label>

        <div className="relative">
          <FiLock
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Room password"
            className={`w-full rounded-xl border py-3 pl-12 pr-4 outline-none transition ${inputClass}`}
          />
        </div>
      </div>

      {/* Divider */}

      <div
        className={`border-t mb-8 ${
          isDark
            ? "border-gray-800"
            : "border-gray-200"
        }`}
      />

      {/* Button */}

      <button
        type="submit"
        className="w-full rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-2"
      >
        Join Room

        <FiArrowRight size={18} />
      </button>
    </form>
  );
}