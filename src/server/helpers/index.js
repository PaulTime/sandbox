import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const encryptPassword = password => bcrypt.hashSync(password, 10);
export const generateRandomToken = () => crypto.randomBytes(256).toString('base64');