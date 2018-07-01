import React from 'react';
import bemDecorator from 'cn-decorator';
import { connect } from 'react-redux';

import 'normalize.css/normalize.css';

import AppRoutes from 'common/routes';
import AppLayout from 'common/layouts/AppLayout';

import './index.scss';

@bemDecorator('app-root')
export default class App extends React.PureComponent {
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