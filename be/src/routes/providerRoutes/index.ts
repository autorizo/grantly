import { Router } from 'express';
import {  changeProviderStatusHandler } from '@routes/handlers';

const router = Router();

router.post('/provider/:providerId', changeProviderStatusHandler);

export default router;
