import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Login from 'common/containers/pages/Login';

@withRouter
export default class AppRoutes extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={() => <h1>header</h1>}/>
        <Route exact path="/login" component={Login} />
      </Switch>
    );
  }
}
