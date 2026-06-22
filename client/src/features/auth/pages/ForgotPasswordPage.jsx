import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthCard } from '../../../components/AuthCard';
import { TextInput } from '../../../components/TextInput';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';
import { Alert } from '../../../components/Alert';
import { OtpInput } from '../../../components/OtpInput';
import { useAuth } from '../../../hooks/useAuth';
import { isValidEmail, getPasswordStrengthError } from '../validators';

export const ForgotPasswordPage = () => {
  const { forgotPassword, verifyResetOtp, resetPassword, resendOtp, loading, error, setError } = useAuth();
  const navigate = useNavigate();

  // Step: 'email' → 'otp' → 'newPassword' → 'done'
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({});

  // Step 1: Submit email
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!isValidEmail(email)) {
      setFieldError('Enter a valid email address');
      return;
    }
    setFieldError('');

    const result = await forgotPassword(email);
    if (result.success) setStep('otp');
  };

  // Step 2: Verify OTP
  const handleOtpComplete = async (otp) => {
    setOtpError('');
    setError(null);
    const result = await verifyResetOtp(email, otp);
    if (result.success) {
      setResetToken(result.resetToken);
      setStep('newPassword');
    } else {
      setOtpError(error || 'Invalid or expired OTP. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    setOtpError('');
    setError(null);
    await resendOtp(email, 'reset');
  };

  // Step 3: Set new password
  const validatePassword = () => {
    const errs = {};
    const pwError = getPasswordStrengthError(password);
    if (pwError) errs.password = pwError;
    if (password !== confirmPassword) errs.confirmPassword = "Passwords don't match";
    setPasswordErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!validatePassword()) return;

    const result = await resetPassword(resetToken, password);
    if (result.success) setStep('done');
  };

  // Step 4: Done
  if (step === 'done') {
    return (
      <AuthCard eyebrow="Reset access" title="Password updated" subtitle="You're all set">
        <Alert type="success">Your password has been reset. Log in with your new password.</Alert>
        <Button onClick={() => navigate('/login')} className="mt-4">
          Go to login
        </Button>
      </AuthCard>
    );
  }

  // Step 3: New password form
  if (step === 'newPassword') {
    return (
      <AuthCard eyebrow="Reset access" title="Choose a new password" subtitle="Make it something you'll remember this time">
        <Alert type="error">{error}</Alert>

        <form onSubmit={handlePasswordSubmit}>
          <PasswordInput
            label="New password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordErrors.password}
          />
          <PasswordInput
            label="Confirm new password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={passwordErrors.confirmPassword}
          />

          <Button type="submit" loading={loading} className="mt-2">
            Reset password
          </Button>
        </form>
      </AuthCard>
    );
  }

  // Step 2: OTP entry
  if (step === 'otp') {
    return (
      <AuthCard eyebrow="Reset access" title="Enter verification code" subtitle="Check your inbox for a 6-digit code">
        <Alert type="info">
          If <strong>{email}</strong> is registered with us, an OTP has been sent to your inbox.
        </Alert>

        <div className="mt-6">
          <OtpInput
            onComplete={handleOtpComplete}
            onResend={handleResendOtp}
            error={otpError || error}
            disabled={loading}
          />
        </div>

        <Link to="/login" className="block text-center text-sm text-terra-500 font-medium hover:underline mt-6">
          Back to login
        </Link>
      </AuthCard>
    );
  }

  // Step 1: Email form
  return (
    <AuthCard eyebrow="Reset access" title="Forgot your password?" subtitle="We'll send a verification code to your email">
      <Alert type="error">{error}</Alert>

      <form onSubmit={handleEmailSubmit}>
        <TextInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldError}
        />
        <Button type="submit" loading={loading}>
          Send verification code
        </Button>
      </form>

      <Link to="/login" className="block text-center text-sm text-terra-500 font-medium hover:underline mt-6">
        Back to login
      </Link>
    </AuthCard>
  );
};
