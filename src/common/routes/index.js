import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Login from 'common/containers/pages/Login';
import Home from 'common/containers/pages/Home';

@withRouter
export default class AppRoutes extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login} />
      </Switch>
    );
  }
}
