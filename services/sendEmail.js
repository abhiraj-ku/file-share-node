import nodemailer from "nodemailer";
export const sendEmail = async (from, to, subject, html) => {
  let transporter = nodemailer.transporter({
    host,
    port,
    auth: {
      user,
      pass,
    },
  });
  const info = await transporter.sendMail({
    from: `Shareit <${from}>`,
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: html, // html bod
  });
};
