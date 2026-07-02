import { FaLightbulb, FaYoutube, FaTwitch, FaShieldAlt, FaUsers } from "react-icons/fa";

export default function RoomTipsCard() {
  return (
    <div className="flex flex-col gap-6">
      {/* Tips Box */}
      <div className="rounded-3xl border border-gray-800 bg-[#111111] p-7 transition hover:border-gray-700">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-950/40 border border-yellow-800/60">
            <FaLightbulb className="text-yellow-500" />
          </div>
          <h3 className="text-lg font-bold text-white">Streaming Guidelines</h3>
        </div>

        <ul className="space-y-4 text-sm text-gray-400">
          <li className="flex items-start gap-3">
            <FaYoutube className="text-red-500 text-lg shrink-0 mt-0.5" />
            <span>
              <strong className="text-gray-200">YouTube Videos:</strong> Simply copy and paste any standard YouTube video or live stream link.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <FaTwitch className="text-purple-400 text-lg shrink-0 mt-0.5" />
            <span>
              <strong className="text-gray-200">Twitch Streams:</strong> Paste the full Twitch channel or stream URL for seamless sync.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <FaShieldAlt className="text-blue-400 text-lg shrink-0 mt-0.5" />
            <span>
              <strong className="text-gray-200">Host Privileges:</strong> As the creator, you have exclusive controls to play, pause, seek, mute, or kick participants.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <FaUsers className="text-green-400 text-lg shrink-0 mt-0.5" />
            <span>
              <strong className="text-gray-200">Sync Precision:</strong> All members automatically synchronize within milliseconds of your video timestamp.
            </span>
          </li>
        </ul>
      </div>

      {/* Quick Help Card */}
      <div className="rounded-3xl border border-red-900/30 bg-gradient-to-b from-red-950/20 to-[#111111] p-7 text-center">
        <h4 className="text-base font-bold text-white">Need Help Setting Up?</h4>
        <p className="mt-2 text-xs text-gray-400 leading-relaxed">
          If your video fails to load for participants, make sure the stream link is public and not age-restricted or region-locked.
        </p>
      </div>
    </div>
  );
}
