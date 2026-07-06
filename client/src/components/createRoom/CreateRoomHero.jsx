import { FaVideo } from "react-icons/fa";
import useThemeInfo from "../../hooks/useThemeInfo";

export default function CreateRoomHero() {
  const { theme } = useThemeInfo();
  const isDark = theme === "dark";

  const containerBg = isDark
    ? "border-red-900/20 bg-gradient-to-r from-[#1b1113] via-[#151515] to-[#101010]"
    : "border-red-200 bg-gradient-to-r from-red-50 via-white to-orange-50 shadow-lg shadow-red-500/5";

  const bgText = isDark ? "text-red-900/5" : "text-red-600/5";

  const badgeClass = isDark
    ? "bg-red-950/70 border-red-800 text-red-400"
    : "bg-red-100/80 border-red-200 text-red-700";

  const headingClass = isDark ? "text-white" : "text-gray-900";
  const subClass = isDark ? "text-gray-400" : "text-gray-600";

  return (
    <section className={`relative overflow-hidden rounded-3xl border px-8 py-8 transition-all duration-300 ${containerBg}`}>
      {/* Background Watermark Text */}
      <h1 className={`absolute right-6 top-1/2 -translate-y-1/2 text-[110px] font-extrabold select-none pointer-events-none transition-colors duration-300 ${bgText}`}>
        PARTY
      </h1>

      {/* Badge */}
      <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1 border transition-colors duration-300 ${badgeClass}`}>
        <FaVideo className="text-red-500 text-xs" />
        <span className="text-sm font-semibold">
          Host a Watch Session
        </span>
      </div>

      {/* Heading */}
      <h2 className={`mt-5 text-5xl font-bold leading-tight transition-colors duration-300 ${headingClass}`}>
        Create Your <span className="text-red-600">Watch Room</span>
      </h2>

      {/* Subtitle */}
      <p className={`mt-4 max-w-2xl text-lg leading-8 transition-colors duration-300 ${subClass}`}>
        Pick a movie or live stream, customize room permissions, and invite friends to enjoy synchronized real-time playback together.
      </p>
    </section>
  );
}

