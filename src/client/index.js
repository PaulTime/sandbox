import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import CookieDough from 'cookie-dough';

import 'fetch-polyfill';

import { IS_DEVELOP } from 'common/config';
import configStore from 'common/store';
import App from 'common/components/App';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

let store;

const hydrate = async (Component) => {
  store = store || await configStore({ preloadedState, cookie: CookieDough() });

  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
};

hydrate(App);

if (IS_DEVELOP && module.hot) {
  module.hot.accept('common/components/App', () => {
    const NewApp = require('common/components/App').default; //eslint-disable-line
    hydrate(NewApp);
  });
}