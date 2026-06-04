const express = require('express');

const router = express.Router();

const { createRoom, joinRoom } = require('../controllers/roomController');
const roomMiddle = require('../middleware/authMiddleware');

// @route   POST /api/rooms/create
// @desc    Create a new room
// @access  Private
router.post('/create', roomMiddle, createRoom);

// @route   GET /api/rooms
// @desc    Get all rooms for the current user
// @access  Private
router.post('/join', roomMiddle, joinRoom);

module.exports = router; 