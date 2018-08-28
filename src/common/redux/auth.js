import { push } from 'react-router-redux';

import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from 'common/config';
import { setAuthToken, setRefreshToken, setAuthorized } from 'common/actions/auth';

import fetchAPI from './api';

export const setAuthDataToStore = ({
  [ACCESS_TOKEN_NAME]: accessToken,
  [REFRESH_TOKEN_NAME]: refreshToken,
}) => async dispatch => {
  await dispatch(setAuthToken(accessToken));
  await dispatch(setRefreshToken(refreshToken));

  await dispatch(setAuthorized(Boolean(accessToken || refreshToken)));
};

export const fetchLoginRequest = data => async (dispatch) => {
  const response = await dispatch(fetchLoginData(data));

  if (response.error) {
    return;
  }

  await dispatch(setAuthDataToStore(response.payload));

  await dispatch(push('/media'));
};

export const fetchSignupRequest = data => async (dispatch) => {
  const response = await dispatch(fetchSignupData(data));

  if (response.error) {
    return;
  }

  await dispatch(setAuthDataToStore(response.payload));

  await dispatch(push('/media'));
};

const fetchLoginData = body => fetchAPI({
  endpoint: '/api/auth-service/login',
  method: 'POST',
  type: 'LOGIN',
  body,
});

const fetchSignupData = body => fetchAPI({
  endpoint: '/api/auth-service/register',
  method: 'POST',
  type: 'REGISTRATION',
  body,
});