const User = require('../models/User');
const Room = require('../models/Room');
const bcrypt = require('bcryptjs');

// Create a new room
const createRoom = async (req, res) => {
     try {
          const { roomName, videoURL, privacy, password } = req.body;
          const hostId = req.user.userId;
          // Valid Room name
          if (!roomName) {
               return res.status(400).json({ message: 'Room name are required' });
          }   

          // Valid video URL
          if (!videoURL) {
               return res.status(400).json({ message: 'Video URL is required' });
          }

          // Generate unique room code
          const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

          // Hash password if room is private
          let hashedPassword = null;
          if (privacy === 'private' && !password) {
               return res.status(400).json({ message: 'Password is required for private rooms' });
          }
          if (privacy === 'private' && password) {
               const salt = await bcrypt.genSalt(10);
               hashedPassword = await bcrypt.hash(password, salt);
          }

          // Create new room
          const room = new Room({
               roomName,
               videoURL,
               privacy,
               password: hashedPassword,
               host: hostId,
               roomCode,
               participants: [hostId],
          });

          await room.save();
          res.status(201).json({ message: 'Room created successfully', roomCode });
     } catch (error) {
          console.error(error.message);
          res.status(500).json({ message: 'Server error' });
     }
};

// Join a room
const joinRoom = async (req, res) => {
     try {
          const { roomCode, password } = req.body;
          const userId = req.user.userId;

          // Find room by code
          const room = await Room.findOne({ roomCode });
          if (!room) {
               return res.status(404).json({ message: 'Room not found' });
          }

          // Check if user is already a participant
          if (room.participants.includes(userId)) {
               return res.status(400).json({ message: 'You are already in this room' });
          }

          // If room is private, check password
          if (room.privacy === 'private') {
               if (!password) {
                    return res.status(400).json({ message: 'Password is required to join this room' });
               }
               const isMatch = await bcrypt.compare(password, room.password);
               if (!isMatch) {
                    return res.status(400).json({ message: 'Incorrect password' });
               }
          }

          // Add user to participants
          room.participants.push(userId);
          await room.save();

          res.status(200).json({ 
               message: 'Joined room successfully',
               roomCode: room.roomCode,
               roomName: room.roomName,
               videoURL: room.videoURL,
               host: room.host,
          });

     } catch (error) {
          console.error(error.message);
          res.status(500).json({ message: 'Server error' });
     }
};

module.exports = {createRoom, joinRoom};
