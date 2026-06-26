export default function ChatMessage({ name, message }) {
  return (
    <div className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/50 flex gap-2">
      <div className="w-6 h-6 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-bold flex items-center justify-center flex-shrink-0">
        {name.charAt(0)}
      </div>

      <div className="text-xs">
        <span className="font-bold text-zinc-200 block">
          {name}
        </span>

        <span className="text-zinc-400">
          {message}
        </span>
      </div>
    </div>
  );
}