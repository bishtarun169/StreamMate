const User = require("../models/User");
const Otp = require("../models/OTP");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

// Generate OTP function
const generateOTP = async (user) => {
    // Generate crytographically secure 6 digit otp
    const otp = crypto.randomInt(100000, 1000000).toString();
    // Expire otp in 10 minutes
    const otpExpiry = new Date( Date.now() + 10 * 60 * 1000 );
    const otpHashed = await bcrypt.hash(otp, 10);

    // store hashed otp, Expiry and No of attemtps
    await Otp.create({
      user: user._id,
      otpHash: otpHashed,
      expiredAt: otpExpiry,
      attempts: 0,
      used: false,
    });

    // Warning: This line is for temporary purpose, dont push in actual deployment
    // console.log(otp);

    return otp; // Return plain otp
};

module.exports = generateOTP;
