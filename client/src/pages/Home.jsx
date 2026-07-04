import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/home/AppNavbar";
import Footer from "../components/landing/Footer";
import useThemeInfo from "../hooks/useThemeInfo";

export default function Home() {
  const { theme } = useThemeInfo();
  const isDark = theme === "dark";

  const bgClass = isDark
    ? "bg-gradient-to-br from-[#0B0B0B] via-[#111827] to-[#0F172A] text-white"
    : "bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 text-gray-900";

  return (
    <div className={`flex min-h-screen flex-col pt-16 transition-colors duration-300 ${bgClass}`}>
      <DashboardHeader />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
