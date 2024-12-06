import passport from 'passport';
import { Router } from 'express';
import {
  Strategy as GoogleStrategy,
  Profile as GoogleProfile,
  VerifyCallback,
} from 'passport-google-oauth20';
import { authUserHandler } from '@routes/handlers';

const apiUrl = process.env.API_URL;

// Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${apiUrl}/auth/google/callback`,
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: GoogleProfile,
      done: VerifyCallback
    ) => {
      return done(null, profile);
    }
  )
);

const googleAuthRoute = Router();

// Routes for Google login
googleAuthRoute.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback route for Google
googleAuthRoute.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  authUserHandler
);

export default googleAuthRoute;
