import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AuthCard } from '../../../components/AuthCard';
import { TextInput } from '../../../components/TextInput';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';
import { Alert } from '../../../components/Alert';
import { useAuth } from '../../../hooks/useAuth';
import { GoogleButton } from '../components/GoogleButton';

export const LoginPage = () => {
  const { login, loading, error, setError } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [searchParams] = useSearchParams();

  const redirectError = searchParams.get('error');

  useEffect(() => {
    if (redirectError) setError(decodeURIComponent(redirectError));
  }, [redirectError]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    await login(form);
  };

  return (
    <AuthCard eyebrow="Welcome back" title="Pick up your path" subtitle="Log in to see where you left off">
      <Alert type="error">{error}</Alert>

      <GoogleButton label="Continue with Google" />

      <div className="flex items-center gap-3 my-5">
        <div className="h-px flex-1 bg-ink-900/10" />
        <span className="text-xs text-ink-400">or use your email</span>
        <div className="h-px flex-1 bg-ink-900/10" />
      </div>

      <form onSubmit={handleSubmit}>
        <TextInput
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
        />
        <PasswordInput
          label="Password"
          name="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
        />

        <div className="flex justify-end -mt-2 mb-5">
          <Link to="/forgot-password" className="text-xs text-terra-500 hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" loading={loading}>
          Log in
        </Button>
      </form>

      <p className="text-sm text-ink-400 text-center mt-6">
        New here?{' '}
        <Link to="/register" className="text-terra-500 font-medium hover:underline">
          Create an account
        </Link>
      </p>
    </AuthCard>
  );
};
