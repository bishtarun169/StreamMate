const bcrypt = require("bcryptjs");

const verifyOTP = async (Otp, otp) => {

     if (!Otp)
          throw new Error("OTP not found");

     if (Otp.used)
          throw new Error("otp has aleady been used");

     if (Otp.expiresAt < new Date())
          throw new Error("OTP has expired");

     if (Otp.attempts >= 5)
          throw new Error("Too many attempts");

     const isValid = await bcrypt.compare(otp, Otp.otpHash);

     if (!isValid){
       Otp.attempts += 1;
       await Otp.save();
       throw new Error("Invalid Otp");
     }

    return true;
};

module.exports = verifyOTP;
