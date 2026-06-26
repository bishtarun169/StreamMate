export default function Alert({
  type = "error",
  children,
  className = "",
}) {
  if (!children) return null;
  const variants = {
    error:
      "border-red-500 bg-red-500/10 text-red-400",

    success:
      "border-green-500 bg-green-500/10 text-green-400",

    warning:
      "border-yellow-500 bg-yellow-500/10 text-yellow-400",

    info:
      "border-blue-500 bg-blue-500/10 text-blue-400",
  };

  return (
    <div
      className={`
        rounded-xl
        border
        px-4
        py-3
        text-sm
        ${variants[type]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}