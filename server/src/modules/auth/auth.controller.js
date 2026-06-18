import jwt from 'jsonwebtoken';
import { ENV } from '../../config/env.js';
import { registerUser, loginUser, findOrCreateGoogleUser, verifyEmail, forgotPassword, resetPassword } from './auth.services.js';
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
    const { user, accessToken, refreshToken } = await registerUser(name, email, password);
    res.cookie('refreshToken', refreshToken, COOKIE_OPTS);
    res.status(201).json({
      accessToken,
      user: { id: user.id, name: user.name, email: user.email },
      message: 'Account created. Please check your email to verify your account.',
    });
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
    const { googleId, email, name, avatarUrl } = req.googleUser;
    const { user, accessToken, refreshToken } = await findOrCreateGoogleUser({ googleId, email, name, avatarUrl });
    res.cookie('refreshToken', refreshToken, COOKIE_OPTS);
    res.redirect(`${ENV.CLIENT_URL}/auth/callback?token=${accessToken}`);
  } catch (err) {
    res.redirect(`${ENV.CLIENT_URL}/auth/callback?error=${err.message}`);
  }
};

export const verifyEmailHandler = async (req, res) => {
  try {
    await verifyEmail(req.query.token);
    // Redirect to frontend login page with success message
    res.redirect(`${ENV.CLIENT_URL}/auth/login?verified=true`);
  } catch (err) {
    res.redirect(`${ENV.CLIENT_URL}/auth/login?error=${err.message}`);
  }
};

export const forgotPasswordHandler = async (req, res) => {
  try {
    await forgotPassword(req.body.email);
    // Always return success so we don't reveal if email exists
    res.json({ message: 'If that email exists, a reset link has been sent.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const resetPasswordHandler = async (req, res) => {
  try {
    await resetPassword(req.body.token, req.body.password);
    res.json({ message: 'Password reset successful. You can now log in.' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
