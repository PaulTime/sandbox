import { AUTH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from 'common/config';
import { setAuthToken, setRefreshToken } from 'common/actions/auth';

import fetchAPI from './api';

export const setTokensToStore = () => (dispatch, getState, { cookie }) => {
  dispatch(setAuthToken(
    cookie.get(AUTH_TOKEN_COOKIE_NAME)
  ));

  dispatch(setRefreshToken(
    cookie.get(REFRESH_TOKEN_COOKIE_NAME)
  ));
};

export const fetchSignupRequest = ({ username, phone, email, password }) => async (dispatch) => {
  return await dispatch(fetchSignupData({
    username,
    phone,
    email,
    password,
  }));
};

const fetchSignupData = body => fetchAPI({
  endpoint: '/api/auth-service/register',
  method: 'POST',
  type: 'REGISTRATION',
  body,
});