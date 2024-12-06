import passport from 'passport';
import { Router, Request, Response } from 'express';
import { Strategy as MicrosoftStrategy } from 'passport-microsoft'; // Using passport-microsoft strategy
import { VerifyCallback } from 'passport-oauth2';
import { authUserHandler } from '@routes/handlers';

// Define a user interface for better typing
interface User {
  id: string;
  displayName: string;
  email: string;
}

const router = Router();

const apiUrl = process.env.API_URL;

// Microsoft OAuth strategy (passport-microsoft)
passport.use(
  'microsoft',
  new MicrosoftStrategy(
    {
      clientID: process.env.OUTLOOK_CLIENT_ID as string,
      clientSecret: process.env.OUTLOOK_CLIENT_SECRET as string,
      callbackURL: `${apiUrl}/auth/azure/callback`,
      scope: ['user.read', 'openid', 'profile', 'email'],
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: VerifyCallback
    ) => {
      return done(null, profile);
    }
  )
);

// Routes for Microsoft login
router.get(
  '/auth/microsoft',
  passport.authenticate('microsoft', {
    prompt: 'select_account', // Forces the user to select an account
    session: false, // Disable session to prevent redirect loop
  })
);

// Callback route for Microsoft OAuth
router.get(
  '/auth/azure/callback',
  passport.authenticate('microsoft', {
    failureRedirect: '/auth/microsoft/error', // Redirect on failure
  }),
  authUserHandler
);

// Error route for Microsoft authentication
router.get('/auth/microsoft/error', (req: Request, res: Response) => {
  console.error('Authentication failed, error details:', req.query); // Log query params for debugging
  res.status(401).json({
    message: 'Microsoft authentication failed',
    error: req.query, // Send back error details
  });
});

export default router;
