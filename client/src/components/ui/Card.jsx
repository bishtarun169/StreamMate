import useThemeInfo from "../../hooks/useThemeInfo";

export default function Card({ children, className = "", forceDark = false }) {
  const { theme } = useThemeInfo();
  const isDark = forceDark || theme === "dark";

  const cardBg = isDark
    ? "border-gray-800 bg-[#111111] shadow-[0_0_35px_rgba(0,0,0,0.5)]"
    : "border-gray-200 bg-white shadow-xl shadow-gray-200/50";

  return (
    <div
      className={`rounded-3xl border transition-all duration-300 ${cardBg} ${className}`}
    >
      {children}
    </div>
  );
}