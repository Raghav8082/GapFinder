import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api } from '../api/axios';
import { useAuthStore } from '../store/authStore';

export const ProtectedRoute = ({ children }) => {
  const { accessToken, setAccessToken, loginSuccess, isAuthLoading, setAuthLoading } = useAuthStore();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // already have a token in memory (e.g. just logged in this session)
    if (accessToken) {
      setAuthLoading(false);
      setChecked(true);
      return;
    }

    // try silent refresh using the httpOnly refreshToken cookie,
    // so a page reload doesn't force a re-login for 30 days
    api.post('/auth/refresh')
      .then(async ({ data }) => {
        setAccessToken(data.accessToken);
        const { data: user } = await api.get('/auth/me');
        loginSuccess({ user, accessToken: data.accessToken });
      })
      .catch(() => {
        setAuthLoading(false);
      })
      .finally(() => setChecked(true));
  }, []);

  if (!checked || isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper-50">
        <div className="h-8 w-8 animate-spin rounded-full border-3 border-terra-100 border-t-terra-500" />
      </div>
    );
  }

  if (!useAuthStore.getState().accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
