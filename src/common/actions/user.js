import { createAction, handleActions } from 'redux-actions';

export const setAuthorized = createAction('SET_AUTHORIZED');

export default handleActions({
  [setAuthorized]: (state, { payload }) => ({ ...state, isAuthorized: Boolean(payload) }),
}, {
  isAuthorized: false,
});