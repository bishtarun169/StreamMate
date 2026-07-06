import useThemeInfo from "../../hooks/useThemeInfo";

export default function Badge({
  children,
  className = "",
  forceDark = false,
}) {
  const { theme } = useThemeInfo();
  const isDark = forceDark || theme === "dark";

  const badgeClass = isDark
    ? "bg-red-950/70 border-red-800 text-red-400 shadow-[0_0_15px_rgba(220,38,38,0.15)]"
    : "bg-red-100/80 border-red-200 text-red-700 shadow-sm";

  return (
    <div
      className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors duration-300 ${badgeClass} ${className}`}
    >
      {children}
    </div>
  );
}