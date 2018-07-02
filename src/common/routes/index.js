import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

@withRouter
export default class AppRoutes extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={() => <h1>header 1</h1>}/>
        <Route exact path="/login" component={() =>
          <div>
            <h1>landing-credits</h1>
            <img src="static/img/googlelogo.png" alt="GoogleLogo"/>
            <img src="static/img/logo.svg" alt="logo"/>
          </div>
        }/>
      </Switch>
    );
  }
}
