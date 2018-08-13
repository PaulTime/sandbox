import { RSAA } from 'redux-api-middleware';
import { setAuthorized } from 'common/actions/user';


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
  }).then(response => {
    if (response.status === 401) {
      dispatch(setAuthorized(false));
    }

    return response;
  });
};
