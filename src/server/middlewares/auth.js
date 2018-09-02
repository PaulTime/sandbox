import redis from 'server/services/redis';

export default async (request, response, next) => {
  const { _session } = request.cookies;

  let hasSession;

  if (_session) {
    hasSession = await redis.client.exists(_session);
  }

  if (hasSession) {
    response
      .status(400)
      .json({ error: 'already authorized' });
    return;
  }

  next();
};
