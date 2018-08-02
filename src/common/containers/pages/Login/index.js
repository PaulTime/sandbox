import React from 'react';
import bemDecorator from 'cn-decorator';

import LoginForm from 'common/containers/forms/Login';

import './index.scss';

@bemDecorator('login-page')
export default class Login extends React.PureComponent {
  render(bem) {
    return (
      <div className={bem()}>
        <h2>Login form</h2>

        <LoginForm />
      </div>
    );
  }
}