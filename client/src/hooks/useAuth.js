import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth.api';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const navigate = useNavigate();
  const { loginSuccess, logout: clearAuthState } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleError = (err) => {
    const message = err.response?.data?.message || 'Something went wrong. Please try again.';
    setError(message);
    return message;
  };

  const register = async ({ name, email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await authApi.register({ name, email, password });
      return { success: true, data };
    } catch (err) {
      handleError(err);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (email, otp) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await authApi.verifyOtp(email, otp);
      loginSuccess({ user: data.user, accessToken: data.accessToken });
      navigate('/dashboard');
      return { success: true };
    } catch (err) {
      handleError(err);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async (email, purpose = 'verify') => {
    setLoading(true);
    setError(null);
    try {
      await authApi.resendOtp(email, purpose);
      return { success: true };
    } catch (err) {
      handleError(err);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await authApi.login({ email, password });
      loginSuccess({ user: data.user, accessToken: data.accessToken });
      navigate('/dashboard');
      return { success: true };
    } catch (err) {
      handleError(err);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authApi.logout();
    } catch {
      // clear local state regardless, so the user isn't stuck logged-in-looking
    } finally {
      clearAuthState();
      setLoading(false);
      navigate('/login');
    }
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      await authApi.forgotPassword(email);
      return { success: true };
    } catch (err) {
      handleError(err);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const verifyResetOtp = async (email, otp) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await authApi.verifyResetOtp(email, otp);
      return { success: true, resetToken: data.resetToken };
    } catch (err) {
      handleError(err);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (resetToken, password) => {
    setLoading(true);
    setError(null);
    try {
      await authApi.resetPassword(resetToken, password);
      return { success: true };
    } catch (err) {
      handleError(err);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    setError,
    register,
    verifyOtp,
    resendOtp,
    login,
    logout,
    forgotPassword,
    verifyResetOtp,
    resetPassword,
  };
};
