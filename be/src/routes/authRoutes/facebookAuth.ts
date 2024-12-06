import passport from 'passport';
import { Router } from 'express';
import {
  Strategy as FacebookStrategy,
  Profile as FacebookProfile,
} from 'passport-facebook';
import { authUserHandler } from '@routes/handlers';
import { VerifyCallback } from 'passport-oauth2';

const apiUrl = process.env.API_URL;

// Facebook OAuth strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID as string,
      clientSecret: process.env.FACEBOOK_APP_SECRET as string,
      callbackURL: `${apiUrl}/facebook/callback`,
      profileFields: ['id', 'emails', 'name'],
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: FacebookProfile,
      done: VerifyCallback
    ) => {
      return done(null, profile);
    }
  )
);

const facebookAuthRoute = Router();

// Routes for Facebook login
facebookAuthRoute.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

// Callback route for Facebook
facebookAuthRoute.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  authUserHandler
);

export default facebookAuthRoute;
