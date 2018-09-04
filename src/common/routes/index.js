import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Registration from 'common/containers/pages/Registration';
import Login from 'common/containers/pages/Login';
import Home from 'common/containers/pages/Home';

import PrivateRoute from './private';
import GuestRoute from './guest';

@withRouter
export default class AppRoutes extends React.PureComponent {
  render() {
    return (
      <Switch>
        <GuestRoute exact path="/registration" component={Registration} />
        <GuestRoute exact path="/login" component={Login} />

        <PrivateRoute exact path="/filter" component={Home} />

        <Route exact path="/" component={Home}/>
      </Switch>
    );
  }
}
