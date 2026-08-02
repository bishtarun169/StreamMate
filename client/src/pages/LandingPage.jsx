import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero/Hero";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col pt-16 bg-gradient-to-br from-[#0B0B0B] via-[#111827] to-[#0F172A] text-white">
      <Navbar />
      <div className="flex-1">
        <Hero />
      </div>
      <Footer forceDark />
    </div>
  );
}
