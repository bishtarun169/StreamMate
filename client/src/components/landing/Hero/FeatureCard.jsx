export default function FeatureCard({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="group flex h-full flex-col rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 border-gray-800 bg-[#111111] hover:border-red-600/50 hover:shadow-[0_0_35px_rgba(220,38,38,0.12)]">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border transition-colors duration-300 border-red-800 bg-red-950/40">
        <Icon className="text-lg text-red-500" />
      </div>

      <h3 className="mt-6 text-2xl font-bold transition-colors duration-300 text-white">
        {title}
      </h3>

      <p className="mt-3 flex-1 text-base leading-relaxed transition-colors duration-300 text-gray-400">
        {description}
      </p>
    </div>
  );
}