import { FiUsers } from "react-icons/fi";
import useThemeInfo from "../../hooks/useThemeInfo";

export default function JoinRoomHero() {
  const { theme } = useThemeInfo();
  const isDark = theme === "dark";

  const cardClass = isDark
    ? "bg-[#111111]/90 border border-gray-800 backdrop-blur-md"
    : "bg-white border border-gray-200 shadow-lg";

  const headingClass = isDark ? "text-white" : "text-gray-900";

  const textClass = isDark ? "text-gray-400" : "text-gray-600";

  return (
    <section
      className={`${cardClass} relative overflow-hidden rounded-3xl px-8 py-10`}
    >
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-red-700 bg-red-950/20 px-4 py-2">
        <FiUsers className="text-red-500" />
        <span className="text-sm font-semibold text-red-500">
          Watch Together
        </span>
      </div>

      {/* Heading */}
      <h1
        className={`mt-6 text-4xl md:text-5xl font-extrabold ${headingClass}`}
      >
        Join an Existing{" "}
        <span className="text-red-600">
          Watch Room
        </span>
      </h1>

      {/* Description */}
      <p
        className={`mt-5 max-w-3xl text-lg leading-8 ${textClass}`}
      >
        Already have a room code? Enter your details below and jump straight
        into a synchronized watch party with your friends.
      </p>

      {/* Decorative Text */}
      <span className="absolute right-8 top-6 hidden lg:block text-8xl font-black text-red-900/10 select-none">
        JOIN
      </span>
    </section>
  );
}