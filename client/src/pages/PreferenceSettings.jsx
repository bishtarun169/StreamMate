import { IoClose } from "react-icons/io5";
import useThemeInfo from "../hooks/useThemeInfo";

export default function PreferenceSettings({
  onClose,
  showSaveSetting,
}) {
  const { theme, changeTheme } = useThemeInfo();

  const activeClass =
    "bg-red-600 text-white rounded-lg py-2 font-medium transition-all duration-300";

  const inactiveClass =
    "bg-[#374151] text-gray-300 hover:bg-red-600 hover:text-white rounded-lg py-2 font-medium transition-all duration-300";

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="w-105 rounded-3xl bg-[#1F2937] border border-gray-700 shadow-2xl p-7"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Preference Settings
              </h2>

              <p className="text-gray-400 mt-1">
                Personalize your experience.
              </p>
            </div>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              <IoClose size={24} />
            </button>
          </div>

          {/* Theme */}
          <div className="mt-8">
            <h3 className="text-gray-300 font-medium mb-3">
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
            <h3 className="text-gray-300 font-medium mb-3">
              Allow Join Requests
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button className="bg-[#374151] text-gray-300 hover:bg-red-600 hover:text-white rounded-lg py-2 font-medium transition-all duration-300">
                Everyone
              </button>

              <button className="bg-[#374151] text-gray-300 hover:bg-red-600 hover:text-white rounded-lg py-2 font-medium transition-all duration-300">
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
              className="px-5 py-2 rounded-lg bg-[#374151] text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-300"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </>
  );
}