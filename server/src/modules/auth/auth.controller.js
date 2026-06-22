import jwt from 'jsonwebtoken';
import { ENV } from '../../config/env.js';
import {
  registerUser, loginUser, findOrCreateGoogleUser,
  verifyOtp, resendOtp, forgotPassword, verifyResetOtp, resetPassword,
} from './auth.services.js';
import { blacklistToken, signAccessToken, isBlacklisted } from './auth.tokens.js';
import { User } from './auth.model.js';

const COOKIE_OPTS = {
  httpOnly: true,
  secure: ENV.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await registerUser(name, email, password);
    res.status(201).json({
      email: result.email,
      message: 'OTP sent to your email. Please verify to activate your account.',
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const verifyOtpHandler = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const { user, accessToken, refreshToken } = await verifyOtp(email, otp);
    res.cookie('refreshToken', refreshToken, COOKIE_OPTS);
    res.json({
      accessToken,
      user: { id: user.id, name: user.name, email: user.email },
      message: 'Email verified successfully!',
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const resendOtpHandler = async (req, res) => {
  try {
    const { email, purpose } = req.body;
    await resendOtp(email, purpose);
    res.json({ message: 'A new OTP has been sent to your email.' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await loginUser(email, password);
    res.cookie('refreshToken', refreshToken, COOKIE_OPTS);
    res.json({ accessToken, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const refresh = async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) return res.status(401).json({ message: 'No refresh token' });

  if (await isBlacklisted(token))
    return res.status(401).json({ message: 'Token revoked' });

  try {
    const payload = jwt.verify(token, ENV.JWT_REFRESH_SECRET);
    const accessToken = signAccessToken(payload.userId);
    res.json({ accessToken });
  } catch {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};

export const logout = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) await blacklistToken(token);
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
};

export const getMe = async (req, res) => {
  const user = await User.findById(req.userId).select('-password');
  res.json(user);
};

export const googleCallback = async (req, res) => {
  try {
    const { googleId, email, name, avatarUrl } = req.user;
    const { user, accessToken, refreshToken } = await findOrCreateGoogleUser({ googleId, email, name, avatarUrl });
    res.cookie('refreshToken', refreshToken, COOKIE_OPTS);
    res.redirect(`${ENV.CLIENT_URL}/auth/callback?token=${accessToken}`);
  } catch (err) {
    res.redirect(`${ENV.CLIENT_URL}/auth/callback?error=${encodeURIComponent(err.message)}`);
  }
};

export const forgotPasswordHandler = async (req, res) => {
  try {
    await forgotPassword(req.body.email);
    // Always return success so we don't reveal if email exists
    res.json({ message: 'If this email is registered with us, an OTP will be sent to your inbox.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verifyResetOtpHandler = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const { resetToken } = await verifyResetOtp(email, otp);
    res.json({ resetToken, message: 'OTP verified. You can now set a new password.' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const resetPasswordHandler = async (req, res) => {
  try {
    await resetPassword(req.body.resetToken, req.body.password);
    res.json({ message: 'Password reset successful. You can now log in.' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
