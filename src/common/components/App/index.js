import React from 'react';

import AppRoutes from 'common/routes';
import AppLayout from 'common/containers/layouts/AppLayout';

import './index.scss';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AppLayout>
          <AppRoutes/>
        </AppLayout>
      </React.Fragment>
    );
  }
}