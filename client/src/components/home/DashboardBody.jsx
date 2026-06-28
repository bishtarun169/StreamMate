import WelcomeCard from "./WelcomeCard";
import FriendsPanel from "./FriendsPanel";
import QuickActions from "./QuickActions";
import RecentRooms from "./RecentRooms";

export default function DashboardBody() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10">

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left */}
        <div className="lg:col-span-2 space-y-8">
          <WelcomeCard />
          <QuickActions />
          <RecentRooms />
        </div>

        {/* Right */}
        <FriendsPanel />

      </div>

    </main>
  );
}