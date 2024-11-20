import passport from 'passport';
import { Router, Request, Response } from 'express';
import { OIDCStrategy as AzureOIDCStrategy } from 'passport-azure-ad'; // Use the correct strategy import
import { VerifyCallback } from 'passport-oauth2';

const router = Router();

// Microsoft Azure AD OAuth strategy (OIDC)
passport.use(
  'azuread-openidconnect', // Explicitly set the strategy name
  new AzureOIDCStrategy(
    {
      identityMetadata:
        'https://login.microsoftonline.com/4320cc69-1148-4e58-b488-6f2a65d6ee3c/v2.0/.well-known/openid-configuration',
      clientID: process.env.OUTLOOK_CLIENT_ID as string,
      clientSecret: process.env.OUTLOOK_CLIENT_SECRET as string,
      responseType: 'code',
      responseMode: 'query',
      redirectUrl: 'http://localhost:3001/auth/azure/callback',
      scope: ['openid', 'profile', 'email'],
      passReqToCallback: true,
      allowHttpForRedirectUrl: true, // Set to true if you're working in a local dev environmen 
    },
    (
      req: Request,
      iss: string,
      sub: string,
      profile: any,
      accessToken: string,
      refreshToken: string,
      done: VerifyCallback
    ) => {
      console.log('Authenticated profile:', profile);
      return done(null, profile);
    }
  )
);

// Routes for Microsoft login
router.get(
  '/auth/microsoft',
  passport.authenticate('azuread-openidconnect') // Use the correct strategy name
);

// Callback route for Microsoft
router.get(
  '/auth/azure/callback',
  passport.authenticate('azuread-openidconnect', { failureRedirect: '/login' }), // Use the correct strategy name
  (req: Request, res: Response) => {
    console.log('Authenticated:', req.user);
    res.redirect('/profile');
  }
);

export default router;
