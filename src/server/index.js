import React from 'react';
import path from 'path';
import express from 'express';
import mustacheExpress from 'mustache-express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';


import { IS_DEVELOP } from 'common/config';
import configStore from 'common/store';
import App from 'common/components/App';

const app = express();

app.engine('html', mustacheExpress());

app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, '../views'));

app.use('/static', express.static(path.resolve(__dirname, '../static')));

// /*eslint-disable*/
// if (IS_DEVELOP) {
//   const webpack = require('webpack');
//   const webpackConfig = require('../../webpack.dev.config.js');
//
//   app.use(require("webpack-dev-middleware")(webpack(webpackConfig), {
//     noInfo: false,
//     // publicPath: webpackConfig.output.publicPath,
//     stats: {
//       assets: false,
//       colors: true,
//       version: false,
//       hash: false,
//       timings: false,
//       chunks: false,
//       chunkModules: false
//     }
//   }));
//
//   app.use(require('webpack-hot-middleware')(webpack(webpackConfig), {
//     log: console.log,
//     path: '/__webpack_hmr',
//     heartbeat: 10 * 1000
//   }));
//
//   console.info('✅  Server-side HMR Enabled!');
// }
// /* eslint-enable */

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
    bundlePath: IS_DEVELOP ? 'http://localhost:9000/client.js' : '/client.js'
  });
});

app.listen(process.env.PORT || 4004, () => {
  console.log(`listening on http://localhost:${process.env.PORT || 4004}`); // eslint-disable-line no-console
});
