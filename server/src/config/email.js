import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { ENV } from './env.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: ENV.GMAIL_USER,
    pass: ENV.GMAIL_APP_PASSWORD,
  },
});

// Verify connection on startup
transporter.verify()
  .then(() => console.log('Nodemailer ready'))
  .catch((err) => console.error('Nodemailer config error:', err.message));

/**
 * Generate a cryptographically random 6-digit OTP.
 */
export const generateOtp = () => {
  // crypto.randomInt is available in Node 14.10+ and gives uniform distribution
  return String(crypto.randomInt(0, 1000000)).padStart(6, '0');
};

/**
 * Send an OTP email for either email verification or password reset.
 */
export const sendOtpEmail = async (email, otp, purpose = 'verify') => {
  const isVerify = purpose === 'verify';

  const subject = isVerify
    ? 'Verify your GapFinder account'
    : 'Reset your GapFinder password';

  const heading = isVerify
    ? 'Welcome to GapFinder!'
    : 'Password Reset Request';

  const instruction = isVerify
    ? 'Use the code below to verify your email address and activate your account.'
    : 'Use the code below to reset your password.';

  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; background: #fafafa; border-radius: 16px;">
      <h2 style="margin: 0 0 8px; color: #0d9488; font-size: 22px;">${heading}</h2>
      <p style="margin: 0 0 24px; color: #555; font-size: 14px; line-height: 1.5;">${instruction}</p>
      <div style="background: #fff; border: 2px solid #e0e0e0; border-radius: 12px; text-align: center; padding: 20px; margin-bottom: 24px;">
        <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #0f172a;">${otp}</span>
      </div>
      <p style="margin: 0; color: #888; font-size: 12px;">This code expires in 10 minutes. If you didn't request this, ignore this email.</p>
    </div>
  `;

  const info = await transporter.sendMail({
    from: `"GapFinder" <${ENV.GMAIL_USER}>`,
    to: email,
    subject,
    html,
  });

  console.log(`OTP email sent to ${email} (${purpose}): ${info.messageId}`);
};