import React from 'react';
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import mustacheExpress from 'mustache-express';
import cookieParser from 'cookie-parser';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { IS_DEVELOP, DB_HOST, PORT } from 'common/config';
import configStore from 'common/store';
import App from 'common/components/App';
import routes from 'server/routes';

const app = express();

mongoose.connect(DB_HOST, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', path.resolve(__dirname, '../views'));

app.use('/static', express.static(path.resolve(__dirname, '../static')));

app.disable('x-powered-by');

app.use('/api', routes);

app.get('*', (req, res) => {
  const store = configStore();

  const page = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        <App/>
      </StaticRouter>
    </Provider>
  );

  const preloadedState = store.getState();

  res.render('template', {
    page,
    preloadedState: JSON.stringify(preloadedState).replace(/</g, '\\u003c'),
    jsPath: IS_DEVELOP ? 'http://localhost:9000/client.js' : '/client.js',
    cssPath: IS_DEVELOP ? undefined : '/client.css',
  });
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`); // eslint-disable-line no-console
});
