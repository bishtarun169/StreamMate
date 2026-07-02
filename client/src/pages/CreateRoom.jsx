import DashboardHeader from "../components/home/AppNavbar";
import CreateRoomBody from "../components/createRoom/CreateRoomBody";
import Footer from "../components/landing/Footer";

export default function CreateRoom() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0B0B0B] text-white">
      <DashboardHeader />
      <div className="flex-1">
        <CreateRoomBody />
      </div>
      <Footer />
    </div>
  );
}
