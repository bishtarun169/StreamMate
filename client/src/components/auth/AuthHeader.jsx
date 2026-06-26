export default function AuthHeader({
  title,
  subtitle,
  highlight = false,
}) {
  return (
    <div className="text-center">

      <h1
        className={`text-4xl font-black tracking-tight ${
          highlight ? "text-red-500" : "text-white"
        }`}
      >
        {title}
      </h1>

      {subtitle && (
        <p className="mt-2 text-zinc-400">
          {subtitle}
        </p>
      )}

    </div>
  );
}