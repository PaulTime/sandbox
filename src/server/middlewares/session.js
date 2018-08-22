import CookieDough from 'cookie-dough';

import { ACCESS_TOKEN_NAME } from 'common/config/index';
import redis from 'server/services/redis';

const WHITE_LIST = [
  '/auth-service/register'
];

export default async (request, response, next) => {
  if (WHITE_LIST.find(url => request.url.includes(url))) {
    next();
    return;
  }

  const cookie = new CookieDough(request);
  const userAccessToken = cookie.get(ACCESS_TOKEN_NAME);
  const userIsAuthorized = await redis.client.exists(userAccessToken);

  if (userIsAuthorized) {
    next();
    return;
  }

  response.sendStatus(401);
}