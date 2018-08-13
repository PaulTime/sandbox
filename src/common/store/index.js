import { createStore, compose, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';

import { IS_DEVELOP } from 'common/config';
import reducers from 'common/actions';
import { setTokensToStore } from 'common/redux/auth';

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

export default ({ preloadedState = {}, cookie }) => {
  const store = createStore(
    reducers,
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        apiMiddleware,
        thunk.withExtraArgument({ cookie }),
      )
    )
  );

  if(IS_DEVELOP && module.hot) {
    module.hot.accept('common/actions', () => {
      const nextReducer = require('common/actions').default;

      store.replaceReducer(nextReducer);
    });
  }

  store.dispatch(setTokensToStore());

  return store;
};