import { api } from './axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const authApi = {
  register: (payload) => api.post('/auth/register', payload),
  verifyOtp: (email, otp) => api.post('/auth/verify-otp', { email, otp }),
  resendOtp: (email, purpose = 'verify') => api.post('/auth/resend-otp', { email, purpose }),
  login: (payload) => api.post('/auth/login', payload),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  refresh: () => api.post('/auth/refresh'),

  // password reset — three-step OTP flow
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  verifyResetOtp: (email, otp) => api.post('/auth/verify-reset-otp', { email, otp }),
  resetPassword: (resetToken, password) =>
    api.post('/auth/reset-password', { resetToken, password }),

  // google oauth — full page redirect, backend handles via Passport + redirects
  // to ${CLIENT_URL}/auth/callback?token=... on success
  googleAuthUrl: `${API_BASE_URL}/auth/google`,
};
