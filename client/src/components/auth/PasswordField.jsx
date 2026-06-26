import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordField({
  value,
  onChange,
  showPassword,
  setShowPassword,
  placeholder = "Password",
  required = true,
}) {
  return (
    <div className="relative">

      <input
        type={showPassword ? "text" : "password"}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className="
          w-full
          rounded-lg
          border
          border-zinc-700
          bg-zinc-900/60
          px-4
          py-3
          pr-12
          text-white
          outline-none
          transition
          focus:border-red-500
          focus:ring-1
          focus:ring-red-500/50
        "
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>

    </div>
  );
}