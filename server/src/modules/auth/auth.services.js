import jwt from 'jsonwebtoken';
import { User } from './auth.model.js';
import { signAccessToken, signRefreshToken } from './auth.tokens.js';
import { generateOtp, sendOtpEmail } from '../../config/email.js';
import { ENV } from '../../config/env.js';

const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes

// ── Registration ────────────────────────────────────────────────

export const registerUser = async (name, email, password) => {
  const exists = await User.findOne({ email });
  if (exists && exists.isVerified) throw new Error('Email already registered');

  // If a previous unverified account exists, overwrite it
  if (exists && !exists.isVerified) {
    exists.name = name;
    exists.password = password;
    exists.otp = generateOtp();
    exists.otpExpiry = new Date(Date.now() + OTP_EXPIRY_MS);
    exists.otpPurpose = 'verify';
    await exists.save();
    await sendOtpEmail(email, exists.otp, 'verify');
    return { email };
  }

  const otp = generateOtp();
  const user = await User.create({
    name,
    email,
    password,
    otp,
    otpExpiry: new Date(Date.now() + OTP_EXPIRY_MS),
    otpPurpose: 'verify',
  });

  await sendOtpEmail(email, otp, 'verify');
  return { email };
};

// ── Verify Registration OTP ─────────────────────────────────────

export const verifyOtp = async (email, otp) => {
  const user = await User.findOne({
    email,
    otp,
    otpPurpose: 'verify',
    otpExpiry: { $gt: new Date() },
  });

  if (!user) throw new Error('Invalid or expired OTP');

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;
  user.otpPurpose = undefined;
  await user.save();

  return {
    user,
    accessToken: signAccessToken(user.id),
    refreshToken: signRefreshToken(user.id),
  };
};

// ── Resend OTP ──────────────────────────────────────────────────

export const resendOtp = async (email, purpose = 'verify') => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('No account found with this email');

  if (purpose === 'verify' && user.isVerified)
    throw new Error('Email is already verified');

  const otp = generateOtp();
  user.otp = otp;
  user.otpExpiry = new Date(Date.now() + OTP_EXPIRY_MS);
  user.otpPurpose = purpose;
  await user.save();

  await sendOtpEmail(email, otp, purpose);
};

// ── Login ───────────────────────────────────────────────────────

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !user.password) throw new Error('Invalid credentials');

  const valid = await user.comparePassword(password);
  if (!valid) throw new Error('Invalid credentials');

  if (!user.isVerified) throw new Error('Please verify your email before logging in');

  return {
    user,
    accessToken: signAccessToken(user.id),
    refreshToken: signRefreshToken(user.id),
  };
};

// ── Google OAuth ────────────────────────────────────────────────

export const findOrCreateGoogleUser = async ({ googleId, email, name, avatarUrl }) => {
  let user = await User.findOne({ googleId });

  if (!user) {
    user = await User.findOne({ email });
    if (user) {
      user.googleId = googleId;
      user.avatarUrl = avatarUrl;
      user.isVerified = true; // Google already verified the email
      await user.save();
    } else {
      user = await User.create({ googleId, email, name, avatarUrl, isVerified: true });
    }
  }

  return {
    user,
    accessToken: signAccessToken(user.id),
    refreshToken: signRefreshToken(user.id),
  };
};

// ── Forgot Password ────────────────────────────────────────────

export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  // Don't reveal if email exists or not
  if (!user) return;

  const otp = generateOtp();
  user.otp = otp;
  user.otpExpiry = new Date(Date.now() + OTP_EXPIRY_MS);
  user.otpPurpose = 'reset';
  await user.save();

  await sendOtpEmail(email, otp, 'reset');
};

// ── Verify Reset OTP → returns a short-lived resetToken ─────────

export const verifyResetOtp = async (email, otp) => {
  const user = await User.findOne({
    email,
    otp,
    otpPurpose: 'reset',
    otpExpiry: { $gt: new Date() },
  });

  if (!user) throw new Error('Invalid or expired OTP');

  // Clear OTP so it can't be reused
  user.otp = undefined;
  user.otpExpiry = undefined;
  user.otpPurpose = undefined;
  await user.save();

  // Issue a short-lived JWT that authorises the password change
  const resetToken = jwt.sign(
    { userId: user.id, purpose: 'reset' },
    ENV.JWT_SECRET,
    { expiresIn: '10m' },
  );

  return { resetToken };
};

// ── Reset Password ─────────────────────────────────────────────

export const resetPassword = async (resetToken, newPassword) => {
  let payload;
  try {
    payload = jwt.verify(resetToken, ENV.JWT_SECRET);
  } catch {
    throw new Error('Invalid or expired reset token');
  }

  if (payload.purpose !== 'reset') throw new Error('Invalid reset token');

  const user = await User.findById(payload.userId);
  if (!user) throw new Error('User not found');

  user.password = newPassword;
  await user.save();
};