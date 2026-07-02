import { FaSignInAlt } from "react-icons/fa";
import useThemeInfo from "../../../hooks/useThemeInfo";

export default function JoinRoomCard() {
  const { theme } = useThemeInfo();
  const isDark = theme === "dark";

  const cardBg = isDark
    ? "border-gray-800 bg-[#111111] hover:border-red-600/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)]"
    : "border-gray-200 bg-white shadow-md hover:border-red-500 hover:shadow-[0_10px_30px_rgba(220,38,38,0.15)]";

  const iconBg = isDark ? "border-red-800 bg-red-950/40" : "border-red-200 bg-red-50";
  const titleClass = isDark ? "text-white" : "text-gray-900";
  const descClass = isDark ? "text-gray-400" : "text-gray-600";
  const btnClass = isDark
    ? "border-gray-700 text-white hover:border-red-600 hover:bg-red-600 hover:text-white"
    : "border-gray-300 text-gray-800 hover:border-red-600 hover:bg-red-600 hover:text-white shadow-sm";

  return (
    <div className={`group flex h-full flex-col rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 ${cardBg}`}>
      {/* Icon */}
      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition-colors duration-300 ${iconBg}`}>
        <FaSignInAlt className="text-lg text-red-500" />
      </div>

      {/* Title */}
      <h2 className={`mt-7 text-3xl font-bold transition-colors duration-300 ${titleClass}`}>Join Watch Room</h2>

      {/* Description */}
      <p className={`mt-4 flex-1 text-base leading-8 transition-colors duration-300 ${descClass}`}>
        Have a room code from a friend? Enter it here to hop directly into their
        synchronized watch room.
      </p>

      {/* Button */}
      <button
        className={`
          mt-auto
          w-full
          rounded-xl
          border
          bg-transparent
          py-4
          text-lg
          font-semibold
          transition
          duration-300
          active:scale-95
          ${btnClass}
        `}
      >
        Join Room
      </button>
    </div>
  );
}

