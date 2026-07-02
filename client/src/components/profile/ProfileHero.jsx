import { FaUserCircle } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import useThemeInfo from "../../hooks/useThemeInfo";

export default function ProfileHero({ user = {} }) {
  const { theme } = useThemeInfo();
  const isDark = theme === "dark";

  const containerBg = isDark
    ? "border-red-900/20 bg-gradient-to-r from-[#1b1113] via-[#151515] to-[#101010]"
    : "border-red-200 bg-gradient-to-r from-red-50 via-white to-orange-50 shadow-lg shadow-red-500/5";

  const bgText = isDark ? "text-red-900/5" : "text-red-600/5";

  const badgeClass = isDark
    ? "bg-red-950/70 border-red-800 text-red-400"
    : "bg-red-100/80 border-red-200 text-red-700";

  const headingClass = isDark ? "text-white" : "text-gray-900";
  const subClass = isDark ? "text-gray-400" : "text-gray-600";
  const emailClass = isDark ? "text-gray-500" : "text-gray-400";

  const profileImage =
    user.profilePic ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=dc2626&color=fff&size=200`;

  return (
    <section className={`relative overflow-hidden rounded-3xl border px-8 py-8 transition-all duration-300 ${containerBg}`}>
      {/* Background Text */}
      <h2 className={`absolute right-6 top-1/2 -translate-y-1/2 text-[120px] font-extrabold select-none pointer-events-none transition-colors duration-300 ${bgText}`}>
        PROFILE
      </h2>

      <div className="relative flex items-center gap-8">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <img
            src={profileImage}
            alt="Profile"
            className="h-24 w-24 rounded-full object-cover border-4 border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.4)]"
          />
          <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#151515] border-2 border-red-600">
            <FaUserCircle className="text-red-500 text-sm" />
          </span>
        </div>

        {/* Info */}
        <div>
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1 border transition-colors duration-300 ${badgeClass}`}>
            <MdVerified className="text-red-500 text-xs" />
            <span className="text-sm font-semibold">
              {user.isVerified ? "Verified Member" : "Unverified"}
            </span>
          </div>

          {/* Name */}
          <h1 className={`mt-3 text-5xl font-bold leading-tight transition-colors duration-300 ${headingClass}`}>
            {user.name || "Your"}{" "}
            <span className="text-red-600">Profile</span>
          </h1>

          {/* User ID + Email */}
          <p className={`mt-3 text-lg transition-colors duration-300 ${subClass}`}>
            @{user.userId || "username"} &nbsp;·&nbsp;{" "}
            <span className={emailClass}>{user.email || "email@example.com"}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

