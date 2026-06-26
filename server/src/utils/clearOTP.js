const clearOTP = (user) => {
    user.otp = undefined;
    user.otpExpiry = undefined;
};

module.exports = clearOTP;