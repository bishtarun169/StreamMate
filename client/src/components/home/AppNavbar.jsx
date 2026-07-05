import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import PreferenceSettings from "../../pages/PreferenceSettings";
import useThemeInfo from "../../hooks/useThemeInfo";
import { fetchProfile } from "../../services/homeService";

export default function DashboardHeader() {
  const [profileImage, setProfileImage] = useState("https://ui-avatars.com/api/?name=User&background=dc2626&color=fff");

  const { theme } = useThemeInfo();
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    fetchProfile().then((res) => {
      const u = res.user || res;
      if (u) setProfileImage(u.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || "User")}&background=dc2626&color=fff`);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isDark = theme === "dark";

  const headerBg = isDark
    ? "bg-[#111827]/80 backdrop-blur-xl border-gray-800 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
    : "bg-white/80 backdrop-blur-xl border-gray-200 shadow-sm";

  const iconBtn = isDark
    ? "bg-[#1F2937] hover:bg-[#374151]"
    : "bg-gray-100 hover:bg-gray-200";

  const iconColor = isDark ? "text-gray-300" : "text-gray-700";

  const dropdownBg = isDark
    ? "bg-[#1F2937] border-gray-700"
    : "bg-white border-gray-200";

  const dropdownItem = isDark
    ? "text-gray-300 hover:bg-[#374151] hover:text-white"
    : "text-gray-700 hover:bg-gray-100 hover:text-black";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 border-b transition-all duration-300 ${headerBg}`}
      >
        <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/home"
            className="text-3xl font-bold hover:scale-105 transition-transform duration-200"
          >
            <span className="text-red-600">Stream</span>
            <span className={isDark ? "text-white" : "text-gray-900"}>
              Mate
            </span>
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-5">
            {/* Notifications */}
            <button
              className={`relative flex items-center justify-center w-11 h-11 rounded-full transition ${iconBtn}`}
            >
              <IoNotificationsOutline
                size={24}
                className={iconColor}
              />
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
                <div
                  className={`absolute right-0 mt-3 w-56 border rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${dropdownBg}`}
                >
                  {/* Profile */}
                  <Link
                    to="/home/profile"
                    onClick={() => setShowMenu(false)}
                    className={`flex items-center gap-3 px-4 py-3 transition ${dropdownItem}`}
                  >
                    <FiUser size={18} />
                    Profile
                  </Link>

                  {/* Settings */}
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      setShowSettings(true);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 transition ${dropdownItem}`}
                  >
                    <FiSettings size={18} />
                    Settings
                  </button>

                  <div
                    className={`border-t ${
                      isDark ? "border-gray-700" : "border-gray-200"
                    }`}
                  />

                  {/* Logout */}
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 text-red-500 transition ${
                      isDark
                        ? "hover:bg-[#374151]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <FiLogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {showSettings && (
        <PreferenceSettings
          onClose={() => setShowSettings(false)}
        />
      )}
    </>
  );
}