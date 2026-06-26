export default function AuthCard({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        w-full
        max-w-xl
        rounded-lg
        border
        border-zinc-800
        bg-[#18181b]/80
        p-8
        shadow-2xl
        backdrop-blur-md
        sm:p-10
        ${className}
      `}
    >
      {children}
    </div>
  );
}