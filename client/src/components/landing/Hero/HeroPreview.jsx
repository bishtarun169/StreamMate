import { FaPlay, FaUsers } from "react-icons/fa";
import ChatMessage from "./ChatMessage";
import Card from "../../ui/Card";

export default function HeroPreview() {
  return (
    <div className="lg:col-span-5 relative">
      <Card className="bg-[#18181b]/60 p-4 sm:p-5 backdrop-blur-xl shadow-2xl overflow-hidden group hover:border-zinc-700 transition duration-300">

        {/* Mock Player */}
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-black flex items-center justify-center">

          {/* Thumbnail */}
          <img
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop"
            alt="Movie Preview"
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />

          {/* Overlay */}
          <div className="absolute inset-0 z-10 flex flex-col justify-between bg-gradient-to-t from-black/80 via-transparent to-transparent p-4">

            {/* Live Badge */}
            <span className="inline-flex w-fit items-center gap-2 rounded-md bg-red-600 px-2 py-1 text-[10px] font-bold text-white">
              <span className="h-2 w-2 rounded-full bg-white animate-ping"></span>
              LIVE
            </span>

            {/* Timeline */}
            <div className="space-y-2">

              <div className="flex justify-between text-[10px] font-semibold text-zinc-400">
                <span>01:14:32</span>
                <span>02:30:00</span>
              </div>

              <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-800">
                <div className="relative h-full w-[45%] rounded-full bg-red-500">
                  <div className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-red-500 bg-white shadow"></div>
                </div>
              </div>

            </div>

          </div>

          {/* Play Button */}
          <button
            className="
              relative
              z-20
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-red-600/90
              text-white
              shadow-lg
              transition
              duration-300
              hover:scale-110
              hover:bg-red-500
            "
          >
            <FaPlay className="ml-1" size={18} />
          </button>

        </div>

        {/* Chat Preview */}
        <div className="mt-4 space-y-3">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">

            <span className="text-xs font-bold text-zinc-300">
              Live Watch Chat
            </span>

            <span className="flex items-center gap-1 text-[10px] font-semibold text-red-400">
              <FaUsers size={12} />
              4 Online
            </span>

          </div>

          {/* Messages */}
          <div className="space-y-2">

            <ChatMessage
              name="Alok"
              message="Syncing movie playback now!"
            />

            <ChatMessage
              name="Sarah"
              message="Perfectly synced up! 🍿"
            />

          </div>

        </div>

      </Card>
    </div>
  );
}