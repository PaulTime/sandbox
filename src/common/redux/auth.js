import { push } from 'react-router-redux';

import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from 'common/config';
import { setAuthToken, setRefreshToken, setAuthorized } from 'common/actions/auth';

import fetchAPI from './api';

export const setAuthDataToStore = () => async (dispatch, getState, { cookie }) => {
  const accessToken = cookie.get(ACCESS_TOKEN_NAME);
  const refreshToken = cookie.get(REFRESH_TOKEN_NAME);

  await dispatch(setAuthToken(accessToken));
  await dispatch(setRefreshToken(refreshToken));

  if (accessToken || refreshToken) {
    await dispatch(setAuthorized(true));
  }
};

export const fetchSignupRequest = data => async (dispatch) => {
  const response = await dispatch(fetchSignupData(data));

  if (response.error) {
    return;
  }

  await dispatch(setAuthDataToStore());

  await dispatch(push('/media'));
};

const fetchSignupData = body => fetchAPI({
  endpoint: '/api/auth-service/register',
  method: 'POST',
  type: 'REGISTRATION',
  body,
});