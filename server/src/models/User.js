const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  userId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    select: false
  },
  /* Improvement : Having a separate Profile schema is much better (Not account identity )*/
  profilePic: {
    type: String,
    default: null,
  },

  gender: {
    type: String,
    default: null,
  },

  bio: {
    type: String,
    default: null,
  },

  location: {
    type: String,
    default: null,
  },

  birthday: {
    type: Date,
    default: null,
  },

  settings: {
    theme: {
      type: String,
      default: "light",
    },

    allowJoinRequests: {
      type: String,
      default: "everyone",
    },
  },
  isVerified: {
    type: Boolean,
    default: false,
  },

  roomsCreated: {
    type: Number,
    default: 0,
  },
  roomsJoined: {
    type: Number,
    default: 0,
  },
  totalWatchMinutes: {
    type: Number,
    default: 0,
  },

  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  /*
    Warning: Unbounded array of notifications
    Better to use separate notification shchema
  */
  notifications: [{
    id: { type: String, required: true },
    sender: { type: String, required: true },
    text: { type: String, required: true },
    room: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
