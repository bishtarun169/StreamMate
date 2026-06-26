const User = require("../models/User");
// Generate OTP function
const generateOTP = async (user) => {
    const otp = Math.floor(
        100000 + Math.random() * 900000
    ).toString();

    const otpExpiry = new Date(
        Date.now() + 10 * 60 * 1000
    );

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    return otp;
};

module.exports = generateOTP;