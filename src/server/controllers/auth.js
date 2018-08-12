import UserModel from 'server/models/user';

export const addUser = async (request, response) => {
  try {
    const { body } = request;
    const user = new UserModel(body);
    await user.save();
    response.sendStatus(200);
  } catch (e) {
    response.sendStatus(400);
  }
};
