import crypto from 'crypto';

export const generateRandomToken = (size = 256) => crypto.randomBytes(size).toString('base64');