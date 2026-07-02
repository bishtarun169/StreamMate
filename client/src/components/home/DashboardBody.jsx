import WelcomeBanner from "./DashBoardBody/WelcomeBanner";
import CreateRoomCard from "./DashBoardBody/CreateRoomCard";
import JoinRoomCard from "./DashBoardBody/JoinRoomCard";
import FriendsPanel from "./DashBoardBody/FriendsPanel";
import RecentRooms from "./DashBoardBody/RecentRooms";
import useThemeInfo from "../../hooks/useThemeInfo";

export default function DashboardBody() {
  const { theme } = useThemeInfo();
  const isDark = theme === "dark";

  const bgClass = isDark
    ? "bg-gradient-to-br from-[#0B0B0B] via-[#111827] to-[#0F172A]"
    : "bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200";

  return (
    <main className={`min-h-screen ${bgClass} px-6 py-8 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <WelcomeBanner />

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Left Side */}
          <div className="space-y-8 lg:col-span-2">
            <div className="grid gap-6 md:grid-cols-2">
              <CreateRoomCard />
              <JoinRoomCard />
            </div>

            <RecentRooms />
          </div>

          {/* Right Side */}
          <FriendsPanel />
        </div>
      </div>
    </main>
  );
}

