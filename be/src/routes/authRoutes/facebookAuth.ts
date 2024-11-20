import passport from 'passport';
import { Router } from 'express';
import {
  Strategy as FacebookStrategy,
  Profile as FacebookProfile,
} from 'passport-facebook';
import { authUserHandler } from '@routes/handlers';
import { VerifyCallback } from 'passport-oauth2';

// Facebook OAuth strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID as string,
      clientSecret: process.env.FACEBOOK_APP_SECRET as string,
      callbackURL: 'http://localhost:3001/facebook/callback',
      profileFields: ['id', 'emails', 'name'],
      passReqToCallback: true,
    },
    (
      req,
      accessToken: string,
      refreshToken: string,
      profile: FacebookProfile,
      done: VerifyCallback
    ) => {
      return done(accessToken,);
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
