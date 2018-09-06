import { createAction, handleActions } from 'redux-actions';

export const setAuthorized = createAction('SET_AUTHORIZED');
export const setAuthToken = createAction('SET_AUTH_TOKEN');
export const setRefreshToken = createAction('SET_REFRESH_TOKEN');

export default handleActions({
  [setAuthorized]: (state, { payload }) => ({ ...state, isAuthorized: Boolean(payload) }),
  [setAuthToken]: (state, { payload }) => ({ ...state, authToken: payload }),
  [setRefreshToken]: (state, { payload }) => ({ ...state, refreshToken: payload }),
}, {
  isAuthorized: false,
  authToken: '',
  refreshToken: '',
});
