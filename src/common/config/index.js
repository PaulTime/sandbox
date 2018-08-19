export const PORT = process.env.PORT || 4004;
export const IS_DEVELOP = process.env.NODE_ENV === 'development';
export const MONGO_DB_HOST = process.env.DB_HOST || 'mongodb://localhost:27017/sandbox';
export const ACCESS_TOKEN_NAME = process.env.ACCESS_TOKEN_NAME || 'authToken';
export const REFRESH_TOKEN_NAME = process.env.REFRESH_TOKEN_NAME || 'refreshToken';
export const ACCESS_TOKEN_AGE = process.env.ACCESS_TOKEN_AGE || 1000 * 60;
export const REFRESH_TOKEN_AGE = process.env.REFRESH_TOKEN_AGE || 1000 * 60 * 2;