const User = require("../models/User");
const Room = require("../models/Room");

const { roomConnections, cleanupTimeouts } = require("./socketState");

function roomHandler (io, socket) {
     socket.on("join-public-rooms", () => {
          socket.join("public-rooms");
          console.log(`Socket ${socket.id} joined public-rooms channel`);
     });

     socket.on("join-room", async ({ roomId, userId, role }) => {
          socket.join(roomId);
          socket.roomId = roomId;
          socket.userId = userId;
          socket.role = role;
          console.log(`Socket ${socket.id} (user: ${userId}, role: ${role}) joined room: ${roomId}`);

          if (roomId && userId) {
               // Clear any pending cleanup timeout for this user in this room
               const timeoutKey = `${roomId}_${userId}`;
               if (cleanupTimeouts.has(timeoutKey)) {
                    clearTimeout(cleanupTimeouts.get(timeoutKey));
                    cleanupTimeouts.delete(timeoutKey);
                    console.log(`Cancelled pending cleanup for user ${userId} in room ${roomId}`);
               }

               // Add to connection tracking
               if (!roomConnections.has(roomId)) {
                    roomConnections.set(roomId, new Map());
               }
               const userSockets = roomConnections.get(roomId);
               if (!userSockets.has(userId)) {
                    userSockets.set(userId, new Set());
               }
               userSockets.get(userId).add(socket.id);
          }

          // Broadcast user joined info to the room
          try {
               if (userId) {
                    const isObjectId = /^[0-9a-fA-F]{24}$/.test(userId);
                    const userObj = await User.findOne({
                         $or: [
                              { _id: isObjectId ? userId : null },
                              { userId: userId }
                         ]
                    }).select("name email userId profilePic");

                    const participantData = userObj || {
                         name: "User (" + String(userId).slice(-4) + ")",
                         userId: userId,
                         profilePic: "https://ui-avatars.com/api/?name=User&background=dc2626&color=fff"
                    };

                    socket.to(roomId).emit("participant-joined", {
                         user: participantData,
                         role: role || "member",
                         isMuted: false,
                         joinedAt: new Date()
                    });
               }
          } catch (error) {
               console.error("Error in join-room socket broadcast:", error.message);
          }
     });

     // leave room
     socket.on("room:leave", async ({ roomId, userId }) => {
          if (!roomId || !userId) return;
          socket.leave(roomId);
          const users = roomConnections.get(roomId);
          if (!users) return;
          const sockets = users.get(userId);
          if (!sockets) return;

          sockets.delete(socket.id);

          if (sockets.size === 0) {
               users.delete(userId);
               socket.to(roomId).emit("room:userLeft", {
                    userId
               });
          }
          if (users.size === 0) {
               roomConnections.delete(roomId);
          }
     });

};

module.exports = roomHandler;