export default function ProfileField({ label, name, value, editing, onChange, placeholder, type = "text", isDark = true }) {
  const inputClass = isDark
    ? "border-gray-700 bg-[#181818] text-white placeholder:text-gray-600 focus:border-red-600"
    : "border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-red-600 focus:bg-white";

  const displayClass = isDark
    ? "border-gray-800 bg-[#181818] text-white"
    : "border-gray-200 bg-gray-50 text-gray-900";

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">
        {label}
      </label>
      {editing ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`rounded-xl border px-4 py-3 outline-none transition ${inputClass}`}
        />
      ) : (
        <p className={`rounded-xl border px-4 py-3 transition-colors duration-300 ${displayClass}`}>
          {value || <span className="text-gray-500">Not set</span>}
        </p>
      )}
    </div>
  );
}

