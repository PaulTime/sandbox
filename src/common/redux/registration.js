import fetchAPI from './api';

export const fetchSignupRequest = ({ username, phone, email, password }) => async (dispatch) => {
  return await dispatch(fetchSignupData({
    username,
    phone,
    email,
    password,
  }));
};

const fetchSignupData = body => fetchAPI({
  endpoint: '/auth-service/add-user',
  method: 'POST',
  type: 'REGISTRATION',
  body,
});