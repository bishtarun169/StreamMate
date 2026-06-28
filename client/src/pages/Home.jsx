import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/home/DashboardHeader";

export default function Home() {
  return (
    <>
      <DashboardHeader />

      {/* Dashboard Content */}
      <div className="p-6">
        <h1 className="text-3xl text-white">
          Welcome to StreamMate Dashboard
        </h1>
      </div>

      {/* Child routes render here */}
      <Outlet />
    </>
  );
}