import { FaFilm, FaDoorOpen, FaClock } from "react-icons/fa";
import useThemeInfo from "../../hooks/useThemeInfo";

function StatItem({ icon: Icon, label, value, color, isDark }) {
  const itemBg = isDark
    ? "border-gray-800 bg-[#181818] hover:border-red-600/40"
    : "border-gray-200 bg-gray-50 hover:border-red-500/40 shadow-sm";

  const valClass = isDark ? "text-white" : "text-gray-900";
  const labelClass = isDark ? "text-gray-400" : "text-gray-600";

  return (
    <div className={`flex flex-col items-center justify-center gap-3 rounded-2xl border p-6 text-center transition hover:shadow-[0_0_20px_rgba(220,38,38,0.08)] ${itemBg}`}>
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl border ${color.border} ${color.bg}`}
      >
        <Icon className={`text-lg ${color.icon}`} />
      </div>
      <p className={`text-3xl font-bold transition-colors duration-300 ${valClass}`}>{value ?? 0}</p>
      <p className={`text-sm font-medium transition-colors duration-300 ${labelClass}`}>{label}</p>
    </div>
  );
}

export default function StatsCard({ user = {} }) {
  const { theme } = useThemeInfo();
  const isDark = theme === "dark";

  const watchHours = Math.floor((user.totalWatchMinutes ?? 0) / 60);
  const watchMins = (user.totalWatchMinutes ?? 0) % 60;
  const watchDisplay =
    watchHours > 0 ? `${watchHours}h ${watchMins}m` : `${watchMins}m`;

  const cardBg = isDark
    ? "border-gray-800 bg-[#111111]"
    : "border-gray-200 bg-white shadow-md";

  const titleClass = isDark ? "text-white" : "text-gray-900";
  const subClass = isDark ? "text-gray-400" : "text-gray-600";
  const dividerClass = isDark ? "bg-gray-800" : "bg-gray-200";

  return (
    <section className={`rounded-3xl border p-7 transition-all duration-300 ${cardBg}`}>
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-950/40 border border-red-800">
          <FaFilm className="text-red-500" />
        </div>
        <div>
          <h2 className={`text-2xl font-bold transition-colors duration-300 ${titleClass}`}>Watch Stats</h2>
          <p className={`text-sm transition-colors duration-300 ${subClass}`}>Your streaming activity at a glance</p>
        </div>
      </div>

      {/* Divider */}
      <div className={`my-6 h-px transition-colors duration-300 ${dividerClass}`} />

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <StatItem
          icon={FaFilm}
          label="Rooms Created"
          value={user.roomsCreated}
          isDark={isDark}
          color={{
            border: "border-red-800",
            bg: "bg-red-950/40",
            icon: "text-red-500",
          }}
        />
        <StatItem
          icon={FaDoorOpen}
          label="Rooms Joined"
          value={user.roomsJoined}
          isDark={isDark}
          color={{
            border: "border-purple-800",
            bg: "bg-purple-950/40",
            icon: "text-purple-400",
          }}
        />
        <StatItem
          icon={FaClock}
          label="Watch Time"
          value={watchDisplay}
          isDark={isDark}
          color={{
            border: "border-blue-800",
            bg: "bg-blue-950/40",
            icon: "text-blue-400",
          }}
        />
      </div>
    </section>
  );
}

