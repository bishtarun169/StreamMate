import { useState, useEffect, useRef } from "react";
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

  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [syncNotice, setSyncNotice] = useState("");
  const isPlayingRef = useRef(isPlaying);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const showNotice = (msg) => {
    setSyncNotice(msg);
    setTimeout(() => setSyncNotice(""), 2500);
  };

  useEffect(() => {
    const roomId = roomCode || "U13966";

    const handleRemotePlay = ({ currentTime }) => {
      if (!isHost && currentTime !== undefined && playerRef.current) {
        const localTime = playerRef.current.getCurrentTime() || 0;
        if (Math.abs(localTime - currentTime) > 1.5) {
          playerRef.current.seekTo(currentTime, "seconds");
        }
      }
      setIsPlaying(true);
      showNotice("Playback Resumed (Synced)");
    };

    const handleRemotePause = () => {
      setIsPlaying(false);
      showNotice("Playback Paused by Host");
    };

    const handleRemoteSeek = ({ currentTime }) => {
      if (!isHost && currentTime !== undefined && playerRef.current) {
        playerRef.current.seekTo(currentTime, "seconds");
        showNotice("Timeline Jumped with Host");
      }
    };

    const handleRemoteHeartbeat = ({ currentTime, isPlaying: remotePlaying }) => {
      if (!isHost && playerRef.current && currentTime !== undefined) {
        const localTime = playerRef.current.getCurrentTime() || 0;
        if (Math.abs(localTime - currentTime) > 2) {
          playerRef.current.seekTo(currentTime, "seconds");
        }
        if (remotePlaying !== undefined && remotePlaying !== isPlayingRef.current) {
          setIsPlaying(remotePlaying);
        }
      }
    };

    const handleNeedHostSync = ({ requesterId }) => {
      if (isHost && playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime() || 0;
        socket.emit("host-sync-response", {
          requesterId,
          currentTime,
          isPlaying: isPlayingRef.current,
        });
      }
    };

    const handleReceiveHostSync = ({ currentTime, isPlaying: remotePlaying }) => {
      if (!isHost && playerRef.current && currentTime !== undefined) {
        playerRef.current.seekTo(currentTime, "seconds");
        if (remotePlaying !== undefined) setIsPlaying(remotePlaying);
        showNotice("Synchronized with Host Timeline");
      }
    };

    socket.on("media-play", handleRemotePlay);
    socket.on("media-pause", handleRemotePause);
    socket.on("media-seek", handleRemoteSeek);
    socket.on("media-heartbeat", handleRemoteHeartbeat);
    socket.on("need-host-sync", handleNeedHostSync);
    socket.on("receive-host-sync", handleReceiveHostSync);

    if (!isHost) {
      socket.emit("request-host-sync", { roomId });
    }

    return () => {
      socket.off("media-play", handleRemotePlay);
      socket.off("media-pause", handleRemotePause);
      socket.off("media-seek", handleRemoteSeek);
      socket.off("media-heartbeat", handleRemoteHeartbeat);
      socket.off("need-host-sync", handleNeedHostSync);
      socket.off("receive-host-sync", handleReceiveHostSync);
    };
  }, [roomCode, isHost]);

  const togglePlay = (forceState) => {
    const nextState = typeof forceState === "boolean" ? forceState : !isPlaying;
    setIsPlaying(nextState);
    showNotice(nextState ? "Playback Resumed" : "Playback Paused");

    if (isHost) {
      const roomId = roomCode || "U13966";
      const currentTime = playerRef.current?.getCurrentTime() || 0;
      if (nextState) {
        socket.emit("host-play", { roomId, currentTime });
      } else {
        socket.emit("host-pause", { roomId });
      }
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
          ref={playerRef}
          url={activeUrl}
          playing={isPlaying}
          muted={isMuted}
          width="100%"
          height="100%"
          controls={true}
          onPlay={() => {
            if (!isPlaying) togglePlay(true);
          }}
          onPause={() => {
            if (isPlaying) togglePlay(false);
          }}
          onSeek={(seconds) => {
            if (isHost) {
              const roomId = roomCode || "U13966";
              socket.emit("host-seek", { roomId, currentTime: seconds });
              showNotice("Timeline Jumped");
            }
          }}
          onProgress={({ playedSeconds }) => {
            if (isHost && isPlayingRef.current) {
              const roomId = roomCode || "U13966";
              socket.emit("host-heartbeat", { roomId, currentTime: playedSeconds, isPlaying: true });
            }
          }}
        />

        {/* Sync Alert Overlay */}
        {syncNotice && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 rounded-full bg-red-600/90 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-white shadow-lg animate-bounce pointer-events-none">
            <FaSync className="animate-spin" />
            <span>{syncNotice}</span>
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
              onClick={() => togglePlay()}
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
