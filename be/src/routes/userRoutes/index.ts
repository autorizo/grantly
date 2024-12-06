import { Router } from 'express';
import { getPermissionsHandler, getUserByIdHandler, updateUserHandler, updateUserImageHandler } from '@routes/handlers';

const router = Router();

router.get('/users/:userId/permissions', getPermissionsHandler);

router.get('/users/:userId', getUserByIdHandler);

router.put('/users/:userId', updateUserHandler);

router.put('/users/:userId/image', updateUserImageHandler);



export default router;
