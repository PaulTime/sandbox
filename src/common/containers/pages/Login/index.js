import React from 'react';
import bemDecorator from 'cn-decorator';

import LoginForm from 'common/containers/forms/Login';

import './index.scss';

@bemDecorator('login-page')
export default class LoginPage extends React.PureComponent {
  render(bem) {
    return (
      <div className={bem()}>
        <h2 className={bem('title')}>Login form</h2>

        <LoginForm onSubmit={() => Promise.resolve()} />
      </div>
    );
  }
}