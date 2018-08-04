import { createAction, handleActions } from 'redux-actions';

const setMessage = createAction('SET_MESSAGE');

export default handleActions({
  [setMessage]: (state, { payload }) => ({ ...state, message: payload }),
}, {
  message: null,
});