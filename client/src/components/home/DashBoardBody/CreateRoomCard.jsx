import { FaPlus } from "react-icons/fa";

export default function CreateRoomCard() {
  return (
    <div className="group flex h-full flex-col rounded-3xl border border-gray-800 bg-[#111111] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-red-600/50 hover:shadow-[0_0_35px_rgba(220,38,38,0.12)]">
      {/* Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-800 bg-red-950/40">
        <FaPlus className="text-lg text-red-500" />
      </div>

      {/* Title */}
      <h2 className="mt-7 text-3xl font-bold text-white">Create Watch Room</h2>

      {/* Description */}
      <p className="mt-4 flex-1 text-base leading-8 text-gray-400">
        Start a brand new watch party. Choose your room name, paste the movie
        stream link, and invite your friends to enjoy synchronized streaming.
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
          transition-all
          duration-300
          hover:border-red-600
          hover:bg-red-600
          hover:text-white
          active:scale-95
        "
      >
        Create Room
      </button>
    </div>
  );
}
