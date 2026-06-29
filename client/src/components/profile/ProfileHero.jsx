import { FaUserCircle } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

export default function ProfileHero({ user = {} }) {
  const profileImage =
    user.profilePic ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=dc2626&color=fff&size=200`;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-red-900/20 bg-gradient-to-r from-[#1b1113] via-[#151515] to-[#101010] px-8 py-8">
      {/* Background Text */}
      <h2 className="absolute right-6 top-1/2 -translate-y-1/2 text-[120px] font-extrabold text-red-900/5 select-none pointer-events-none">
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
          <div className="inline-flex items-center gap-2 rounded-full bg-red-950/70 px-4 py-1 border border-red-800">
            <MdVerified className="text-red-500 text-xs" />
            <span className="text-red-400 text-sm font-semibold">
              {user.isVerified ? "Verified Member" : "Unverified"}
            </span>
          </div>

          {/* Name */}
          <h1 className="mt-3 text-5xl font-bold text-white leading-tight">
            {user.name || "Your"}{" "}
            <span className="text-red-600">Profile</span>
          </h1>

          {/* User ID + Email */}
          <p className="mt-3 text-gray-400 text-lg">
            @{user.userId || "username"} &nbsp;·&nbsp;{" "}
            <span className="text-gray-500">{user.email || "email@example.com"}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
