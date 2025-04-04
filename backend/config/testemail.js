const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendTestEmail() {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MAIL_PASS,
        },
    });

    let info = await transporter.sendMail({
        from: `"Test 👋" <${process.env.MAIL_ID}>`,
        to: "arwaahmed2553@gmail.com", // Change to your actual email
        subject: "Test Email",
        text: "Hello, this is a test email from Node.js!",
    });

    console.log("Message sent: %s", info.messageId);
}

sendTestEmail().catch(console.error);
