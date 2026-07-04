import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayerModule from "react-player/lazy";
const ReactPlayer = ReactPlayerModule.default || ReactPlayerModule;
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaSync, FaYoutube } from "react-icons/fa";
import useThemeInfo from "../../hooks/useThemeInfo";
import { socket } from "../../socket";

export default function VideoPlayer({ isHost = true, videoURL, roomName }) {
  const { roomCode } = useParams();
  const { theme } = useThemeInfo();
  const isDark = theme === "dark";

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [syncNotice, setSyncNotice] = useState(false);

  useEffect(() => {
    const handleRemotePlay = () => {
      setIsPlaying(true);
      setSyncNotice(true);
      setTimeout(() => setSyncNotice(false), 2000);
    };

    const handleRemotePause = () => {
      setIsPlaying(false);
      setSyncNotice(true);
      setTimeout(() => setSyncNotice(false), 2000);
    };

    socket.on("media-play", handleRemotePlay);
    socket.on("media-pause", handleRemotePause);

    return () => {
      socket.off("media-play", handleRemotePlay);
      socket.off("media-pause", handleRemotePause);
    };
  }, []);

  const togglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    setSyncNotice(true);
    setTimeout(() => setSyncNotice(false), 2000);

    const roomId = roomCode || "U13966";
    if (nextState) {
      socket.emit("host-play", { roomId, currentTime: 0 });
    } else {
      socket.emit("host-pause", { roomId });
    }
  };

  const cardClass = isDark
    ? "bg-[#111111] border-gray-800 shadow-2xl"
    : "bg-white border-gray-200 shadow-xl";

  const defaultVideo = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  const activeUrl = videoURL || defaultVideo;

  return (
    <div className={`flex flex-col rounded-3xl border overflow-hidden transition-colors duration-300 ${cardClass}`}>
      {/* Video Screen */}
      <div className="relative aspect-video w-full bg-black flex items-center justify-center group overflow-hidden">
        <ReactPlayer
          url={activeUrl}
          playing={isPlaying}
          muted={isMuted}
          width="100%"
          height="100%"
          controls={true}
          onPlay={() => {
            if (!isPlaying) togglePlay();
          }}
          onPause={() => {
            if (isPlaying) togglePlay();
          }}
        />

        {/* Sync Alert Overlay */}
        {syncNotice && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 rounded-full bg-red-600/90 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-white shadow-lg animate-bounce pointer-events-none">
            <FaSync className="animate-spin" />
            <span>{isPlaying ? "Playback Resumed (Synced)" : "Playback Paused by Host"}</span>
          </div>
        )}

        {/* Source Tag */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-xl bg-black/60 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-white border border-white/10 pointer-events-none">
          <FaYoutube className="text-red-500 text-sm" />
          <span>Live Stream · 1080p</span>
        </div>
      </div>

      {/* Video Details Footer */}
      <div className={`p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t ${isDark ? "border-gray-800 bg-[#141414]" : "border-gray-200 bg-gray-50"}`}>
        <div>
          <h2 className="text-lg font-bold">{roomName || "Shared Movie Night"}</h2>
          <p className={`text-xs mt-0.5 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {isHost ? "You are the Host · Controlling synchronized playback" : "Viewer Mode · Synchronized with Host"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isHost && (
            <button
              onClick={togglePlay}
              className="rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-500 shadow-sm active:scale-95 cursor-pointer"
            >
              {isPlaying ? "Pause for All" : "Play for All"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
