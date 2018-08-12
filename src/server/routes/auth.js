import { Router } from 'express';

import { addUser } from 'server/controllers/auth.js';

const router = Router();

router.post('/add-user', addUser);

export default router;
