import { Router } from 'express';

import { addUser } from 'server/controllers/auth';
import sessionMiddleware from 'server/middlewares/session';

const router = Router();

router.use(sessionMiddleware);

router.post('/auth-service/register', addUser);

export default router;
