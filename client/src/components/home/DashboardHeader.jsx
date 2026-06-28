import { Link, NavLink } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";

export default function DashboardHeader({
  user = {},
  unreadNotifications = 0,
}) {
  const profileImage =
    user.profilePicture ||
    "https://ui-avatars.com/api/?name=User&background=dc2626&color=fff";

  return (
    <header className="sticky top-0 z-50 bg-[#111827] border-b border-gray-800">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-3xl font-bold">
          <span className="text-red-600">Stream</span>
          <span className="text-white">Mate</span>
        </h1>

        {/* Navigation */}
        <nav className="flex items-center rounded-xl bg-[#1F2937] p-1">
          <NavLink
            to="/home"
            end
            className={({ isActive }) =>
              `px-5 py-2 rounded-lg font-medium transition ${
                isActive
                  ? "bg-red-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-[#374151]"
              }`
            }
          >
            Dashboard
          </NavLink>

          <Link
            to="/profile"
            className="px-5 py-2 rounded-lg font-medium text-gray-300 transition hover:text-white hover:bg-[#374151]"
          >
            Profile
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          {/* Notifications */}
          <button className="relative flex items-center justify-center w-11 h-11 rounded-full bg-[#1F2937] hover:bg-[#374151] transition">
            <IoNotificationsOutline size={24} className="text-gray-300" />

            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-red-600 text-white text-[10px] font-semibold flex items-center justify-center px-1">
                {unreadNotifications > 9 ? "9+" : unreadNotifications}
              </span>
            )}
          </button>

          {/* User Profile */}
          <Link to="profile">
            <img
              src={profileImage}
              alt="Profile"
              className="w-11 h-11 rounded-full object-cover border-2 border-red-600 hover:scale-105 transition duration-200"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
