import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from 'common/actions';

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

export default (preloadedState = {}) => {
  const store = createStore(
    reducers,
    preloadedState,
    composeEnhancers(
      applyMiddleware(thunk)
    )
  );

  if(module.hot) {
    module.hot.accept('common/actions', () => {
      const nextReducer = require('common/actions').default;

      store.replaceReducer(nextReducer);
    });
  }

  return store;
};