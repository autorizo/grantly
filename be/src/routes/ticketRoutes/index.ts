import { getAllTicketsHandler, getTicketsHandler } from '@routes/handlers';
import { Router } from 'express';
const router = Router();

router.get('/tickets/:userId', getTicketsHandler);

router.get('/tickets', getAllTicketsHandler);

export default router;
