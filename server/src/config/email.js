import { Resend } from 'resend';
import { ENV } from './env.js';

const resend = new Resend(ENV.RESEND_API_KEY);

export const sendVerificationEmail = async (email, token) => {
  const link = `${ENV.SERVER_URL}/api/auth/verify-email?token=${token}`;
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Verify your GapFinder email',
    html: `
      <h2>Welcome to GapFinder!</h2>
      <p>Click the link below to verify your email address:</p>
      <a href="${link}">${link}</a>
      <p>This link expires in 24 hours.</p>
    `,
  });
};

export const sendPasswordResetEmail = async (email, token) => {
  const link = `${ENV.CLIENT_URL}/auth/reset-password?token=${token}`;
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Reset your GapFinder password',
    html: `
      <h2>Password Reset</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${link}">${link}</a>
      <p>This link expires in 1 hour.</p>
      <p>If you didn't request this, ignore this email.</p>
    `,
  });
};