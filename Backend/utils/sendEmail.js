import nodemailer from "nodemailer";

const sendEmail = async (email, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.PASSWORD,
    },
  });
  const mailOption = {
    from: { name: "Book Store", address: process.env.EMAIL_ADDRESS },
    to: email,
    subject: subject,
    html: message,
  };
  await transporter.sendMail(mailOption, (error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent : " + success.response);
    }
  });
};

export default sendEmail;
