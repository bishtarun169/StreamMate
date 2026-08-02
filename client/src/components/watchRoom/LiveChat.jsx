import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { FaPaperPlane, FaComments } from "react-icons/fa";
import useThemeInfo from "../../hooks/useThemeInfo";
import { socket } from "../../socket";
import { fetchChatMessages, sendMessage } from "../../services/roomService";

export default function LiveChat({ currentUser, isHost }) {
  const { roomCode } = useParams();
  const { theme } = useThemeInfo();
  const isDark = theme === "dark";

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    let isMounted = true;
    const roomId = roomCode || "U13966";

    // Fetch historical messages from backend if available
    if (roomCode) {
      fetchChatMessages(roomCode)
        .then((res) => {
          if (!isMounted) return;
          if (Array.isArray(res)) {
            const formatted = res.map((m) => ({
              id: m._id || m.id || Math.random(),
              user: m.sender?.name || m.user || "Member",
              text: m.content || m.text,
              time: new Date(m.createdAt || Date.now()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              isHost: m.sender?._id === currentUser?._id ? Boolean(isHost) : false,
              senderId: m.sender?._id || m.senderId
            }));
            setMessages(formatted);
          }
        })
        .catch(() => {
          // Room chat history empty or offline
        });
    }

    const handleReceiveMessage = ({ message }) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === message.id)) return prev;
        return [...prev, message];
      });
    };

    socket.on("receive-chat-message", handleReceiveMessage);

    return () => {
      isMounted = false;
      socket.off("receive-chat-message", handleReceiveMessage);
    };
  }, [roomCode, currentUser, isHost]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const senderName = currentUser?.name || "Member";
    const newMsg = {
      id: Date.now(),
      user: senderName,
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isHost: Boolean(isHost),
      senderId: currentUser?._id
    };

    setMessages((prev) => [...prev, newMsg]);

    const roomId = roomCode || "U13966";
    // Broadcast to room via socket
    socket.emit("send-chat-message", {
      roomId,
      message: newMsg,
    });

    // Save message to backend database
    if (roomCode && currentUser?._id) {
      sendMessage(roomCode, input.trim()).catch(() => null);
    }

    setInput("");
  };

  const bgClass = isDark
    ? "bg-[#111111] border-gray-800 text-white"
    : "bg-white border-gray-200 text-gray-900";

  const msgBoxDark = isDark
    ? "bg-[#181818] border-gray-800 text-gray-300"
    : "bg-gray-50 border-gray-200 text-gray-700";

  const inputBg = isDark
    ? "bg-[#181818] border-gray-700 text-white placeholder-gray-500 focus:border-red-600"
    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-red-600 focus:bg-white";

  return (
    <div className={`flex flex-col h-[470px] rounded-3xl border transition-colors duration-300 ${bgClass}`}>
      {/* Header */}
      <div className={`p-4 border-b flex items-center justify-between ${isDark ? "border-gray-800" : "border-gray-200"}`}>
        <div className="flex items-center gap-2">
          <FaComments className="text-red-500" />
          <h3 className="font-bold text-sm">Live Room Chat</h3>
        </div>
        <span className="text-[11px] font-semibold text-red-500 bg-red-500/10 px-2.5 py-0.5 rounded-full border border-red-500/20">
          Real-Time
        </span>
      </div>

      {/* Message List */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 text-gray-500">
            <FaComments className="text-3xl mb-2 opacity-40 text-red-500" />
            <p className="text-xs font-semibold">No messages yet</p>
            <p className="text-[11px] opacity-70 mt-0.5">Start the conversation with your party!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === currentUser?._id || msg.user === currentUser?.name;
            return (
              <div key={msg.id} className={`p-3 rounded-2xl border text-xs transition ${msgBoxDark} ${isMe ? "border-red-500/30 bg-red-500/5" : ""}`}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`font-bold ${isMe ? "text-red-500" : isDark ? "text-white" : "text-gray-900"}`}>
                      {msg.user} {isMe ? "(You)" : ""}
                    </span>
                    {msg.isHost && (
                      <span className="rounded bg-red-600/20 border border-red-600/40 px-1.5 py-0.2 text-[9px] font-bold text-red-500">
                        HOST
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-500">{msg.time}</span>
                </div>
                <p className="leading-relaxed break-words">{msg.text}</p>
              </div>
            );
          })
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className={`p-3 border-t flex items-center gap-2 ${isDark ? "border-gray-800" : "border-gray-200"}`}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message to the party..."
          className={`flex-1 rounded-xl border px-3.5 py-2.5 text-xs outline-none transition ${inputBg}`}
        />
        <button
          type="submit"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white transition hover:bg-red-500 active:scale-95 shadow-sm flex-shrink-0 cursor-pointer"
          title="Send Message"
        >
          <FaPaperPlane className="text-xs" />
        </button>
      </form>
    </div>
  );
}
