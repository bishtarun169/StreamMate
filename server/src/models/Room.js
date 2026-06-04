// Room schema

const roomSchema = new mongoose.Schema({
     roomName: {
          type: String,
          required: true,
     },
     videoURL: {
          type: String,
          required: true,
     },
     privacy: {
          type: String,
          enum: ['public', 'private'],
          default: 'public',
     },
     password: {
          type: String,
     },
     host: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
     },
     roomCode: {
          type: String,
          required: true,
          unique: true,
     },
     participants: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
     }],
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;