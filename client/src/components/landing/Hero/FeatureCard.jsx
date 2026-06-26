export default function FeatureCard({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="bg-[#18181b]/30 border border-zinc-800/60 p-6 sm:p-8 rounded-3xl space-y-4 hover:border-zinc-700 transition duration-200">

      <div className="w-12 h-12 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl flex items-center justify-center shadow-md">
        <Icon size={18} />
      </div>

      <h3 className="text-xl font-bold text-white">
        {title}
      </h3>

      <p className="text-sm text-zinc-400 leading-relaxed">
        {description}
      </p>

    </div>
  );
}