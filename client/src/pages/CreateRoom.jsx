import DashboardHeader from "../components/home/AppNavbar";
import CreateRoomBody from "../components/createRoom/CreateRoomBody";
import Footer from "../components/landing/Footer";
import useThemeInfo from "../hooks/useThemeInfo";

export default function CreateRoom() {
  const { theme } = useThemeInfo();
  const isDark = theme === "dark";

  return (
    <div className={`flex min-h-screen flex-col transition-colors duration-300 ${isDark ? "bg-[#0B0B0B] text-white" : "bg-slate-50 text-gray-900"}`}>
      <DashboardHeader />
      <div className="flex-1">
        <CreateRoomBody />
      </div>
      <Footer />
    </div>
  );
}

