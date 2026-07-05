import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WatchRoomHeader from "./WatchRoomHeader";
import VideoPlayer from "./VideoPlayer";
import LiveChat from "./LiveChat";
import ParticipantsList from "./ParticipantsList";
import { FaComments, FaUsers, FaSpinner } from "react-icons/fa";
import useThemeInfo from "../../hooks/useThemeInfo";
import { socket } from "../../socket";
import { fetchRoom, fetchCurrentUserProfile } from "../../services/roomService";

export default function WatchRoomBody() {
  const { roomCode } = useParams();
  const { theme } = useThemeInfo();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState("chat"); // "chat" | "users"
  
  const [roomData, setRoomData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const roomId = roomCode || "U13966";

    async function loadRoomAndConnect() {
      try {
        setLoading(true);
        const [roomRes, userRes] = await Promise.all([
          fetchRoom(roomId).catch(() => null),
          fetchCurrentUserProfile().catch(() => null),
        ]);

        if (!isMounted) return;

        if (roomRes) {
          setRoomData(roomRes);
        }
        if (userRes) {
          setCurrentUser(userRes);
        }

        // Build participants list from real backend data
        const initialParticipants = [];
        const hostObj = roomRes?.host;
        
        if (hostObj) {
          initialParticipants.push({
            id: hostObj._id || "host_1",
            name: (hostObj.name || "Host") + " (Host)",
            role: "Host",
            status: "Synced",
            avatar: hostObj.profilePic || `https://ui-avatars.com/api/?name=${hostObj.name || 'Host'}&background=dc2626&color=fff`,
            userId: hostObj.userId || hostObj._id
          });
        }

        (roomRes?.participants || []).forEach((p) => {
          const u = p.user || p;
          if (!u || u._id === hostObj?._id) return;
          initialParticipants.push({
            id: u._id || Math.random(),
            name: u.name || "Member",
            role: p.role === "host" ? "Host" : "Viewer",
            status: "Synced",
            avatar: u.profilePic || `https://ui-avatars.com/api/?name=${u.name || 'Member'}&background=2563eb&color=fff`,
            userId: u.userId || u._id
          });
        });

        if (initialParticipants.length === 0) {
          initialParticipants.push({
            id: "you",
            name: (userRes?.name || "You") + " (Host)",
            role: "Host",
            status: "Synced",
            avatar: userRes?.profilePic || `https://ui-avatars.com/api/?name=${userRes?.name || 'You'}&background=dc2626&color=fff`,
          });
        }

        setParticipants(initialParticipants);
        setLoading(false);

        // Connect Socket with real ID and role
        const socketUserId = userRes?._id || "guest_" + Math.floor(Math.random() * 10000);
        const isUserHost = Boolean(userRes?._id && hostObj?._id && String(userRes._id) === String(hostObj._id));
        const role = isUserHost ? "host" : "member";
        const myName = userRes?.name || (isUserHost ? (hostObj?.name || "Host") : "Guest (" + socketUserId.toString().slice(-4) + ")");
        const myAvatar = userRes?.profilePic || (isUserHost ? hostObj?.profilePic : `https://ui-avatars.com/api/?name=${encodeURIComponent(myName)}&background=2563eb&color=fff`);

        const handleConnect = () => {
          console.log("🟢 Frontend connected to Socket Server with ID:", socket.id);
          socket.emit("join-room", { 
            roomId, 
            userId: socketUserId, 
            role,
            name: myName,
            avatar: myAvatar
          });
        };

        if (socket.connected) {
          handleConnect();
        } else {
          socket.on("connect", handleConnect);
          socket.connect();
        }

      } catch (err) {
        console.error("Error loading room:", err);
        if (isMounted) setLoading(false);
      }
    }

    loadRoomAndConnect();

    // Listen for authoritative synchronized participant list from server
    const handleRoomParticipantsUpdate = ({ count, participants: liveList }) => {
      console.log("👥 Live room participants synced:", count, liveList);
      if (Array.isArray(liveList) && liveList.length > 0) {
        setParticipants(liveList);
      }
    };

    const handleParticipantJoined = ({ user, role }) => {
      if (!user) return;
      setParticipants((prev) => {
        if (prev.some((p) => p.id === user._id || p.userId === (user.userId || user._id))) return prev;
        const newP = {
          id: user._id || user.userId || Math.random(),
          name: user.name + (role === "host" ? " (Host)" : ""),
          role: role === "host" ? "Host" : "Viewer",
          status: "Synced",
          avatar: user.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=2563eb&color=fff`,
          userId: user.userId || user._id
        };
        return [...prev, newP];
      });
    };

    const handleParticipantLeft = ({ userId }) => {
      setParticipants((prev) => prev.filter((p) => p.id !== userId && p.userId !== userId));
    };

    socket.on("room-participants-update", handleRoomParticipantsUpdate);
    socket.on("participant-joined", handleParticipantJoined);
    socket.on("participant-left", handleParticipantLeft);

    return () => {
      isMounted = false;
      socket.off("connect");
      socket.off("room-participants-update", handleRoomParticipantsUpdate);
      socket.off("participant-joined", handleParticipantJoined);
      socket.off("participant-left", handleParticipantLeft);
      socket.emit("room:leave", { roomId: roomCode || "U13966" });
      socket.disconnect();
    };
  }, [roomCode]);

  const bgClass = isDark
    ? "bg-gradient-to-br from-[#0B0B0B] via-[#111827] to-[#0F172A]"
    : "bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200";

  const tabBtn = (tabName) => `
    flex items-center justify-center gap-2 flex-1 py-2.5 rounded-2xl text-xs font-bold transition duration-200 cursor-pointer
    ${activeTab === tabName
      ? "bg-red-600 text-white shadow-lg shadow-red-500/20"
      : isDark ? "text-gray-400 hover:text-white bg-[#151515]" : "text-gray-600 hover:text-black bg-gray-100"
    }
  `;

  const isHost = Boolean(currentUser?._id && roomData?.host?._id && String(currentUser._id) === String(roomData.host._id));

  if (loading) {
    return (
      <main className={`min-h-screen ${bgClass} flex flex-col items-center justify-center gap-4 text-gray-400`}>
        <FaSpinner className="animate-spin text-red-600 text-4xl" />
        <p className="text-sm font-bold animate-pulse">Synchronizing Room & Media Streams...</p>
      </main>
    );
  }

  return (
    <main className={`min-h-screen ${bgClass} px-6 py-8 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Bar / Room Info */}
        <WatchRoomHeader
          roomName={roomData?.roomName || "Shared Stream Room"}
          onlineCount={participants.length}
        />

        {/* Main Grid: Player + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Left 2 Cols: Video Player */}
          <div className="lg:col-span-2 flex flex-col min-h-0">
            <VideoPlayer
              isHost={isHost}
              videoURL={roomData?.videoURL}
              roomName={roomData?.roomName}
            />
          </div>

          {/* Right 1 Col: Chat / Participants Tabs */}
          <div className="lg:col-span-1 flex flex-col gap-4 h-full min-h-0">
            {/* Tab Switcher */}
            <div className={`flex gap-2 p-1.5 rounded-3xl border ${isDark ? "bg-[#111111] border-gray-800" : "bg-white border-gray-200 shadow-sm"}`}>
              <button onClick={() => setActiveTab("chat")} className={tabBtn("chat")}>
                <FaComments className="text-sm" />
                <span>Live Chat</span>
              </button>
              <button onClick={() => setActiveTab("users")} className={tabBtn("users")}>
                <FaUsers className="text-sm" />
                <span>Participants ({participants.length})</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="transition-all duration-300 flex-1 flex flex-col min-h-0">
              {activeTab === "chat" ? <LiveChat currentUser={currentUser} isHost={isHost} /> : <ParticipantsList participants={participants} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
