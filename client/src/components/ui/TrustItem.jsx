import useThemeInfo from "../../hooks/useThemeInfo";

export default function TrustItem({ children, forceDark = false }) {
  const { theme } = useThemeInfo();
  const isDark = forceDark || theme === "dark";

  return (
    <div className="flex items-center gap-2">
      <div className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
      <span className={`text-sm font-medium transition-colors duration-300 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        {children}
      </span>
    </div>
  );
}