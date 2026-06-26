import { FaPlay, FaUsers, FaComments, FaArrowRight } from "react-icons/fa";
import FeatureCard from "./FeatureCard";
import Badge from '../../ui/Badge'
import Button from '../../ui/Button'
import TrustItem from '../../ui/TrustItem'
import HeroPreview from "./HeroPreview";

export default function Hero() {
  const targetPath = localStorage.getItem("token") ? "/home" : "/register";
  return (
    <section className="min-h-screen bg-[#242626] text-white flex items-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column*/}
        <div className="lg:col-span-6 flex flex-col gap-12">

            <Badge>
                🎬
                <span className="text-2xl">Watch Together Platform</span>
            </Badge>

            <div>
                <div className="flex flex-col gap-6">
                  <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
                    Watch Movies
                    <br />
                    <span className="text-red-500">Together.</span>
                  </h1>

                  <p className="max-w-xl text-lg leading-8 text-zinc-400 lg:text-xl">
                    Create watch rooms in seconds, sync video playback perfectly for everyone,
                    and talk or chat in real-time with friends.
                  </p>
                </div>
            </div>

            <div className="flex gap-4">
                <Button to={targetPath}> Get Started <FaArrowRight /> </Button>
                <Button variant="secondary"> Watch Demo </Button>
            </div>

            <div className="flex flex-wrap gap-4">
                <TrustItem>Real-time Sync</TrustItem>
                <TrustItem>Live Chat</TrustItem>
                <TrustItem>Private Rooms</TrustItem>
            </div>

        </div>

          {/* Column Right*/}
          <HeroPreview />

        </div>

        {/* Features as Cards*/}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-6 mt-24 border-t border-zinc-800/80 pt-16">
          <FeatureCard
            icon={FaPlay}
            title="Instant Sync"
            description="Video state is shared in real-time. Pause, play, or skip, and everyone's screens follow instantly."
          />

          <FeatureCard
              icon={FaComments}
              title="Live Conversation"
              description="Interactive chat panels keep conversations lively. Share thoughts, reactions, and emojis in real-time."
          />

          <FeatureCard
            icon={FaUsers}
            title="Multiplayer Rooms"
            description="Create secure, private spaces with custom passwords or public rooms for community streaming events.."
          />
        </div>
      </div>
    </section>
  );
}
