import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthCard } from '../../../components/AuthCard';
import { Alert } from '../../../components/Alert';
import { api } from '../../../api/axios';
import { useAuthStore } from '../../../store/authStore';

// Backend's googleCallback redirects here as:
//   ${CLIENT_URL}/auth/callback?token=<accessToken>
// or
//   ${CLIENT_URL}/auth/callback?error=<message>
export const AuthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAccessToken, loginSuccess } = useAuthStore();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const token = searchParams.get('token');
    const oauthError = searchParams.get('error');

    if (oauthError) {
      navigate(`/login?error=${encodeURIComponent(oauthError)}`);
      return;
    }

    if (!token) {
      navigate('/login?error=Something went wrong signing in with Google');
      return;
    }

    setAccessToken(token);

    api.get('/auth/me')
      .then(({ data }) => {
        loginSuccess({ user: data, accessToken: token });
        navigate('/dashboard');
      })
      .catch(() => {
        navigate('/login?error=Could not complete sign in. Please try again.');
      });
  }, [searchParams]);

  return (
    <AuthCard eyebrow="One moment" title="Signing you in" subtitle="Plotting your starting point on the map">
      <Alert type="info">Connecting your account...</Alert>
    </AuthCard>
  );
};
