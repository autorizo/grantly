import { Router } from 'express';
import { getLogHandler, getPermissionsHandler } from '@routes/handlers';

const router = Router();

router.get('/users/:userId/permissions', getPermissionsHandler);
router.get('/users/:userId/permissions/log', getLogHandler);

export default router;
