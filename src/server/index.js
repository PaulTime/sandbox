import React from 'react';
import path from 'path';
import express from 'express';
import cors from 'cors';
import mustacheExpress from 'mustache-express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';


import { IS_DEVELOP } from 'common/config';
import configStore from 'common/store';
import App from 'common/components/App';

const app = express();

// if (IS_DEVELOP) {
//   app.use(cors({ origin: 'http://localhost:9000' }));
// }

app.engine('html', mustacheExpress());

app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, '../views'));

app.use('/static', express.static(path.resolve(__dirname, '../static')));

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
    cssPath: IS_DEVELOP ? 'http://localhost:9000/client.css' : '/client.css',
  });
});

app.listen(process.env.PORT || 4004, () => {
  console.log(`listening on http://localhost:${process.env.PORT || 4004}`); // eslint-disable-line no-console
});
