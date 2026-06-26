import { Link } from "react-router-dom";

export default function Button({
  children,
  to,
  variant = "primary",
  loading = false,
  disabled = false,
  fullWidth = false,
  type = "button",
  className = ""
}) {
  const baseClasses = `
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-lg
    px-6
    py-3
    font-semibold
    transition-all
    duration-200
    active:scale-95
    disabled:opacity-50
    disabled:cursor-not-allowed
  `;

  const variants = {
    primary:
      "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/20",

    secondary:
      "border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-900",
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