import JoinRoomHero from "./JoinRoomHero";
import JoinRoomForm from "./JoinRoomForm";
import JoinRoomTipsCard from "./JoinRoomTipsCard";
import JoinRoomHelpCard from "./JoinRoomHelpCard";
import useThemeInfo from "../../hooks/useThemeInfo";

export default function JoinRoomBody() {
  const { theme } = useThemeInfo();
  const isDark = theme === "dark";

  const bgClass = isDark
    ? "bg-gradient-to-br from-[#0B0B0B] via-[#111827] to-[#0F172A]"
    : "bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200";

  return (
    <main
      className={`min-h-screen ${bgClass} px-6 py-8 transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero */}
        <JoinRoomHero />

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3 items-start">
          {/* Left */}
          <div className="lg:col-span-2">
            <JoinRoomForm />
          </div>

          {/* Right */}
          <div className="space-y-8">
            <JoinRoomTipsCard />
            <JoinRoomHelpCard />
          </div>
        </div>
      </div>
    </main>
  );
}