import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/home/AppNavbar";
import Footer from "../components/landing/Footer";
import DashboardBody from "../components/home/DashboardBody";
import CreateRoomBody from "../components/createRoom/CreateRoomBody";
import JoinRoom from "./JoinRoom";


export default function Home() {
  return (
    <>
      <DashboardHeader />
      <Outlet></Outlet>
      <Footer />
    </>
  );
}
