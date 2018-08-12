import { Router } from 'express';

import { addUser } from 'server/controllers/auth';

const router = Router();

router.post('/auth-service/register', addUser);

export default router;
