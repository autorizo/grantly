import { Router } from 'express';
import { getPermissionsHandler, getUserByIdHandler, updateUserHandler } from '@routes/handlers';

const router = Router();

router.get('/users/:userId/permissions', getPermissionsHandler);

router.get('/users/:userId', getUserByIdHandler);

router.put('/users/:userId', updateUserHandler);

export default router;
