import { createStore, compose, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import { IS_DEVELOP, ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from 'common/config';
import reducers from 'common/actions';
import { setAuthDataToStore } from 'common/redux/auth';

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

export default async ({ preloadedState = {}, cookie, history }, server = false) => {
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

  if (server) {
    await store.dispatch(setAuthDataToStore({
      accessToken: cookie.get(ACCESS_TOKEN_NAME),
      refreshToken: cookie.get(REFRESH_TOKEN_NAME),
    }));
  }

  return store;
};