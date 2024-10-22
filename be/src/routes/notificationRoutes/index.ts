import { getNotificationsHandler } from '@routes/handlers';
import { Router } from 'express';
const router = Router();

router.get('/notifications/:userId', getNotificationsHandler);

export default router;
