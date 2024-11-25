import { Router } from 'express';
import googleAuthRoutes from './googleAuth';
import facebookAuthRoutes from './facebookAuth';
import microsoftAuthRoutes from './microsoftAuth';
import credentialsAuth from './credentialsAuth';
import passport from 'passport';
import session from 'express-session';

const router = Router();
const secret = process.env.PASSPORT_SECRET as string;

passport.serializeUser((user: any, done: Function) => done(null, user));
passport.deserializeUser((user: any, done: Function) => done(null, user));
// Session setup
router.use(session({ secret: secret, resave: false, saveUninitialized: true }));

// Initialize Passport
router.use(passport.initialize());
router.use(passport.session());

// Route for app credentials
router.use(credentialsAuth);

// Routes for social login
router.use(googleAuthRoutes);
router.use(facebookAuthRoutes);
router.use(microsoftAuthRoutes);

export default router;
