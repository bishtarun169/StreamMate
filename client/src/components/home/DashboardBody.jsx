import WelcomeBanner from "./DashBoardBody/WelcomeBanner";
import CreateRoomCard from "./DashBoardBody/CreateRoomCard";
import JoinRoomCard from "./DashBoardBody/JoinRoomCard";
import FriendsPanel from "./DashBoardBody/FriendsPanel";
import RecentRooms from "./DashBoardBody/RecentRooms";

export default function DashboardBody() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0B0B0B] via-[#111827] to-[#0F172A] px-6 py-8">
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
