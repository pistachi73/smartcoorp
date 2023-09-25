'use server';

import nodemailer from 'nodemailer';

type SendEmailProps = {
  emailTo: string;
  subject: string;
  textBody?: string;
  htmlBody?: string;
};

type MailOptions = {
  from: string;
  to: string;
  subject: string;
  body?: string;
  html?: string;
};

const NODEMAILER_PW = 'jjnzpayuahdrxjtw';
const NODEMAILER_EMAIL = 'scsmartcoorp@gmail.com';

export const sendEmail = async ({
  emailTo,
  subject,
  textBody,
  htmlBody,
}: SendEmailProps) => {
  if (!textBody && !htmlBody) {
    throw new Error('You must provide either a text or html body');
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: NODEMAILER_EMAIL,
      pass: NODEMAILER_PW,
    },
    secure: true,
  });

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log('Server is ready to take our messages');
        resolve(success);
      }
    });
  });

  const mailOptions: MailOptions = {
    from: NODEMAILER_EMAIL as string,
    to: emailTo,
    subject: `email: ${process.env.NODEMAILER_EMAIL} - pass: ${process.env.NODEMAILER_PW}  - subject: ${subject}`,
  };

  if (htmlBody) {
    mailOptions['html'] = htmlBody;
  } else if (!htmlBody && textBody) {
    mailOptions['body'] = textBody;
  }

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
};
