export default function ProfileField({ label, name, value, editing, onChange, placeholder, type = "text" }) {
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
          className="rounded-xl border border-gray-700 bg-[#181818] px-4 py-3 text-white outline-none transition focus:border-red-600 placeholder:text-gray-600"
        />
      ) : (
        <p className="rounded-xl border border-gray-800 bg-[#181818] px-4 py-3 text-white">
          {value || <span className="text-gray-500">Not set</span>}
        </p>
      )}
    </div>
  );
}
