import { RSAA } from 'redux-api-middleware';
import { SubmissionError } from 'redux-form';

import { setAuthorized } from 'common/actions/auth';

import { setAuthDataToStore } from './auth';

let refreshPromise;

const fetch = ({ type, ...config }) => (dispatch) => {
  const result = { ...config };
  const isBodyObject = config.body && typeof config.body === 'object';
  const isBodyFormData = config.body && config.body instanceof FormData;

  if (type) {
    result.types = [
      `${type}_REQUEST`,
      `${type}_SUCCESS`,
      `${type}_FAILURE`,
    ];
  }

  if (config.params) {
    const serializeParams = Object.entries(config.params)
      .reduce((acc, [key, value]) => [...acc, `${key}=${encodeURIComponent(value)}`], [])
      .join('&');
    result.endpoint = `${result.endpoint}?${serializeParams}`;
  }

  if (isBodyObject && !isBodyFormData) {
    result.body = JSON.stringify(result.body);
  }

  result.headers = {
    ...result.headers,
    ...(isBodyFormData ? {} : { 'content-type': 'application/json' }),
  };

  return dispatch({
    [RSAA]: {
      ...result,
      credentials: 'include',
    },
  }).then(async response => {
    const { status: statusCode } = response.payload || {};

    if (statusCode === 401 && !refreshPromise) {
      refreshPromise = dispatch({
        [RSAA]: {
          endpoint: '/api/auth-service/refresh',
          method: 'GET',
          headers: {
            'content-type': 'application/json'
          },
          credentials: 'include',
          types: ['REFRESH_REQUEST', 'REFRESH_SUCCESS', 'REFRESH_FAILURE']
        },
      });
    }

    if (statusCode === 401 && refreshPromise instanceof Promise) {
      const fetchRefresh = await refreshPromise;
      refreshPromise = undefined;

      if (fetchRefresh.error) {
        await dispatch(setAuthorized(false));
      } else {
        await dispatch(setAuthDataToStore(fetchRefresh.payload));
        return dispatch(fetch({ type, ...config }));
      }
    }

    if (statusCode === 400 && response.error) {
      throw new SubmissionError(response.payload.response);
    }

    return response;
  });
};

export default fetch;
