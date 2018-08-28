import { RSAA } from 'redux-api-middleware';
import { SubmissionError } from 'redux-form';

import { setAuthorized } from 'common/actions/auth';

export default ({ type, ...config }) => (dispatch) => {
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
    ...(!isBodyFormData ? { 'content-type': 'application/json' } : {}),
  };

  return dispatch({
    [RSAA]: {
      ...result,
      credentials: 'include',
    },
  }).then(async response => {
    const { status: statusCode } = response.payload || {};
    if (statusCode === 401) {
      await dispatch(setAuthorized(false));
      return response;
    }

    if (statusCode === 400 && response.error) {
      throw new SubmissionError(response.payload.response);
    }

    return response;
  });
};
