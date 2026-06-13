import { User } from './auth.model.js';
import { signAccessToken, signRefreshToken } from './auth.tokens.js';

export const registerUser = async (name, email, password) => {
  const exists = await User.findOne({ email });
  if (exists) throw new Error('Email already registered');

  const user = await User.create({ name, email, password });
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

  return {
    user,
    accessToken: signAccessToken(user.id),
    refreshToken: signRefreshToken(user.id),
  };
};