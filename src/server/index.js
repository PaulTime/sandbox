import React from 'react';
import path from  'path';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from 'common/components/App';

import makeHtmlTemplate from './template.js';

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    const page = makeHtmlTemplate(
        ReactDOMServer.renderToString(
            <StaticRouter location={req.url} context={{}}>
                <App />
            </StaticRouter>
        )
    );
    res.send(page);
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`listening on http://localhost:${process.env.PORT || 3000}`);
});
