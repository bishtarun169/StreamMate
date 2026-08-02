import { FaGithub } from "react-icons/fa";
import useThemeInfo from "../../hooks/useThemeInfo";



export default function Footer({ forceDark = false }) {
  const { theme: reduxTheme } = useThemeInfo();
  const activeTheme = forceDark ? "dark" : (reduxTheme || "dark");
  const isLight = activeTheme === "light";

  const bgClass = isLight
    ? "bg-slate-100 text-gray-800 border-t border-gray-200 transition-colors duration-300"
    : "bg-[#111827] text-gray-100 border-t border-gray-800 transition-colors duration-300";

  const headingClass = isLight ? "text-gray-900" : "text-white";

  const textMutedClass = isLight ? "text-gray-600" : "text-gray-400";

  const linkClass = isLight
    ? "text-gray-600 hover:text-red-600"
    : "text-gray-400 hover:text-white";

  const logo = isLight ? "/logo2black.png" : "/logo2white.png";

  return (
    <footer className={`${bgClass} w-full mt-auto`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 py-14">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Logo + Project Name */}
          <div className="flex items-center gap-3">
            
            <img
              src={logo}
              alt="StreamMate Logo"
              className="w-16 h-16 object-contain"
            />

            <h2 className={`text-3xl font-bold ${headingClass}`}>
              <span className="text-red-600">Stream</span>Mate
            </h2>
          </div>

          {/* Description */}
          <p className={`max-w-2xl text-sm leading-7 ${textMutedClass}`}>
            StreamMate lets you watch videos together with friends in
            synchronized rooms, chat in real-time, and enjoy a seamless
            watch-party experience from anywhere.
          </p>

          {/* GitHub */}
          <a
            href="https://github.com/bishtarun169/StreamMate"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
            className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 hover:scale-105 ${
              isLight
                ? "bg-white border border-gray-300 shadow-sm hover:bg-gray-50"
                : "bg-[#1F2937] hover:bg-[#374151]"
            }`}
          >
            <FaGithub size={22} className={linkClass} />
          </a>

          {/* Divider */}
          <div
            className={`w-full max-w-xl ${
              isLight
                ? "border-t border-gray-200"
                : "border-t border-gray-700"
            }`}
          />

          {/* Copyright */}
          <p className={`text-sm ${textMutedClass}`}>
            © 2026 StreamMate • Built by students
          </p>
        </div>
      </div>
    </footer>
  );
}