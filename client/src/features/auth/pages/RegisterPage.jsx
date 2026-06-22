import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthCard } from '../../../components/AuthCard';
import { TextInput } from '../../../components/TextInput';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';
import { Alert } from '../../../components/Alert';
import { OtpInput } from '../../../components/OtpInput';
import { useAuth } from '../../../hooks/useAuth';
import { isValidEmail, isValidName, getPasswordStrengthError } from '../validators';
import { GoogleButton } from '../components/GoogleButton';

const EMPTY_FORM = { name: '', email: '', password: '', confirmPassword: '' };

export const RegisterPage = () => {
  const { register, verifyOtp, resendOtp, loading, error, setError } = useAuth();
  const [step, setStep] = useState('form'); // 'form' | 'otp'
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [form, setForm] = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [otpError, setOtpError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    if (!isValidName(form.name)) errs.name = 'Use 2-50 letters only, no numbers or symbols';
    if (!isValidEmail(form.email)) errs.email = 'Enter a valid email address';
    const pwError = getPasswordStrengthError(form.password);
    if (pwError) errs.password = pwError;
    if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords don't match";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!validate()) return;

    const result = await register(form);
    if (result.success) {
      setSubmittedEmail(form.email);
      setStep('otp');
    }
  };

  const handleOtpComplete = async (otp) => {
    setOtpError('');
    const result = await verifyOtp(submittedEmail, otp);
    if (!result.success) {
      setOtpError(error || 'Invalid or expired OTP. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    setOtpError('');
    setError(null);
    await resendOtp(submittedEmail, 'verify');
  };

  const tryDifferentEmail = () => {
    setForm(EMPTY_FORM);
    setFieldErrors({});
    setError(null);
    setOtpError('');
    setStep('form');
  };

  if (step === 'otp') {
    return (
      <AuthCard eyebrow="Step 2 of 2" title="Verify your email" subtitle="Enter the 6-digit code we sent to your inbox">
        <Alert type="info">
          We sent a code to <strong>{submittedEmail}</strong>
        </Alert>

        <div className="mt-6">
          <OtpInput
            onComplete={handleOtpComplete}
            onResend={handleResendOtp}
            error={otpError || error}
            disabled={loading}
          />
        </div>

        <p className="text-sm text-ink-400 text-center mt-6">
          Wrong email?{' '}
          <button
            type="button"
            onClick={tryDifferentEmail}
            className="text-terra-500 font-medium hover:underline"
          >
            Go back
          </button>
        </p>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      eyebrow="Begin your map"
      title="Find out what you don't know yet"
      subtitle="Create an account to start your first skill diagnostic"
    >
      <Alert type="error">{error}</Alert>

      <GoogleButton label="Sign up with Google" />

      <div className="flex items-center gap-3 my-5">
        <div className="h-px flex-1 bg-ink-900/10" />
        <span className="text-xs text-ink-400">or use your email</span>
        <div className="h-px flex-1 bg-ink-900/10" />
      </div>

      <form onSubmit={handleSubmit}>
        <TextInput
          label="Full name"
          name="name"
          placeholder="Aarav Sharma"
          value={form.name}
          onChange={handleChange}
          error={fieldErrors.name}
        />
        <TextInput
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          error={fieldErrors.email}
        />
        <PasswordInput
          label="Password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          error={fieldErrors.password}
        />
        <PasswordInput
          label="Confirm password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={fieldErrors.confirmPassword}
        />

        <Button type="submit" loading={loading} className="mt-2">
          Create account
        </Button>
      </form>

      <p className="text-sm text-ink-400 text-center mt-6">
        Already mapping your skills?{' '}
        <Link to="/login" className="text-terra-500 font-medium hover:underline">
          Log in
        </Link>
      </p>
    </AuthCard>
  );
};
