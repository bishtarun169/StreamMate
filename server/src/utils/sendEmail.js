const nodeMailer = require('nodemailer');
require('dotenv').config();

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
    }
});  

const sendOTPEmail = async (to, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Your OTP for StreamMate',
        text: `Your OTP for StreamMate is: ${otp}. It is valid for 10 minutes.`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP email sent to ${to}`);
    } catch (error) {
        console.error(`Error sending OTP email to ${to}:`, error);
        throw new Error('Failed to send OTP email');
    }
};

module.exports = sendOTPEmail;