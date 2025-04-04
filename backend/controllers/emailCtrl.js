const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {
  try {
    // Debugging logs to check if environment variables are loaded correctly
    console.log("MAIL_ID:", process.env.MAIL_ID);
    console.log("MAIL_PASS:", process.env.MAIL_PASS ? "Loaded" : "Missing");

    
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.MAIL_ID, // Ensure this is correctly set in .env
        pass: process.env.MAIL_PASS, // Ensure this is correctly set in .env
      },
    });

    // Send mail
    const info = await transporter.sendMail({
      from: '"HEY👻" <abc@gmail.com>', // Sender address
      to: data.to, // List of receivers
      subject: data.subject, // Subject line
      text: data.text, // Plain text body
      html: data.htm, // Corrected: 'data.html' instead of 'data.htm'
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email sending failed.");
  }
});

module.exports = sendEmail;
