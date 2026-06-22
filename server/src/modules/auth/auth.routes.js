import { Router } from 'express';
import passport from 'passport';
import {
  register, login, refresh, logout, getMe,
  googleCallback, verifyOtpHandler, resendOtpHandler,
  forgotPasswordHandler, verifyResetOtpHandler, resetPasswordHandler,
} from './auth.controller.js';
import { authGuard } from '../../middleware/auth.guard.js';
import { authLimiter, forgotPasswordLimiter } from '../../middleware/rateLimiter.js';
import {
  validate, sanitize,
  registerRules, loginRules,
  verifyOtpRules, resendOtpRules,
  forgotPasswordRules, verifyResetOtpRules, resetPasswordRules,
} from './auth.validation.js';

const router = Router();

// Apply sanitization to all routes
router.use(sanitize);

router.post('/register',          authLimiter, registerRules,       validate, register);
router.post('/verify-otp',        authLimiter, verifyOtpRules,      validate, verifyOtpHandler);
router.post('/resend-otp',        authLimiter, resendOtpRules,      validate, resendOtpHandler);
router.post('/login',             authLimiter, loginRules,           validate, login);
router.post('/refresh',           refresh);
router.post('/logout',            authGuard,   logout);
router.get ('/me',                authGuard,   getMe);
router.post('/forgot-password',   forgotPasswordLimiter, forgotPasswordRules,  validate, forgotPasswordHandler);
router.post('/verify-reset-otp',  forgotPasswordLimiter, verifyResetOtpRules,  validate, verifyResetOtpHandler);
router.post('/reset-password',    resetPasswordRules,    validate, resetPasswordHandler);

// Google OAuth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  googleCallback
);

export default router;