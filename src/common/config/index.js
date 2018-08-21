export const PORT = process.env.PORT || 4004;
export const IS_DEVELOP = process.env.NODE_ENV === 'development';
export const MONGO_DB_HOST = process.env.DB_HOST || 'mongodb://127.0.0.1:27017/sandbox';
export const REDIS_DB_HOST = process.env.DB_HOST || '//localhost:6379';
export const ACCESS_TOKEN_NAME = process.env.ACCESS_TOKEN_NAME || 'authToken';
export const REFRESH_TOKEN_NAME = process.env.REFRESH_TOKEN_NAME || 'refreshToken';
export const ACCESS_TOKEN_AGE = process.env.ACCESS_TOKEN_AGE || 1000 * 60;
export const REFRESH_TOKEN_AGE = process.env.REFRESH_TOKEN_AGE || 1000 * 60 * 2;