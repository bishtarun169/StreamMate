export default function TrustItem({ children }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-3 w-3 rounded-full bg-green-500"></div>
      <span className="text-sm text-zinc-500">
        {children}
      </span>
    </div>
  );
}