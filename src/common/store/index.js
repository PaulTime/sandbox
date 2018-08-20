import { createStore, compose, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import { IS_DEVELOP } from 'common/config';
import reducers from 'common/actions';
import { setAuthDataToStore } from 'common/redux/auth';

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

export default async ({ preloadedState = {}, cookie, history }) => {
  const store = createStore(
    reducers,
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        apiMiddleware,
        routerMiddleware(history),
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

  await store.dispatch(setAuthDataToStore());

  return store;
};