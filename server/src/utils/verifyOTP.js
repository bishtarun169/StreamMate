const verifyOTP = (user, otp) => {
     if (!user) 
          return res.status(400).json({ message: 'User not found' });

     if (!user.otp)
          throw new Error("OTP not found");

     if (user.otp !== otp)
          throw new Error("Invalid OTP");

     if (!user.otpExpiry || user.otpExpiry < new Date())
          throw new Error("OTP has expired");

};

module.exports = verifyOTP;