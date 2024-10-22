import { Router } from 'express';
import { updatePermissionHandler } from '@routes/handlers';

const router = Router();

router.post('/permission', updatePermissionHandler);

export default router;
