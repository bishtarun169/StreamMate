export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  className = ""
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`
        w-full
        rounded-lg
        border
        border-zinc-700
        bg-zinc-900/60
        px-4
        py-3
        text-white
        outline-none
        transition
        focus:border-red-500
        focus:ring-1
        focus:ring-red-500/50
        ${className}
      `}
    />
  );
}