import { Router } from 'express';
import { insertPermissionLog } from '@routes/handlers';

const router = Router();

router.post('/permission', insertPermissionLog);

export default router;
