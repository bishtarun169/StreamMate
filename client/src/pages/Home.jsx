import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/home/DashboardHeader";
import Footer from "../components/landing/Footer";
import DashboardBody from "../components/home/DashboardBody";

export default function Home() {
  return (
    <>
      <DashboardHeader />
      <DashboardBody />
      <Footer />
    </>
  );
}
