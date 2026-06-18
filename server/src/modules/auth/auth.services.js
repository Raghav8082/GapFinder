import crypto from 'crypto';
import { User } from './auth.model.js';
import { signAccessToken, signRefreshToken } from './auth.tokens.js';
import { sendVerificationEmail, sendPasswordResetEmail } from '../../config/email.js';

export const registerUser = async (name, email, password) => {
  const exists = await User.findOne({ email });
  if (exists) throw new Error('Email already registered');

  const verifyToken = crypto.randomBytes(32).toString('hex');
  const verifyTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  const user = await User.create({ name, email, password, verifyToken, verifyTokenExpiry });

  await sendVerificationEmail(email, verifyToken);

  return {
    user,
    accessToken: signAccessToken(user.id),
    refreshToken: signRefreshToken(user.id),
  };
};

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

export const verifyEmail = async (token) => {
  const user = await User.findOne({
    verifyToken: token,
    verifyTokenExpiry: { $gt: new Date() },
  });

  if (!user) throw new Error('Invalid or expired verification link');

  user.isVerified = true;
  user.verifyToken = undefined;
  user.verifyTokenExpiry = undefined;
  await user.save();
};

export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  // Don't reveal if email exists or not
  if (!user) return;

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetToken = resetToken;
  user.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  await user.save();

  await sendPasswordResetEmail(email, resetToken);
};

export const resetPassword = async (token, newPassword) => {
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: new Date() },
  });

  if (!user) throw new Error('Invalid or expired reset link');

  user.password = newPassword;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();
};