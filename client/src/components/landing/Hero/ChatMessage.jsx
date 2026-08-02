export default function ChatMessage({ name, message }) {
  return (
    <div className="p-2.5 rounded-xl border flex gap-2.5 transition-colors duration-300 bg-[#151515] border-gray-800/80 text-gray-300">
      <div className="w-6 h-6 rounded-full border text-xs font-bold flex items-center justify-center flex-shrink-0 bg-red-950/60 border-red-800 text-red-400">
        {name.charAt(0)}
      </div>

      <div className="text-xs">
        <span className="font-bold block text-white">
          {name}
        </span>

        <span>
          {message}
        </span>
      </div>
    </div>
  );
}