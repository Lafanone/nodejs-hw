import nodemailer from 'nodemailer';
import createHttpError from 'http-errors';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (options) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      ...options,
    });
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (err) {
    console.error('Email send error:', err);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};
