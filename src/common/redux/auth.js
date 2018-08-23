import { push } from 'react-router-redux';

import { setAuthToken, setRefreshToken, setAuthorized } from 'common/actions/auth';

import fetchAPI from './api';

export const setAuthDataToStore = ({ accessToken, refreshToken }) => async dispatch => {
  await dispatch(setAuthToken(accessToken));
  await dispatch(setRefreshToken(refreshToken));

  await dispatch(setAuthorized(Boolean(accessToken || refreshToken)));
};

export const fetchSignupRequest = data => async (dispatch) => {
  const response = await dispatch(fetchSignupData(data));

  if (response.error) {
    return;
  }

  await dispatch(setAuthDataToStore(response.payload));

  await dispatch(push('/media'));
};

const fetchSignupData = body => fetchAPI({
  endpoint: '/api/auth-service/register',
  method: 'POST',
  type: 'REGISTRATION',
  body,
});