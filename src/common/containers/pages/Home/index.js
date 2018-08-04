import React from 'react';
import bemDecorator from 'cn-decorator';

@bemDecorator('home-page')
export default class Home extends React.PureComponent {
  render(bem) {
    return (
      <main>
        <h1>Home</h1>

        <img src="/static/img/googlelogo.png" alt="GoogleLogo"/>
        <img src="/static/img/logo.svg" alt="logo"/>

        <div className={bem('test-div')} />
      </main>
    );
  }
}