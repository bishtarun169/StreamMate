const nodeMailer = require('nodemailer');
require('dotenv').config();

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
    }
});  

const sendOTPEmail = async (to, otp, purpose) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[DEVELOPMENT FALLBACK] OTP code for ${to} is: ${otp}`);
        }
        return;
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Your OTP for StreamMate',
        text: `
        Hello,
        Your One-time Password (OTP) for ${purpose-tolowerCase()} is : ${otp}
        This OTP is valid fro 10 minutes.
        If You did not request this, please ignore this email.

        Regards,
        StreamMate Team
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP email sent to ${to}`);
    } catch (error) {
        console.error(`Error sending OTP email to ${to}:`, error.message);
        if (process.env.NODE_ENV === 'development') {
            console.log(`[DEVELOPMENT FALLBACK] OTP code for ${to} is: ${otp}`);
        }

    }
};

module.exports = sendOTPEmail;