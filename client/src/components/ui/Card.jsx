export default function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-3xl border border-zinc-800/60 bg-[#18181b]/30 ${className}`}
    >
      {children}
    </div>
  );
}