export const PORT = process.env.PORT || 4004;
export const IS_DEVELOP = process.env.NODE_ENV === 'development';
export const MONGO_DB_HOST = process.env.MONGO_DB_HOST || 'mongodb://127.0.0.1:27017/sandbox';
export const REDIS_DB_HOST = process.env.REDIS_DB_HOST || '//localhost:6379';
export const ACCESS_TOKEN_NAME = process.env.ACCESS_TOKEN_NAME || 'authToken';
export const REFRESH_TOKEN_NAME = process.env.REFRESH_TOKEN_NAME || 'refreshToken';
export const ACCESS_TOKEN_TTL = process.env.ACCESS_TOKEN_TTL || 1000 * 60;
export const REFRESH_TOKEN_TTL = process.env.REFRESH_TOKEN_TTL || 1000 * 60 * 2;
export const REDIS_SESSION_TTL = process.env.REDIS_SESSION_TTL || REFRESH_TOKEN_TTL;