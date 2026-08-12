const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema(
  {
    user: {
      type : mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    otpHash: {
      type: String,
      required: true,
    },

    expiredAt: {
      type: Date,
      requied: true,
    },

    attempts: {
      type: Number,
      default: 0,
      min: 0,
    },

    used: {
      type: Boolean,
      default: false,
    },

  }, {timestamps: true,});

otpSchema.index(
  {expiredAt: 1},
  {expiredAfterSeconfs: 0}
);

const OTP = mongoose.model("OTP", otpSchema);
module.exports = OTP;
