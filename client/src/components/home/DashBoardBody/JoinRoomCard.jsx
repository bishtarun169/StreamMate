import { FaSignInAlt } from "react-icons/fa";

export default function JoinRoomCard() {
  return (
    <div className="group flex h-full flex-col rounded-3xl border border-gray-800 bg-[#111111] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-red-600/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)]">
      {/* Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-800 bg-red-950/40">
        <FaSignInAlt className="text-lg text-red-500" />
      </div>

      {/* Title */}
      <h2 className="mt-7 text-3xl font-bold text-white">Join Watch Room</h2>

      {/* Description */}
      <p className="mt-4 flex-1 text-base leading-8 text-gray-400">
        Have a room code from a friend? Enter it here to hop directly into their
        synchronized watch room.
      </p>

      {/* Button */}
      <button
        className="
          mt-auto
          w-full
          rounded-xl
          border
          border-gray-700
          bg-transparent
          py-4
          text-lg
          font-semibold
          text-white
          transition
          duration-300
          hover:border-red-600
          hover:bg-red-600
          active:scale-95
        "
      >
        Join Room
      </button>
    </div>
  );
}
