export default function Badge({
  children,
  className = "",
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}