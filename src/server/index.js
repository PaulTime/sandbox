import React from 'react';
import path from  'path';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import Root from 'common/components/Root';
import App from 'common/components/App';

import makeHtmlTemplate from './template.js';

const app = express();

app.use('/', express.static(path.resolve(__dirname)));

app.get('*', (req, res, next) => {
    try {
        const css = new Set();
        const insertCss = (...styles) => {
            styles.forEach(style => css.add(style._getCss())); // eslint-disable-line no-underscore-dangle
        };
        const context = { insertCss };

        const page = makeHtmlTemplate(
            renderToString(
                <StaticRouter location={req.url} context={{}}>
                    <App />
                </StaticRouter>
            )
            , [...css].join(''));
        res.send(page);
    } catch (err) {
        next(err);
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`listening on http://localhost:${process.env.PORT || 3000}`);
});
