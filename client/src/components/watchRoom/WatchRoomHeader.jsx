import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCopy, FaCheck, FaArrowLeft, FaUsers, FaShareAlt } from "react-icons/fa";
import useThemeInfo from "../../hooks/useThemeInfo";

export default function WatchRoomHeader({ roomName = "Movie Night", onlineCount = 4 }) {
  const { roomCode } = useParams();
  const { theme } = useThemeInfo();
  const isDark = theme === "dark";
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomCode || "U13966");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cardClass = isDark
    ? "bg-[#111111] border-gray-800 text-white shadow-xl"
    : "bg-white border-gray-200 text-gray-900 shadow-md";

  const btnClass = isDark
    ? "bg-[#181818] border-gray-700 text-gray-300 hover:text-white hover:border-gray-500"
    : "bg-gray-100 border-gray-200 text-gray-700 hover:text-black hover:bg-gray-200";

  return (
    <div className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-3xl border p-5 transition-colors duration-300 ${cardClass}`}>
      {/* Left section: Back & Room Title */}
      <div className="flex items-center gap-4">
        <Link
          to="/home"
          className={`flex items-center justify-center w-10 h-10 rounded-2xl border transition duration-200 ${btnClass}`}
          title="Leave Room"
        >
          <FaArrowLeft className="text-sm" />
        </Link>

        <div>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-0.5 text-[10px] font-bold text-white shadow">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping"></span>
              LIVE
            </span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{roomName}</h1>
          </div>
          <p className={`text-xs mt-0.5 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Synchronized watch session in progress
          </p>
        </div>
      </div>

      {/* Right section: Code, Online Count, Share */}
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
        <div className={`flex items-center gap-2 rounded-2xl border px-3.5 py-1.5 text-xs font-semibold ${isDark ? "bg-[#181818] border-gray-700 text-gray-300" : "bg-gray-50 border-gray-200 text-gray-700"}`}>
          <FaUsers className="text-red-500" />
          <span>{onlineCount} Watching</span>
        </div>

        <div className={`flex items-center gap-2 rounded-2xl border pl-3 pr-1.5 py-1 text-xs font-semibold ${isDark ? "bg-[#181818] border-gray-700" : "bg-gray-50 border-gray-200"}`}>
          <span className="text-gray-400">CODE:</span>
          <span className="font-mono text-sm font-bold text-red-500 uppercase tracking-wider">{roomCode || "U13966"}</span>
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1 rounded-xl bg-red-600 px-2.5 py-1 text-[11px] font-bold text-white transition hover:bg-red-500 active:scale-95"
          >
            {copied ? <FaCheck className="text-green-300" /> : <FaCopy />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
