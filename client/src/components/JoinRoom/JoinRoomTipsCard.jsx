import {
  FiInfo,
  FiCheckCircle,
  FiWifi,
  FiShield,
  FiClock,
} from "react-icons/fi";
import useThemeInfo from "../../hooks/useThemeInfo";

export default function JoinRoomTipsCard() {
  const { theme } = useThemeInfo();
  const isDark = theme === "dark";

  const cardClass = isDark
    ? "bg-[#111111]/90 border border-gray-800 backdrop-blur-md"
    : "bg-white border border-gray-200 shadow-lg";

  const headingClass = isDark
    ? "text-white"
    : "text-gray-900";

  const textClass = isDark
    ? "text-gray-400"
    : "text-gray-600";

  const tips = [
    {
      icon: <FiCheckCircle />,
      text: "Get the room code from the host.",
    },
    {
      icon: <FiShield />,
      text: "Private rooms require the correct password.",
    },
    {
      icon: <FiWifi />,
      text: "Use a stable internet connection.",
    },
    {
      icon: <FiClock />,
      text: "Join before the host starts playback.",
    },
  ];

  return (
    <div className={`${cardClass} rounded-3xl p-8`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-11 w-11 rounded-xl bg-red-600 flex items-center justify-center">
          <FiInfo className="text-white text-xl" />
        </div>

        <h2 className={`text-2xl font-bold ${headingClass}`}>
          Joining Tips
        </h2>
      </div>

      <div className="space-y-5">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="flex items-start gap-4"
          >
            <div className="text-red-500 text-lg mt-1">
              {tip.icon}
            </div>

            <p className={textClass}>
              {tip.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}