const nodeMailer = require('nodemailer');
require('dotenv').config();

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
    }
});  

const sendEmail = async (to, otp, options = {}) => {
    console.log("sendEmail called");
    const {
        title = "Email Verification",
        description = "verify your email address"
    } = options;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: `${title} - StreamMate`,
        text: `
        Hello,

        Your One-time Password (OTP) for ${title.toLowerCase()} is:

        ${otp}

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
    }
};

module.exports = sendEmail;