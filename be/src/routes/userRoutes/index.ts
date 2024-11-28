import { Router } from 'express';
import { getPermissionsHandler, getUserByIdHandler } from '@routes/handlers';

const router = Router();

router.get('/users/:userId/permissions', getPermissionsHandler);

router.get('/users/:userId', getUserByIdHandler);

export default router;
