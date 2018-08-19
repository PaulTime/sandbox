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

    const user = new User(body);
    await user.save();

    response.sendStatus(200);
  } catch (e) {
    response.sendStatus(500);
  }
};
