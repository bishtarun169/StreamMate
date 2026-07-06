import { FaHistory, FaPlay } from "react-icons/fa";
import useThemeInfo from "../../../hooks/useThemeInfo";

export default function RecentRooms({ rooms = [] }) {
  const { theme } = useThemeInfo();
  const isDark = theme === "dark";

  const sectionBg = isDark
    ? "border-gray-800 bg-[#111111]"
    : "border-gray-200 bg-white shadow-md";

  const iconBg = isDark ? "bg-red-950/40 border-red-800" : "bg-red-50 border-red-200";
  const titleClass = isDark ? "text-white" : "text-gray-900";
  const subClass = isDark ? "text-gray-400" : "text-gray-500";
  const emptyCircleBg = isDark ? "bg-[#1a1a1a]" : "bg-gray-100";
  const emptyTitleClass = isDark ? "text-white" : "text-gray-800";
  const emptyDescClass = isDark ? "text-gray-400" : "text-gray-500";

  const roomItemClass = isDark
    ? "border-gray-800 bg-[#181818] hover:border-red-600"
    : "border-gray-200 bg-gray-50 hover:border-red-500 hover:bg-white shadow-sm";

  return (
    <section className={`rounded-3xl border p-7 transition-all duration-300 ${sectionBg}`}>

      {/* Header */}
      <div className="flex items-center gap-3">

        <div className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-colors duration-300 ${iconBg}`}>
          <FaHistory className="text-red-500" />
        </div>

        <div>
          <h2 className={`text-2xl font-bold transition-colors duration-300 ${titleClass}`}>
            Recent Watch Parties
          </h2>

          <p className={`text-sm transition-colors duration-300 ${subClass}`}>
            Continue watching where you left off
          </p>
        </div>

      </div>

      {/* Content */}

      {rooms.length === 0 ? (

        <div className="mt-12 flex flex-col items-center justify-center text-center">

          <div className={`flex h-20 w-20 items-center justify-center rounded-full transition-colors duration-300 ${emptyCircleBg}`}>

            <FaPlay className="text-3xl text-gray-500" />

          </div>

          <h3 className={`mt-6 text-2xl font-semibold transition-colors duration-300 ${emptyTitleClass}`}>
            No Recent Watch Parties
          </h3>

          <p className={`mt-3 max-w-lg leading-7 transition-colors duration-300 ${emptyDescClass}`}>
            Your recently joined or created watch rooms will
            appear here. Start watching movies with your
            friends to build your history.
          </p>

        </div>

      ) : (

        <div className="mt-8 space-y-4">

          {rooms.map((room) => (

            <div
              key={room.id}
              className={`flex items-center justify-between rounded-2xl border p-5 transition-all duration-300 ${roomItemClass}`}
            >

              <div>

                <h3 className={`text-lg font-semibold transition-colors duration-300 ${titleClass}`}>
                  {room.name}
                </h3>

                <p className={`mt-1 text-sm transition-colors duration-300 ${subClass}`}>
                  {room.members} Members • {room.movie}
                </p>

              </div>

              <button className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-500 transition">
                Rejoin
              </button>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}