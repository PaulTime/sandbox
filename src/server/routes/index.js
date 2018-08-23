import { Router } from 'express';

import { addUser } from 'server/controllers/auth';
import sessionMiddleware from 'server/middlewares/session';

const router = Router();

router.use(sessionMiddleware);

router.post('/auth-service/register', addUser);

router.get('/test-service/test', (request, response) => {
  response.sendStatus(200);
});

export default router;
