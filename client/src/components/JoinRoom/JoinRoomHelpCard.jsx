import { FiHelpCircle } from "react-icons/fi";
import useThemeInfo from "../../hooks/useThemeInfo";

export default function JoinRoomHelpCard() {
  const { theme } = useThemeInfo();
  const isDark = theme === "dark";

  const cardClass = isDark
    ? "bg-gradient-to-br from-red-950/30 to-[#111111] border border-red-900/40 backdrop-blur-md"
    : "bg-red-50 border border-red-200 shadow-lg";

  const headingClass = isDark
    ? "text-white"
    : "text-gray-900";

  const textClass = isDark
    ? "text-gray-300"
    : "text-gray-700";

  return (
    <div className={`${cardClass} rounded-3xl p-8`}>
      <div className="flex items-center gap-3 mb-5">
        <div className="h-11 w-11 rounded-xl bg-red-600 flex items-center justify-center">
          <FiHelpCircle className="text-white text-xl" />
        </div>

        <h2 className={`text-2xl font-bold ${headingClass}`}>
          Need Help?
        </h2>
      </div>

      <p className={`leading-7 ${textClass}`}>
        If you're unable to join a room, verify the room code,
        check the password (if required), and ensure the room is
        still active. You can always ask the host to resend the
        invitation.
      </p>

      <button className="mt-6 w-full rounded-xl border border-red-600 text-red-500 hover:bg-red-600 hover:text-white transition py-3 font-semibold">
        Contact Host
      </button>
    </div>
  );
}