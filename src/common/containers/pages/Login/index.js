import React from 'react';
import bemDecorator from 'cn-decorator';

import './index.scss';

@bemDecorator('login')
export default class Login extends React.PureComponent {
  render(bem) {
    return (
      <div className={bem()}>
        <h1>landing-credits</h1>
        <img src="/static/img/googlelogo.png" alt="GoogleLogo"/>
        <img src="/static/img/logo.svg" alt="logo"/>
          
        <div className={bem('test-div')} />
      </div>
    );
  }
}