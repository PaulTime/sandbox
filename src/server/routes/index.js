import { Router } from 'express';

import { registration, login, refresh, logout } from 'server/controllers/auth';
import sessionMiddleware from 'server/middlewares/session';
import authMiddleware from 'server/middlewares/auth';

const router = Router();

router.use(sessionMiddleware);

router.post('/auth-service/register', authMiddleware, registration);
router.post('/auth-service/login', authMiddleware, login);
router.get('/auth-service/logout', logout);
router.get('/auth-service/refresh', refresh);

router.get('/test-service/test_2', (request, response) => {
  response.sendStatus(200);
});

router.get('/test-service/test', (request, response) => {
  response.sendStatus(200);
});

export default router;
