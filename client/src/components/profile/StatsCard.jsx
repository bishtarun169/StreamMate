import { FaFilm, FaDoorOpen, FaClock } from "react-icons/fa";

function StatItem({ icon: Icon, label, value, color }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-800 bg-[#181818] p-6 text-center transition hover:border-red-600/40 hover:shadow-[0_0_20px_rgba(220,38,38,0.08)]">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl border ${color.border} ${color.bg}`}
      >
        <Icon className={`text-lg ${color.icon}`} />
      </div>
      <p className="text-3xl font-bold text-white">{value ?? 0}</p>
      <p className="text-sm text-gray-400 font-medium">{label}</p>
    </div>
  );
}

export default function StatsCard({ user = {} }) {
  const watchHours = Math.floor((user.totalWatchMinutes ?? 0) / 60);
  const watchMins = (user.totalWatchMinutes ?? 0) % 60;
  const watchDisplay =
    watchHours > 0 ? `${watchHours}h ${watchMins}m` : `${watchMins}m`;

  return (
    <section className="rounded-3xl border border-gray-800 bg-[#111111] p-7">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-950/40 border border-red-800">
          <FaFilm className="text-red-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Watch Stats</h2>
          <p className="text-sm text-gray-400">Your streaming activity at a glance</p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 h-px bg-gray-800" />

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <StatItem
          icon={FaFilm}
          label="Rooms Created"
          value={user.roomsCreated}
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
