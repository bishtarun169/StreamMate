import { FaHistory, FaPlay } from "react-icons/fa";

export default function RecentRooms({ rooms = [] }) {
  return (
    <section className="rounded-3xl border border-gray-800 bg-[#111111] p-7">

      {/* Header */}
      <div className="flex items-center gap-3">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-950/40 border border-red-800">
          <FaHistory className="text-red-500" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Watch Parties
          </h2>

          <p className="text-sm text-gray-400">
            Continue watching where you left off
          </p>
        </div>

      </div>

      {/* Content */}

      {rooms.length === 0 ? (

        <div className="mt-12 flex flex-col items-center justify-center text-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1a1a1a]">

            <FaPlay className="text-3xl text-gray-600" />

          </div>

          <h3 className="mt-6 text-2xl font-semibold text-white">
            No Recent Watch Parties
          </h3>

          <p className="mt-3 max-w-lg text-gray-400 leading-7">
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
              className="flex items-center justify-between rounded-2xl border border-gray-800 bg-[#181818] p-5 hover:border-red-600 transition"
            >

              <div>

                <h3 className="text-lg font-semibold text-white">
                  {room.name}
                </h3>

                <p className="mt-1 text-sm text-gray-400">
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