'use server';

import nodemailer from 'nodemailer';

export const sendEmail = async (
  email: string,
  subject: string,
  body: string
) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });
  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: subject,
    text: body,
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
};
