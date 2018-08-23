import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import PrivateLayout from 'common/containers/layouts/PrivateLayout';
import Registration from 'common/containers/pages/Registration';
import Login from 'common/containers/pages/Login';
import Home from 'common/containers/pages/Home';

@withRouter
export default class AppRoutes extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home}/>

        <PrivateLayout>
          <Route exact path="/media" component={Home}/>
        </PrivateLayout>
      </Switch>
    );
  }
}
