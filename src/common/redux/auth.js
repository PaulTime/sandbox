import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from 'common/config';
import { setAuthToken, setRefreshToken, setAuthorized } from 'common/actions/auth';

import fetchAPI from './api';

export const setAuthDataToStore = () => async (dispatch, getState, { cookie }) => {
  const accessToken = cookie.get(ACCESS_TOKEN_NAME);
  const refreshToken = cookie.get(REFRESH_TOKEN_NAME);

  await dispatch(setAuthToken(
    cookie.get(ACCESS_TOKEN_NAME)
  ));

  await dispatch(setRefreshToken(
    cookie.get(REFRESH_TOKEN_NAME)
  ));

  if (accessToken && refreshToken) {
    await dispatch(setAuthorized(true));
  }
};

export const fetchSignupRequest = ({ username, phone, email, password }) => async (dispatch) => {
  await dispatch(fetchSignupData({
    username,
    phone,
    email,
    password,
  }));

  await dispatch(setAuthDataToStore());
};

const fetchSignupData = body => fetchAPI({
  endpoint: '/api/auth-service/register',
  method: 'POST',
  type: 'REGISTRATION',
  body,
});