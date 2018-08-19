import crypto from 'crypto';
import bcrypt from 'bcrypt';

import {
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
  ACCESS_TOKEN_AGE,
  REFRESH_TOKEN_AGE,
} from 'common/config';
import User from 'server/models/user';

export const addUser = async (request, response) => {
  try {
    const { body } = request;
    const userInDB = await User.findOne({ phone: body.phone, email: body.email }).exec();

    if (userInDB) {
      response
        .status(400)
        .json({ phone: 'not unique', email: 'not unique' })
        .send();
      return;
    }

    const user = new User({ ...body, password: bcrypt.hashSync(body.password, 10) });
    await user.save();

    const accessToken = crypto.randomBytes(256).toString('base64');
    const refreshToken = crypto.randomBytes(256).toString('base64');

    response
      .cookie(ACCESS_TOKEN_NAME, accessToken, { maxAge: ACCESS_TOKEN_AGE })
      .cookie(REFRESH_TOKEN_NAME, refreshToken, { maxAge: REFRESH_TOKEN_AGE })
      .sendStatus(200);
  } catch (error) {
    response
      .status(500)
      .json({ error: error.toString() })
      .send();
  }
};
