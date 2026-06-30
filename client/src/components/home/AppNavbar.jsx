import { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";

export default function DashboardHeader() {
  
  const profileImage ="https://ui-avatars.com/api/?name=User&background=dc2626&color=fff";

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          {/* Notifications */}
          <button className="relative flex items-center justify-center w-11 h-11 rounded-full bg-[#1F2937] hover:bg-[#374151] transition">
            <IoNotificationsOutline size={24} className="text-gray-300" />

          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={menuRef}>
            <img
              src={profileImage}
              alt="Profile"
              onClick={() => setShowMenu(!showMenu)}
              className="w-11 h-11 rounded-full object-cover border-2 border-red-600 hover:scale-105 transition duration-200 cursor-pointer"
            />

            {showMenu && (
              <div className="absolute right-0 mt-3 w-56 bg-[#1F2937] border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
                <Link
                  to="/profile"
                  onClick={() => setShowMenu(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#374151] hover:text-white transition"
                >
                  <FiUser size={18} />
                  Profile
                </Link>

                <Link
                  to="/AccountSetting"
                  onClick={() => setShowMenu(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#374151] hover:text-white transition"
                >
                  <FiSettings size={18} />
                  Settings
                </Link>

                <div className="border-t border-gray-700" />

                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-[#374151] transition">
                  <FiLogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
