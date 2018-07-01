import React from 'react';
import path from 'path';
import express from 'express';
import mustacheExpress from 'mustache-express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from 'common/components/App';

// if (module.hot) {
//   module.hot.accept('./app', function() {
//     console.log('🔁  HMR Reloading `./app`...');
//   });
//
//   console.info('✅  Server-side HMR Enabled!');
// } else {
//   console.info('❌  Server-side HMR Not Supported.');
// }

const app = express();

app.engine('html', mustacheExpress());

app.set('view engine', 'html');
app.set('views', path.resolve(__dirname));

app.use('/', express.static(path.resolve(__dirname)));

app.get('*', (req, res) => {
  const page = renderToString(
    <StaticRouter location={req.url} context={{}}>
      <App/>
    </StaticRouter>
  );

  res.render('page', { page });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`listening on http://localhost:${process.env.PORT || 3000}`); // eslint-disable-line no-console
});
