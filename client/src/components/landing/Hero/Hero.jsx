import { FaPlay, FaUsers, FaComments, FaArrowRight } from "react-icons/fa";
import FeatureCard from "./FeatureCard";
import Badge from '../../ui/Badge';
import Button from '../../ui/Button';
import TrustItem from '../../ui/TrustItem';
import HeroPreview from "./HeroPreview";

export default function Hero() {
  const targetPath = localStorage.getItem("token") ? "/home" : "/register";

  return (
    <section className="w-full pt-28 pb-20 relative overflow-hidden transition-colors duration-300 text-white">
      {/* Ambient Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] pointer-events-none transition-colors duration-300 bg-red-600/10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] pointer-events-none transition-colors duration-300 bg-red-600/5"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main Hero Banner Card */}
        <div className="relative overflow-hidden rounded-3xl border p-8 sm:p-12 lg:p-14 transition-all duration-300 border-red-900/20 bg-gradient-to-r from-[#1b1113] via-[#151515] to-[#101010] shadow-[0_0_50px_rgba(220,38,38,0.05)]">
          {/* Background Text Watermark */}
          <h1 className="absolute right-6 bottom-4 text-[80px] sm:text-[140px] lg:text-[180px] font-extrabold select-none pointer-events-none transition-colors duration-300 text-red-900/5">
            STREAM
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center relative z-10">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div>
                <Badge forceDark>
                  🎬 <span className="text-sm font-semibold">Watch Together Platform</span>
                </Badge>
              </div>

              <div className="flex flex-col gap-5">
                <h1 className="max-w-3xl text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight transition-colors duration-300 text-white">
                  Watch Movies <br />
                  <span className="text-red-600">Together.</span>
                </h1>

                <p className="max-w-xl text-lg sm:text-xl leading-8 transition-colors duration-300 text-gray-400">
                  Create watch rooms in seconds, sync video playback perfectly for everyone, and chat in real-time with friends from anywhere.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button to={targetPath} forceDark>
                  Get Started <FaArrowRight className="text-sm" />
                </Button>
                <Button variant="secondary" forceDark> Watch Demo </Button>
              </div>

              <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-700/20">
                <TrustItem forceDark>Real-time Sync</TrustItem>
                <TrustItem forceDark>Live Chat</TrustItem>
                <TrustItem forceDark>Private Rooms</TrustItem>
              </div>
            </div>

            {/* Right Column */}
            <HeroPreview />
          </div>
        </div>

        {/* Features Section Heading */}
        <div className="text-center max-w-2xl mx-auto mt-24 mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold transition-colors duration-300 text-white">
            Everything you need for a <span className="text-red-600">perfect watch party</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg transition-colors duration-300 text-gray-400">
            Designed from the ground up for seamless real-time synchronization and interactive communication.
          </p>
        </div>

        {/* Features as Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t pt-12 transition-colors duration-300 border-gray-800/80">
          <FeatureCard
            icon={FaPlay}
            title="Instant Sync"
            description="Video state is shared in real-time. Pause, play, or seek, and everyone's screens follow instantly."
          />

          <FeatureCard
            icon={FaComments}
            title="Live Conversation"
            description="Interactive chat panels keep conversations lively. Share thoughts, reactions, and emojis in real-time."
          />

          <FeatureCard
            icon={FaUsers}
            title="Multiplayer Rooms"
            description="Create secure, private spaces with custom passwords or join public rooms for community streaming events."
          />
        </div>
      </div>
    </section>
  );
}
