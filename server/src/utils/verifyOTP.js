const verifyOTP = (user, otp) => {
     if (!user) 
          throw new Error("user not found");

     if (!user.otp)
          throw new Error("OTP not found");

     if (user.otp !== otp)
          throw new Error("Invalid OTP");

     if (!user.otpExpiry || user.otpExpiry < new Date())
          throw new Error("OTP has expired");

};

module.exports = verifyOTP;