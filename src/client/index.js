import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Root from 'common/components/Root';
import App from 'common/components/App';

const context = {
    insertCss: (...styles) => {
        const removeCss = styles.map(x => x._insertCss()); // eslint-disable-line no-underscore-dangle
        return () => {
            removeCss.forEach(f => f());
        };
    },
};

ReactDOM.hydrate(
    <BrowserRouter>
        <Root context={context}>
            <App />
        </Root>
    </BrowserRouter>,
    document.getElementById('root')
);