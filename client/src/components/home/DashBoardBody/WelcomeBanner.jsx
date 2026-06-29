import { FaCrown } from "react-icons/fa";

export default function WelcomeBanner({ user = { firstName: "Nishant" } }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-red-900/20 bg-gradient-to-r from-[#1b1113] via-[#151515] to-[#101010] px-8 py-8">
      {/* Background Text */}
      <h1 className="absolute right-6 top-1/2 -translate-y-1/2 text-[120px] font-extrabold text-red-900/5 select-none pointer-events-none">
        STREAM
      </h1>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full bg-red-950/70 px-4 py-1 border border-red-800">
        <FaCrown className="text-red-500 text-xs" />

        <span className="text-red-400 text-sm font-semibold">
          Active Streamer
        </span>
      </div>

      {/* Heading */}
      <h2 className="mt-5 text-5xl font-bold text-white leading-tight">
        Welcome back, <span className="text-red-600">{user.firstName}</span>!
      </h2>

      {/* Subtitle */}
      <p className="mt-4 max-w-2xl text-gray-400 text-lg leading-8">
        Ready to watch some movies? Create a room and invite your friends, or
        join an active room using a room code.
      </p>
    </section>
  );
}
