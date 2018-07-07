import React from 'react';
import bemDecorator from 'cn-decorator';

import 'normalize.css/normalize.css';

import AppRoutes from 'common/routes';
import AppLayout from 'common/containers/layouts/AppLayout';

import './index.scss';

@bemDecorator('app-root')
export default class App extends React.Component {
  render(bem) {
    return (
      <section className={bem()}>
        <AppLayout>
          <AppRoutes/>
        </AppLayout>
      </section>
    );
  }
}