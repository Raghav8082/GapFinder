import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { ENV } from './env.js';

export const initPassport = () => {
  passport.use(new GoogleStrategy({
    clientID:     ENV.GOOGLE_CLIENT_ID,
    clientSecret: ENV.GOOGLE_CLIENT_SECRET,
    callbackURL:  `${ENV.SERVER_URL}/api/auth/google/callback`,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const googleUser = {
        googleId:  profile.id,
        email:     profile.emails[0].value,
        name:      profile.displayName,
        avatarUrl: profile.photos[0]?.value,
      };
      done(null, googleUser);
    } catch (err) {
      done(err, null);
    }
  }));
};