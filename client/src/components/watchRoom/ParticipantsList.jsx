import { FaUsers, FaCheckCircle, FaMicrophoneSlash, FaVideoSlash } from "react-icons/fa";
import useThemeInfo from "../../hooks/useThemeInfo";

export default function ParticipantsList({ participants = [] }) {
  const { theme } = useThemeInfo();
  const isDark = theme === "dark";

  const bgClass = isDark
    ? "bg-[#111111] border-gray-800 text-white"
    : "bg-white border-gray-200 text-gray-900";

  const itemBg = isDark
    ? "bg-[#181818] border-gray-800"
    : "bg-gray-50 border-gray-200";

  return (
    <div className={`flex flex-col h-[470px] rounded-3xl border p-5 transition-colors duration-300 ${bgClass}`}>
      <div className="flex items-center justify-between border-b pb-3.5 mb-4 border-gray-800/80">
        <div className="flex items-center gap-2">
          <FaUsers className="text-red-500" />
          <h3 className="font-bold text-sm">Room Participants</h3>
        </div>
        <span className="text-xs font-bold text-gray-400">{participants.length} Online</span>
      </div>

      <div className="space-y-3 overflow-y-auto flex-1 pr-1">
        {participants.map((user) => (
          <div key={user.id} className={`flex items-center justify-between p-3 rounded-2xl border transition ${itemBg}`}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full border border-gray-700 object-cover" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-black"></span>
              </div>
              <div>
                <p className="text-xs font-bold flex items-center gap-1.5">
                  {user.name}
                </p>
                <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                  <FaCheckCircle className="text-green-500 text-[9px]" /> {user.status}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-500">
              {user.role === "Host" ? (
                <span className="rounded bg-red-600/20 border border-red-600/40 px-2 py-0.5 text-[9px] font-bold text-red-500">
                  HOST
                </span>
              ) : (
                <span className="rounded bg-gray-700/30 px-2 py-0.5 text-[9px] font-bold text-gray-400">
                  VIEWER
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
