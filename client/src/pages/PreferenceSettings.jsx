import { useState } from "react";
import { IoClose } from "react-icons/io5";
import useThemeInfo from "../hooks/useThemeInfo";

export default function PreferenceSettings({
  onClose,
  showSaveSetting,
}) {
  const { theme, changeTheme } = useThemeInfo();
  const isDark = theme === "dark";
  const [joinPolicy, setJoinPolicy] = useState("everyone");

  const modalBg = isDark
    ? "bg-[#1F2937] border-gray-700 text-white"
    : "bg-white border-gray-200 text-gray-900";

  const titleClass = isDark ? "text-white" : "text-gray-900";
  const subClass = isDark ? "text-gray-400" : "text-gray-600";
  const sectionTitle = isDark ? "text-gray-300" : "text-gray-700";
  const closeBtn = isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black";

  const activeClass =
    "bg-red-600 text-white rounded-xl py-2.5 font-medium transition-all duration-300 shadow-md";

  const inactiveClass = isDark
    ? "bg-[#374151] text-gray-300 hover:bg-red-600 hover:text-white rounded-xl py-2.5 font-medium transition-all duration-300"
    : "bg-gray-100 text-gray-700 hover:bg-red-600 hover:text-white rounded-xl py-2.5 font-medium transition-all duration-300";

  const saveBtnClass = isDark
    ? "bg-[#374151] text-gray-300 hover:bg-red-600 hover:text-white"
    : "bg-gray-100 text-gray-800 hover:bg-red-600 hover:text-white shadow-sm";

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className={`w-full max-w-md rounded-3xl border shadow-2xl p-7 transition-all duration-300 ${modalBg}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className={`text-2xl font-bold transition-colors duration-300 ${titleClass}`}>
                Preference Settings
              </h2>

              <p className={`text-sm mt-1 transition-colors duration-300 ${subClass}`}>
                Personalize your experience.
              </p>
            </div>

            <button
              onClick={onClose}
              className={`p-1 transition ${closeBtn}`}
            >
              <IoClose size={24} />
            </button>
          </div>

          {/* Theme */}
          <div className="mt-8">
            <h3 className={`font-medium mb-3 transition-colors duration-300 ${sectionTitle}`}>
              Theme
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => changeTheme("dark")}
                className={
                  theme === "dark" ? activeClass : inactiveClass
                }
              >
                🌙 Dark
              </button>

              <button
                onClick={() => changeTheme("light")}
                className={
                  theme === "light" ? activeClass : inactiveClass
                }
              >
                ☀️ Light
              </button>
            </div>
          </div>

          {/* Join Requests */}
          <div className="mt-8">
            <h3 className={`font-medium mb-3 transition-colors duration-300 ${sectionTitle}`}>
              Allow Join Requests
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setJoinPolicy("everyone")}
                className={joinPolicy === "everyone" ? activeClass : inactiveClass}
              >
                Everyone
              </button>

              <button
                onClick={() => setJoinPolicy("friends")}
                className={joinPolicy === "friends" ? activeClass : inactiveClass}
              >
                Friends Only
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 mt-10">
            <button
              onClick={() => {
                showSaveSetting?.();
                onClose();
              }}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 active:scale-95 ${saveBtnClass}`}
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </>
  );
}