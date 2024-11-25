import { Router } from 'express';
import {  generateTokenHandler, resetPasswordHandler } from '@routes/handlers';

const router = Router();

router.post('/generate-token', generateTokenHandler);

router.get('/reset-password', resetPasswordHandler);

export default router;
