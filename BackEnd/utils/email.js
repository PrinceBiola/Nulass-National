const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const sendEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: `"NULLAS NATIONAL"<${process.env.MAIL_FROM_ADDRESS}>`,
            to,
            subject,
            text,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error("Error sending email:", error.message);
        throw new Error("Failed to send email");
    }
};

const sendVerificationEmail = async (to, verificationCode) => {
    const subject = "Verify Your Email Address";
    const text = `Please verify your email address by entering the following code: ${verificationCode}`;
    await sendEmail(to, subject, text);
};

const sendPasswordResetEmail = async (to, resetToken) => {
    const subject = "Reset Your Password";
    const text = `Please reset your password by clicking the following link: ${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    await sendEmail(to, subject, text);
};

const sendWelcomeEmail = async (to, name) => {
    const subject = "Welcome to NULLAS NATIONAL";
    const text = `Welcome to NULLAS NATIONAL, ${name}! We're excited to have you on board.`;
    await sendEmail(to, subject, text);
};




module.exports = { sendEmail, sendVerificationEmail, sendPasswordResetEmail, sendWelcomeEmail }; 