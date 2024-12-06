import { signUpHandler } from '@routes/handlers';
import { Router } from 'express';
const router = Router();

router.post('/users', signUpHandler);

export default router;
