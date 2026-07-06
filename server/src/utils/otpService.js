const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../utils/sendEmail");
const User = require('../models/User');

const sendOTP = async (user, options) => {
     console.log("sendotp");
    const otp = await generateOTP(user);
    await sendEmail(user.email, otp, options);
    return otp;
};

module.exports = { sendOTP };