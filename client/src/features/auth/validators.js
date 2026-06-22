// Mirrors server/src/modules/auth/auth.validation.js exactly,
// so the user never sees "looks fine here" then gets rejected by the API.

export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidName = (name) => {
  const trimmed = name.trim();
  if (trimmed.length < 2 || trimmed.length > 50) return false;
  return /^[a-zA-Z\s]+$/.test(trimmed);
};

// backend registerRules / resetPasswordRules:
// min 8 chars, 1 uppercase, 1 number, 1 special character
export const getPasswordStrengthError = (password) => {
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Add at least one uppercase letter';
  if (!/[0-9]/.test(password)) return 'Add at least one number';
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Add at least one special character';
  return null;
};
