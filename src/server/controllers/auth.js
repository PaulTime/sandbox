import {
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
  ACCESS_TOKEN_AGE,
  REFRESH_TOKEN_AGE,
} from 'common/config';
import User from 'server/models/user';
import redis from 'server/services/redis';
import { encryptPassword, generateRandomToken } from 'server/helpers';

export const addUser = async (request, response) => {
  try {
    const { body } = request;
    const userInDB = await User.findOne({ phone: body.phone, email: body.email }).exec();

    if (userInDB) {
      response
        .status(400)
        .json({ phone: 'not unique', email: 'not unique' });
      return;
    }

    const document = { ...body, password: encryptPassword(body.password) };
    await User.create(document);

    const accessToken = generateRandomToken();
    const refreshToken = generateRandomToken();

    await redis.client.hmset(accessToken, { ...document, refreshToken });
    await redis.client.pexpire(accessToken, REFRESH_TOKEN_AGE);

    response
      .cookie(ACCESS_TOKEN_NAME, accessToken, { httpOnly: true, maxAge: ACCESS_TOKEN_AGE })
      .cookie(REFRESH_TOKEN_NAME, refreshToken, { httpOnly: true, maxAge: REFRESH_TOKEN_AGE })
      .status(200)
      .json({ accessToken, refreshToken });
  } catch (error) {
    response
      .status(500)
      .json({ error: error.toString() });
  }
};
