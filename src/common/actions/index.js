import { combineReducers } from 'redux';

const initialState = {
  message: null,
};

const appRoot = (state = initialState, action) => {
  switch(action.type) {
  case 'SET_MESSAGE':
    return {
      ...state,
      message: action.message,
    };
  default:
    return state;
  }
};

export default combineReducers({
  appRoot,
});