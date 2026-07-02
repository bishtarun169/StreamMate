import { FaLightbulb, FaYoutube, FaTwitch, FaShieldAlt, FaUsers } from "react-icons/fa";
import useThemeInfo from "../../hooks/useThemeInfo";

export default function RoomTipsCard() {
  const { theme } = useThemeInfo();
  const isDark = theme === "dark";

  const cardBg = isDark
    ? "border-gray-800 bg-[#111111] hover:border-gray-700"
    : "border-gray-200 bg-white shadow-md hover:border-gray-300";

  const iconBg = isDark
    ? "bg-yellow-950/40 border-yellow-800/60"
    : "bg-yellow-50 border-yellow-200";

  const titleClass = isDark ? "text-white" : "text-gray-900";
  const subClass = isDark ? "text-gray-400" : "text-gray-600";
  const strongClass = isDark ? "text-gray-200" : "text-gray-800";

  const helpCardBg = isDark
    ? "border-red-900/30 bg-gradient-to-b from-red-950/20 to-[#111111]"
    : "border-red-200 bg-gradient-to-b from-red-50/50 to-white shadow-sm";

  return (
    <div className="flex flex-col gap-6">
      {/* Tips Box */}
      <div className={`rounded-3xl border p-7 transition ${cardBg}`}>
        <div className="flex items-center gap-3 mb-5">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-300 ${iconBg}`}>
            <FaLightbulb className="text-yellow-500" />
          </div>
          <h3 className={`text-lg font-bold transition-colors duration-300 ${titleClass}`}>Streaming Guidelines</h3>
        </div>

        <ul className={`space-y-4 text-sm transition-colors duration-300 ${subClass}`}>
          <li className="flex items-start gap-3">
            <FaYoutube className="text-red-500 text-lg shrink-0 mt-0.5" />
            <span>
              <strong className={strongClass}>YouTube Videos:</strong> Simply copy and paste any standard YouTube video or live stream link.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <FaTwitch className="text-purple-400 text-lg shrink-0 mt-0.5" />
            <span>
              <strong className={strongClass}>Twitch Streams:</strong> Paste the full Twitch channel or stream URL for seamless sync.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <FaShieldAlt className="text-blue-400 text-lg shrink-0 mt-0.5" />
            <span>
              <strong className={strongClass}>Host Privileges:</strong> As the creator, you have exclusive controls to play, pause, seek, mute, or kick participants.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <FaUsers className="text-green-400 text-lg shrink-0 mt-0.5" />
            <span>
              <strong className={strongClass}>Sync Precision:</strong> All members automatically synchronize within milliseconds of your video timestamp.
            </span>
          </li>
        </ul>
      </div>

      {/* Quick Help Card */}
      <div className={`rounded-3xl border p-7 text-center transition-colors duration-300 ${helpCardBg}`}>
        <h4 className={`text-base font-bold transition-colors duration-300 ${titleClass}`}>Need Help Setting Up?</h4>
        <p className={`mt-2 text-xs leading-relaxed transition-colors duration-300 ${subClass}`}>
          If your video fails to load for participants, make sure the stream link is public and not age-restricted or region-locked.
        </p>
      </div>
    </div>
  );
}

