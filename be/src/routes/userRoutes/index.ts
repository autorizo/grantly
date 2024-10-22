import { Router } from 'express';
import {  getPermissionsHandler } from '@routes/handlers';

const router = Router();

router.get('/users/:userId/permissions', getPermissionsHandler);

export default router;
