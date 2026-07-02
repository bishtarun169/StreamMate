import AppNavbar from "../components/home/AppNavbar";
import ProfileBody from "../components/profile/ProfileBody";
import Footer from "../components/landing/Footer";
import useThemeInfo from "../hooks/useThemeInfo";

export default function Profile() {
  const { theme } = useThemeInfo();
  const isDark = theme === "dark";

  return (
    <div className={`flex min-h-screen flex-col transition-colors duration-300 ${isDark ? "bg-[#0B0B0B] text-white" : "bg-slate-50 text-gray-900"}`}>
      <AppNavbar />
      <div className="flex-1">
        <ProfileBody />
      </div>
      <Footer />
    </div>
  );
}

