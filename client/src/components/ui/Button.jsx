import { Link } from "react-router-dom";
import useThemeInfo from "../../hooks/useThemeInfo";

export default function Button({
  children,
  to,
  variant = "primary",
  loading = false,
  disabled = false,
  fullWidth = false,
  type = "button",
  className = "",
  forceDark = false,
}) {
  const { theme } = useThemeInfo();
  const isDark = forceDark || theme === "dark";

  const baseClasses = `
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-xl
    px-6
    py-3.5
    font-semibold
    transition-all
    duration-300
    active:scale-95
    disabled:opacity-50
    disabled:cursor-not-allowed
  `;

  const variants = {
    primary:
      "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/25",

    secondary: isDark
      ? "border border-gray-700 bg-transparent text-white hover:border-red-600 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-500/20"
      : "border border-gray-300 bg-white text-gray-800 hover:border-red-600 hover:bg-red-600 hover:text-white shadow-sm hover:shadow-lg hover:shadow-red-500/20",
  };

  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={classes}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}