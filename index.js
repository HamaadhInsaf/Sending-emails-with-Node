require("dotenv").config();
const nodemailer = require("nodemailer");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question) => new Promise((resolve) => rl.question(question, resolve));

(async () => {
  try {
    const to = await ask("Recipient email: ");
    const subject = await ask("Subject: ");
    const text = await ask("Message body: ");

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  }
  catch (error) {
        console.error("Error sending email:", error.message);
  } finally {
        rl.close();
  }
})();