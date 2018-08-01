import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import login from './login';

export default combineReducers({
  form: formReducer,
  login,
});