import React from 'react';
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import mustacheExpress from 'mustache-express';
import cookieParser from 'cookie-parser';
import CookieDough from 'cookie-dough';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import createMemoryHistory from 'history/createMemoryHistory';
import { Provider } from 'react-redux';

import { IS_DEVELOP, MONGO_DB_HOST, PORT } from 'common/config';
import redis from 'server/services/redis';
import configStore from 'common/store';
import App from 'common/components/App';
import routes from 'server/routes';

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', path.resolve(__dirname, '../views'));

app.use('/static', express.static(path.resolve(__dirname, '../static')));

app.disable('x-powered-by');

// TODO login route
// TODO refresh
app.use('/api', routes);

app.get('*', async (request, response) => {
  const store = await configStore({ cookie: new CookieDough(request), history: createMemoryHistory() }, true);

  const page = renderToString(
    <Provider store={store}>
      <StaticRouter location={request.url} context={{}}>
        <App/>
      </StaticRouter>
    </Provider>
  );

  const preloadedState = store.getState();

  response.render('template', {
    page,
    preloadedState: JSON.stringify(preloadedState).replace(/</g, '\\u003c'),
    jsPath: IS_DEVELOP ? 'http://localhost:9000/client.js' : '/client.js',
    cssPath: IS_DEVELOP ? undefined : '/client.css',
  });
});

/* eslint-disable no-console */
(async () => {
  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(MONGO_DB_HOST, { useNewUrlParser: true });

    await redis.client.connect();

    app.listen(PORT, () => {
      console.log(`listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
