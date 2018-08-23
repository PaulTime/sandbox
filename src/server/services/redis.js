import Redis from 'ioredis';

import { REDIS_DB_HOST, IS_DEVELOP } from 'common/config';

let instance;

export default new class RedisClient {
  constructor() {
    instance = instance || new Redis(REDIS_DB_HOST, { lazyConnect: true, showFriendlyErrorStack: IS_DEVELOP });
    this.client = instance;
  }
}();
