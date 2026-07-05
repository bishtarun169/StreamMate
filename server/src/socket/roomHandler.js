const User = require("../models/User");
const Room = require("../models/Room");
const { roomConnections, cleanupTimeouts } = require("./socketState");

function broadcastRoomParticipants(io, roomId) {
     const usersMap = roomConnections.get(roomId);
     if (!usersMap || usersMap.size === 0) {
          io.in(roomId).emit("room-participants-update", { count: 0, participants: [] });
          return;
     }
     const participantsList = Array.from(usersMap.values()).map(u => ({
          id: u.userId,
          userId: u.userId,
          name: u.name,
          avatar: u.avatar,
          role: u.role && (u.role === "Host" || u.role.toLowerCase() === "host") ? "Host" : "Viewer",
          status: "Synced"
     }));
     io.in(roomId).emit("room-participants-update", {
          count: participantsList.length,
          participants: participantsList
     });
}

function roomHandler (io, socket) {
     socket.on("join-public-rooms", () => {
          socket.join("public-rooms");
          console.log(`Socket ${socket.id} joined public-rooms channel`);
     });

     socket.on("join-room", async ({ roomId, userId, role, name, avatar }) => {
          socket.join(roomId);
          socket.roomId = roomId;
          socket.userId = userId;
          if (roomId && userId) {
               // Clear any pending cleanup timeout for this user in this room
               const timeoutKey = `${roomId}_${userId}`;
               if (cleanupTimeouts.has(timeoutKey)) {
                    clearTimeout(cleanupTimeouts.get(timeoutKey));
                    cleanupTimeouts.delete(timeoutKey);
               }

               // Resolve user name and avatar if not explicitly provided
               let participantName = name;
               let participantAvatar = avatar;

               if (!participantName || !participantAvatar) {
                    try {
                         const isObjectId = /^[0-9a-fA-F]{24}$/.test(String(userId));
                         const userObj = await User.findOne({
                              $or: [
                                   { _id: isObjectId ? userId : null },
                                   { userId: userId }
                              ]
                         }).select("name email userId profilePic");

                         if (userObj) {
                              participantName = participantName || userObj.name;
                              participantAvatar = participantAvatar || userObj.profilePic;
                         }
                    } catch (err) {
                         console.error("Error fetching user profile for socket join:", err.message);
                    }
               }

               participantName = participantName || "User (" + String(userId).slice(-4) + ")";
               participantAvatar = participantAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(participantName)}&background=2563eb&color=fff`;

               console.log(`Socket ${socket.id} (user: ${userId}, role: ${role}, name: ${participantName}) joined room: ${roomId}`);

               if (!roomConnections.has(roomId)) {
                    roomConnections.set(roomId, new Map());
               }
               const usersMap = roomConnections.get(roomId);
               if (!usersMap.has(userId)) {
                    usersMap.set(userId, {
                         userId,
                         name: participantName,
                         avatar: participantAvatar,
                         role: role || "member",
                         sockets: new Set()
                    });
               }

               const existingUser = usersMap.get(userId);
               existingUser.name = participantName;
               existingUser.avatar = participantAvatar;
               existingUser.role = role || existingUser.role;
               existingUser.sockets.add(socket.id);

               // Broadcast synchronized full participant list to ALL users in the room
               broadcastRoomParticipants(io, roomId);

               // Legacy emit for backward compatibility
               socket.to(roomId).emit("participant-joined", {
                    user: { userId, _id: userId, name: participantName, profilePic: participantAvatar },
                    role: role || "member",
                    isMuted: false,
                    joinedAt: new Date()
               });
          }
     });

     const handleLeave = (roomId, userId, socketId) => {
          if (!roomId || !userId) return;
          const usersMap = roomConnections.get(roomId);
          if (!usersMap) return;
          const userEntry = usersMap.get(userId);
          if (!userEntry) return;

          userEntry.sockets.delete(socketId);

          if (userEntry.sockets.size === 0) {
               usersMap.delete(userId);
               io.in(roomId).emit("participant-left", { userId });
               io.in(roomId).emit("room:userLeft", { userId });
          }

          if (usersMap.size === 0) {
               roomConnections.delete(roomId);
          } else {
               broadcastRoomParticipants(io, roomId);
          }
     };

     // leave room explicitly
     socket.on("room:leave", ({ roomId, userId }) => {
          const rId = roomId || socket.roomId;
          const uId = userId || socket.userId;
          if (rId) socket.leave(rId);
          handleLeave(rId, uId, socket.id);
     });

     // handle unexpected disconnect (tab close, refresh, network drop)
     socket.on("disconnect", () => {
          if (socket.roomId && socket.userId) {
               handleLeave(socket.roomId, socket.userId, socket.id);
          }
     });
};

module.exports = roomHandler;