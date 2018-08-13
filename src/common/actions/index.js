import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import login from './login';
import user from './user';

export default combineReducers({
  form: formReducer,
  login,
  user,
});