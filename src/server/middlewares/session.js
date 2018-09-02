import { ACCESS_TOKEN_NAME } from 'common/config';
import redis from 'server/services/redis';

const WHITE_LIST = [
  '/auth-service/register',
  '/auth-service/login',
  '/auth-service/refresh',
];

export default async (request, response, next) => {
  const {
    url: requestUrl,
    cookies: { _session, [ACCESS_TOKEN_NAME]: userAccessToken },
  } = request;

  if (WHITE_LIST.find(url => requestUrl.includes(url))) {
    next();
    return;
  }

  let dbAccessToken;

  if (userAccessToken && _session) {
    dbAccessToken = await redis.client.hget(_session, ACCESS_TOKEN_NAME);
  }

  if (dbAccessToken && dbAccessToken === userAccessToken) {
    next();
    return;
  }

  response.sendStatus(401);
};
