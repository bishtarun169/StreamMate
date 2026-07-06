import CreateRoomHero from "./CreateRoomHero";
import CreateRoomForm from "./CreateRoomForm";
import RoomTipsCard from "./RoomTipsCard";
import useThemeInfo from "../../hooks/useThemeInfo";

export default function CreateRoomBody() {
  const { theme } = useThemeInfo();
  const isDark = theme === "dark";

  const bgClass = isDark
    ? "bg-gradient-to-br from-[#0B0B0B] via-[#111827] to-[#0F172A]"
    : "bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200";

  return (
    <main className={`min-h-screen ${bgClass} px-6 py-8 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Hero Banner */}
        <CreateRoomHero />

        {/* Main Grid: Form (2 Cols) + Tips Aside (1 Col) */}
        <div className="grid gap-8 lg:grid-cols-3 items-start">
          <div className="lg:col-span-2">
            <CreateRoomForm />
          </div>
          <div className="lg:col-span-1">
            <RoomTipsCard />
          </div>
        </div>
      </div>
    </main>
  );
}

